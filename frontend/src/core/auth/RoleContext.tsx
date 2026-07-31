import React, { createContext, useContext, useMemo } from 'react';
import { useAppSelector } from '../../app/store/hooks';
import { RoleName, getPrimaryRole, getUserRoles, hasRole } from './permissions';

interface RoleContextType {
  roles: RoleName[];
  primaryRole: RoleName;
  isCustomer: boolean;
  isSeller: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  hasRole: (allowedRoles: RoleName | RoleName[] | string | string[]) => boolean;
}

const RoleContext = createContext<RoleContextType>({
  roles: ['ROLE_CUSTOMER'],
  primaryRole: 'ROLE_CUSTOMER',
  isCustomer: true,
  isSeller: false,
  isAdmin: false,
  isSuperAdmin: false,
  hasRole: () => false,
});

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);

  const roles = useMemo(() => getUserRoles(user), [user]);
  const primaryRole = useMemo(() => getPrimaryRole(user), [user]);

  const isCustomer = primaryRole === 'ROLE_CUSTOMER';
  const isSeller = primaryRole === 'ROLE_SELLER';
  const isAdmin = primaryRole === 'ROLE_ADMIN' || primaryRole === 'ROLE_SUPER_ADMIN';
  const isSuperAdmin = primaryRole === 'ROLE_SUPER_ADMIN';

  const checkRole = useMemo(() => {
    return (allowedRoles: RoleName | RoleName[] | string | string[]) => {
      return hasRole(user, allowedRoles);
    };
  }, [user]);

  return (
    <RoleContext.Provider
      value={{
        roles,
        primaryRole,
        isCustomer,
        isSeller,
        isAdmin,
        isSuperAdmin,
        hasRole: checkRole,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
