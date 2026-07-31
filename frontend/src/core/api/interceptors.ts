import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { tokenManager } from '../auth/tokenManager';

export const setupInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = tokenManager.getAccessToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );
};
