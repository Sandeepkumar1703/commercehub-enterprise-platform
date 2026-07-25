import { ApiClient } from './apiClient';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  verificationToken: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
  data: string;
  timestamp: string;
}

export const authService = {
  // POST /api/auth/login
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return await ApiClient.post<LoginResponse>('/api/auth/login', credentials);
  },

  // POST /api/auth/register
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return await ApiClient.post<RegisterResponse>('/api/auth/register', data);
  },

  // GET /api/auth/verify-email?token={token}
  async verifyEmail(token: string): Promise<unknown> {
    return await ApiClient.get<unknown>(`/api/auth/verify-email?token=${encodeURIComponent(token)}`);
  },

  // POST /api/auth/resend-verification
  async resendVerification(email: string): Promise<{ message: string }> {
    return await ApiClient.post<{ message: string }>('/api/auth/resend-verification', { email });
  },

  // POST /api/auth/forgot-password
  async forgotPassword(email: string): Promise<string> {
    return await ApiClient.post<string>('/api/auth/forgot-password', { email });
  },

  // POST /api/auth/reset-password
  async resetPassword(data: ResetPasswordRequest): Promise<string> {
    return await ApiClient.post<string>('/api/auth/reset-password', data);
  },

  // PUT /api/auth/change-password
  async changePassword(data: ChangePasswordRequest): Promise<string> {
    return await ApiClient.put<string>('/api/auth/change-password', data);
  },

  // POST /api/auth/logout
  async logout(): Promise<LogoutResponse> {
    return await ApiClient.post<LogoutResponse>('/api/auth/logout');
  },
};
