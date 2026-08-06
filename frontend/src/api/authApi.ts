import { request } from './axiosClient';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface RegisterResponse {
  message: string;
}

export interface VerifyEmailResponse {
  message: string;
}

export interface ResendVerificationResponse {
  message: string;
}

export const authApi = {
  login: (credentials: { email?: string; password?: string }) =>
    request<LoginResponse>('post', '/auth/login', credentials),

  register: (payload: { firstName: string; lastName: string; email: string; password?: string }) =>
    request<RegisterResponse>('post', '/auth/register', payload),

  logout: () =>
    request<any>('post', '/auth/logout'),

  forgotPassword: (data: { email: string }) =>
    request<string>('post', '/auth/forgot-password', data),

  resetPassword: (data: { token: string; newPassword?: string }) =>
    request<string>('post', '/auth/reset-password', data),

  verifyEmail: (token: string) =>
    request<VerifyEmailResponse>('get', `/auth/verify-email`, undefined, { token }),

  resendVerification: (data: { email: string }) =>
    request<ResendVerificationResponse>('post', '/auth/resend-verification', data),

  changePassword: (data: { currentPassword?: string; oldPassword?: string; newPassword?: string; confirmPassword?: string }) => {
    const currentPassword = data.currentPassword || data.oldPassword || '';
    const newPassword = data.newPassword || '';
    const confirmPassword = data.confirmPassword || newPassword;
    return request<string>('put', '/auth/change-password', {
      currentPassword,
      newPassword,
      confirmPassword,
    });
  },
};

