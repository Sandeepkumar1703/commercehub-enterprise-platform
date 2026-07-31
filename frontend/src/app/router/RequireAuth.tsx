import React from 'react';
import { ProtectedRoute } from './ProtectedRoute';

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};
