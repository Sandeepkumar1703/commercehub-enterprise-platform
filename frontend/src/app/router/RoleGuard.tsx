import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { RoleName, hasRole } from '../../core/auth/permissions';
import { AccessDeniedPage } from '../../shared/pages/AccessDeniedPage';

interface RoleGuardProps {
  allowedRoles: RoleName | RoleName[] | string | string[];
  children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const location = useLocation();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isAllowed = hasRole(user, allowedRoles);

  if (!isAllowed) {
    const rolesStr = Array.isArray(allowedRoles) ? allowedRoles.join(', ') : String(allowedRoles);
    return <AccessDeniedPage requiredRoleOrPermission={`Role required: ${rolesStr}`} />;
  }

  return <>{children}</>;
};
