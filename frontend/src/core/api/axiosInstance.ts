import axios from 'axios';
import { tokenManager } from '../auth/tokenManager';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
// Strip trailing /api if present because endpoints in the frontend include /api prefix
export const API_BASE_URL = rawBaseUrl.replace(/\/api\/?$/, '');

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenManager.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized token refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/login') &&
      !originalRequest.url?.includes('/auth/refresh-token')
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = tokenManager.getRefreshToken();
      if (!refreshToken) {
        tokenManager.clearTokens();
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(`${API_BASE_URL}/api/auth/refresh-token`, {
          refreshToken,
        });

        tokenManager.setTokens(data.accessToken, data.refreshToken);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        processQueue(null, data.accessToken);
        isRefreshing = false;

        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        tokenManager.clearTokens();
        isRefreshing = false;
        if (window.location.pathname !== '/login') {
          window.location.href = '/login?expired=true';
        }
        return Promise.reject(refreshErr);
      }
    }

    // Format Network Errors gracefully
    if (!error.response && error.message === 'Network Error') {
      console.warn(`[Axios Network Error] Connection refused to Spring Boot backend at ${API_BASE_URL}. Ensure your backend server is running.`);
    }

    return Promise.reject(error);
  }
);

