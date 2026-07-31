import { axiosInstance } from '../../core/api/axiosInstance';
import { AuthResponse, User } from '../../types';

export function normalizeAuthResponse(raw: any): AuthResponse {
  if (!raw) {
    throw new Error('Empty response received from authentication server');
  }

  const data = raw.data || raw;

  const accessToken =
    data.accessToken ||
    data.token ||
    data.jwt ||
    data.jwtToken ||
    raw.accessToken ||
    raw.token ||
    raw.jwt ||
    '';

  const refreshToken =
    data.refreshToken ||
    raw.refreshToken ||
    '';

  let user: User;

  if (data.user) {
    user = {
      id: String(data.user.id || data.user.userId || '1'),
      firstName: data.user.firstName || (data.user.name ? data.user.name.split(' ')[0] : (data.user.username ? data.user.username.split('@')[0] : 'User')),
      lastName: data.user.lastName || (data.user.name ? data.user.name.split(' ').slice(1).join(' ') : ''),
      email: data.user.email || data.user.username || '',
      phone: data.user.phone || '',
      enabled: data.user.enabled ?? true,
      emailVerified: data.user.emailVerified ?? true,
      roles: Array.isArray(data.user.roles)
        ? data.user.roles.map((r: any) =>
            typeof r === 'string'
              ? { id: r, name: r.startsWith('ROLE_') ? r : `ROLE_${r.toUpperCase()}` }
              : r
          )
        : [{ id: '1', name: 'ROLE_USER' }],
      createdAt: data.user.createdAt || new Date().toISOString(),
      updatedAt: data.user.updatedAt || new Date().toISOString(),
    };
  } else if (data.email || data.username || data.id) {
    user = {
      id: String(data.id || '1'),
      firstName: data.firstName || (data.name ? data.name.split(' ')[0] : (data.username ? data.username.split('@')[0] : 'User')),
      lastName: data.lastName || (data.name ? data.name.split(' ').slice(1).join(' ') : ''),
      email: data.email || data.username || '',
      phone: data.phone || '',
      enabled: data.enabled ?? true,
      emailVerified: data.emailVerified ?? true,
      roles: Array.isArray(data.roles)
        ? data.roles.map((r: any) =>
            typeof r === 'string'
              ? { id: r, name: r.startsWith('ROLE_') ? r : `ROLE_${r.toUpperCase()}` }
              : r
          )
        : [{ id: '1', name: 'ROLE_USER' }],
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: data.updatedAt || new Date().toISOString(),
    };
  } else {
    user = {
      id: '1',
      firstName: 'User',
      lastName: '',
      email: 'user@commercehub.com',
      enabled: true,
      roles: [{ id: '1', name: 'ROLE_USER' }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  if (!accessToken) {
    throw new Error('Authentication response did not contain a valid JWT access token');
  }

  return {
    accessToken,
    refreshToken,
    user,
  };
}

export const authApi = {
  login: async (credentials: { email: string; password?: string }) => {
    const { data } = await axiosInstance.post<any>('/api/auth/login', credentials);
    const token = data.accessToken || data.token || data.jwt;

    if (token) {
      localStorage.setItem('accessToken', token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
      const profileRes = await axiosInstance.get<any>('/api/users/profile');
      const profileData = profileRes.data?.data || profileRes.data;

      return normalizeAuthResponse({
        ...data,
        user: profileData,
      });
    } catch {
      // If profile fails, use token payload or normalized login data
      return normalizeAuthResponse(data);
    }
  },

  register: async (userData: { firstName: string; lastName: string; email: string; password?: string; phone?: string }) => {
    const { data } = await axiosInstance.post<any>('/api/auth/register', userData);
    return normalizeAuthResponse(data);
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

