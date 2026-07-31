import React, { createContext, useContext, useMemo } from 'react';
import { useAppSelector } from '../../app/store/hooks';
import { Permission, getUserPermissions, hasPermission } from './permissions';

interface PermissionContextType {
  permissions: Permission[];
  can: (permission: Permission | Permission[], requireAll?: boolean) => boolean;
}

const PermissionContext = createContext<PermissionContextType>({
  permissions: [],
  can: () => false,
});

export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);

  const permissions = useMemo(() => getUserPermissions(user), [user]);

  const can = useMemo(() => {
    return (requiredPermissions: Permission | Permission[], requireAll: boolean = false) => {
      return hasPermission(user, requiredPermissions, requireAll);
    };
  }, [user]);

  return (
    <PermissionContext.Provider value={{ permissions, can }}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = () => useContext(PermissionContext);
