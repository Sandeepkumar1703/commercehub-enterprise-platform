import { axiosInstance } from '../../core/api/axiosInstance';
import { AuthResponse, User } from '../../types';

export const authApi = {
  login: async (credentials: { email: string; password?: string }) => {
    const { data } = await axiosInstance.post<AuthResponse>('/api/auth/login', credentials);
    return data;
  },

  register: async (userData: { firstName: string; lastName: string; email: string; password?: string; phone?: string }) => {
    const { data } = await axiosInstance.post<AuthResponse>('/api/auth/register', userData);
    return data;
  },

  refreshToken: async (refreshToken: string) => {
    const { data } = await axiosInstance.post<{ accessToken: string; refreshToken: string }>('/api/auth/refresh-token', { refreshToken });
    return data;
  },

  logout: async () => {
    const { data } = await axiosInstance.post<{ message: string }>('/api/auth/logout');
    return data;
  },

  verifyEmail: async (token: string) => {
    const { data } = await axiosInstance.get<{ message: string }>(`/api/auth/verify-email?token=${token}`);
    return data;
  },

  resendVerification: async (email: string) => {
    const { data } = await axiosInstance.post<{ message: string }>('/api/auth/resend-verification', { email });
    return data;
  },

  forgotPassword: async (email: string) => {
    const { data } = await axiosInstance.post<{ message: string }>('/api/auth/forgot-password', { email });
    return data;
  },

  resetPassword: async (payload: { token: string; password?: string }) => {
    const { data } = await axiosInstance.post<{ message: string }>('/api/auth/reset-password', payload);
    return data;
  },

  changePassword: async (payload: { currentPassword?: string; newPassword?: string }) => {
    const { data } = await axiosInstance.put<{ message: string }>('/api/auth/change-password', payload);
    return data;
  },
};
