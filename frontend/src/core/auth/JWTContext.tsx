import React, { createContext, useContext, useMemo } from 'react';
import { useAppSelector } from '../../app/store/hooks';
import { tokenManager } from './tokenManager';

interface JWTContextType {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  tokenPayload: Record<string, any> | null;
}

const JWTContext = createContext<JWTContextType>({
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  tokenPayload: null,
});

export const JWTProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const token = tokenManager.getAccessToken();
  const refreshToken = tokenManager.getRefreshToken();

  const tokenPayload = useMemo(() => {
    if (!token) return null;
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) return null;
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }, [token]);

  return (
    <JWTContext.Provider value={{ token, refreshToken, isAuthenticated, tokenPayload }}>
      {children}
    </JWTContext.Provider>
  );
};

export const useJWT = () => useContext(JWTContext);
