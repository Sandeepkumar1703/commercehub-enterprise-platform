import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';

interface RoleGuardProps {
  roles: UserRole | UserRole[];
  children: React.ReactNode;
  fallbackUrl?: string;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  roles,
  children,
  fallbackUrl = '/403',
}) => {
  const { hasRole, user } = useAuth();

  if (!user || !hasRole(roles)) {
    return <Navigate to={fallbackUrl} replace />;
  }

  return <>{children}</>;
};
