import {
  api,
  AuthLoginRequest,
  AuthRegisterRequest
} from "../../../core/api/apiClient";

import { tokenStorage } from "../../../core/auth/tokenStorage";

export const authService = {

  login: async (credentials: AuthLoginRequest) => {
    try {
      return await api.auth.login(credentials);
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

  setTokens: (
    accessToken: string,
    refreshToken?: string
  ) => {
    tokenStorage.setTokens(accessToken, refreshToken);
  },

  /**
   * Logout current user.
   *
   * Calls backend logout API and
   * clears locally stored tokens.
   */
  logout: async () => {

    try {

      await api.auth.logout();

    } catch (error) {

      console.error("Logout API failed:", error);

    } finally {

      // Always clear local tokens
      tokenStorage.removeAuthToken();

    }

  }

};