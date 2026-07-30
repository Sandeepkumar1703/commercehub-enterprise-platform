const ACCESS_TOKEN_KEY = 'commercehub_access_token';
const REFRESH_TOKEN_KEY = 'commercehub_refresh_token';

let memoryAccessToken: string | null = null;

export const tokenManager = {
  getAccessToken(): string | null {
    if (memoryAccessToken) return memoryAccessToken;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  setTokens(accessToken: string, refreshToken: string) {
    memoryAccessToken = accessToken;
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  clearTokens() {
    memoryAccessToken = null;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};
