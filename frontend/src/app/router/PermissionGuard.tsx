import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { Permission, hasPermission } from '../../core/auth/permissions';
import { AccessDeniedPage } from '../../shared/pages/AccessDeniedPage';

interface PermissionGuardProps {
  permission: Permission | Permission[];
  requireAll?: boolean;
  children: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permission,
  requireAll = false,
  children,
}) => {
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

  const isAllowed = hasPermission(user, permission, requireAll);

  if (!isAllowed) {
    const permStr = Array.isArray(permission) ? permission.join(', ') : permission;
    return <AccessDeniedPage requiredRoleOrPermission={`Permission required: ${permStr}`} />;
  }

  return <>{children}</>;
};
