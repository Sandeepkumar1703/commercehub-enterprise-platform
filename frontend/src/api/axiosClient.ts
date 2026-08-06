import axios from 'axios';
import { ApiResponse } from '../types';

export const axiosClient = axios.create({
  baseURL: ((import.meta as any).env?.VITE_API_URL as string) || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request Interceptor: Attach JWT Token & Language
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const currentLang = localStorage.getItem('app_language') || 'en';
    config.headers['Accept-Language'] = currentLang;

    if (!config.params) {
      config.params = {};
    }
    if (!config.params.lang) {
      config.params.lang = currentLang;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Error & Token Expiry handling with standardized format
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const errorData = error.response?.data;

    // Standardized Enterprise Error Object
    const formattedError = {
      success: false,
      message: errorData?.message || error.message || 'An unexpected error occurred',
      code: errorData?.code || (status ? `HTTP_${status}` : 'NETWORK_ERROR'),
      timestamp: errorData?.timestamp || new Date().toISOString(),
      status: status || 500,
    };

    if (status === 401) {
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('user_session');
      if (window.location.pathname !== '/auth/login') {
        window.location.href = '/auth/login?expired=true';
      }
    }

    return Promise.reject(formattedError);
  }
);

export async function request<T>(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  url: string,
  data?: any,
  params?: any
): Promise<ApiResponse<T>> {
  const response = await axiosClient.request<ApiResponse<T>>({
    method,
    url,
    data,
    params,
  });
  return response.data;
}
