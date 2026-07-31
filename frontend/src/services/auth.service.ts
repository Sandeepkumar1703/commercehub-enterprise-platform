import apiClient from '../core/api/axios';
import { API_ENDPOINTS } from '../core/api/apiEndpoints';

export const authService = {
  register: (payload: Record<string, any>) =>
    apiClient.post(API_ENDPOINTS.AUTH.REGISTER, payload),

  login: (credentials: Record<string, any>) =>
    apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials),

  logout: () => apiClient.post(API_ENDPOINTS.AUTH.LOGOUT),

  changePassword: (payload: Record<string, any>) =>
    apiClient.put(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, payload),

  forgotPassword: (email: string) =>
    apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email }),

  resetPassword: (payload: Record<string, any>) =>
    apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, payload),

  resendVerification: (email: string) =>
    apiClient.post(API_ENDPOINTS.AUTH.RESEND_VERIFICATION, { email }),

  verifyEmail: (token: string) =>
    apiClient.get(`${API_ENDPOINTS.AUTH.VERIFY_EMAIL}?token=${token}`),
};
