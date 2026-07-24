import { api, AuthLoginRequest, AuthRegisterRequest } from '../../../core/api/apiClient';
import { tokenStorage } from '../../../core/auth/tokenStorage';

export const authService = {
  login: async (credentials: AuthLoginRequest) => {
    try {
      const response = await api.auth.login(credentials);
      return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
  },

  register: async (userData: AuthRegisterRequest) => {
    try {
      return await api.auth.register(userData);
        } catch (error) {
        console.error(error);
        throw error;
    }
  },

  setTokens: (accessToken: string, refreshToken?: string) => {
    tokenStorage.setTokens(accessToken, refreshToken);
  },

  logout: () => {
    tokenStorage.removeAuthToken();
  }
};
