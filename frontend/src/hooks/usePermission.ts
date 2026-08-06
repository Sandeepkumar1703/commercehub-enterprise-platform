import { useAuthContext } from '../context/AuthContext';
import { UserRole } from '../types';

export const usePermission = () => {
  const { hasPermission, hasRole, user } = useAuthContext();

  const can = (permissionCode: string) => hasPermission(permissionCode);
  const isRole = (roles: UserRole | UserRole[]) => hasRole(roles);

  return {
    can,
    isRole,
    userPermissions: user?.permissions || [],
    role: user?.role,
  };
};
