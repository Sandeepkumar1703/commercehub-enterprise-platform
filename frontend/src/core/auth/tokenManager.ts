const ACCESS_TOKEN_KEY = 'commercehub_access_token';
const REFRESH_TOKEN_KEY = 'commercehub_refresh_token';

let memoryAccessToken: string | null = null;

export const tokenManager = {
  getAccessToken(): string | null {
    if (memoryAccessToken && memoryAccessToken !== 'undefined' && memoryAccessToken !== 'null') {
      return memoryAccessToken;
    }
    const stored = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (stored && stored !== 'undefined' && stored !== 'null' && stored.trim() !== '') {
      return stored;
    }
    return null;
  },

  setTokens(accessToken: string, refreshToken: string) {
    if (accessToken && accessToken !== 'undefined' && accessToken !== 'null' && accessToken.trim() !== '') {
      memoryAccessToken = accessToken;
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    } else {
      memoryAccessToken = null;
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }

    if (refreshToken && refreshToken !== 'undefined' && refreshToken !== 'null' && refreshToken.trim() !== '') {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    } else {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  },

  getRefreshToken(): string | null {
    const stored = localStorage.getItem(REFRESH_TOKEN_KEY);
    return stored && stored !== 'undefined' && stored !== 'null' && stored.trim() !== '' ? stored : null;
  },

  clearTokens() {
    memoryAccessToken = null;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

