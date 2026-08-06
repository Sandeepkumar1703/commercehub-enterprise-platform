import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { authApi } from '../api/authApi';
import { userApi } from '../api/userApi';

export const ROLE_DEFAULT_PERMISSIONS: Record<UserRole, string[]> = {
  SUPER_ADMIN: ['*'],
  ADMIN: [
    'PRODUCT_VIEW', 'PRODUCT_CREATE', 'PRODUCT_EDIT', 'PRODUCT_DELETE', 'PRODUCT_APPROVE',
    'ORDER_VIEW', 'ORDER_UPDATE', 'ORDER_CANCEL', 'ORDER_SHIP',
    'USER_VIEW', 'USER_CREATE', 'USER_MANAGE',
    'SELLER_VIEW', 'SELLER_APPROVE', 'SELLER_REJECT', 'SELLER_SUSPEND',
    'PAYMENT_VIEW', 'PAYMENT_MANAGE', 'PAYMENT_REFUND',
    'SHIPPING_VIEW', 'SHIPPING_UPDATE',
    'INVENTORY_VIEW', 'INVENTORY_MANAGE',
    'MEDIA_UPLOAD', 'MEDIA_DELETE',
    'COUPON_MANAGE', 'ANALYTICS_VIEW', 'REPORT_VIEW', 'REPORT_EXPORT'
  ],
  MODERATOR: [
    'PRODUCT_VIEW', 'PRODUCT_APPROVE', 'PRODUCT_EDIT',
    'REVIEW_VIEW', 'REVIEW_MODERATE', 'REVIEW_DELETE',
    'USER_VIEW', 'USER_BLOCK',
    'REPORT_VIEW', 'SELLER_VIEW'
  ],
  SELLER: [
    'PRODUCT_VIEW', 'PRODUCT_CREATE', 'PRODUCT_EDIT', 'PRODUCT_DELETE',
    'ORDER_VIEW', 'ORDER_UPDATE', 'ORDER_SHIP',
    'INVENTORY_VIEW', 'INVENTORY_MANAGE',
    'COUPON_MANAGE', 'ANALYTICS_VIEW',
    'REVIEW_VIEW', 'REVIEW_REPLY', 'MEDIA_UPLOAD'
  ],
  CUSTOMER: [
    'PRODUCT_VIEW',
    'ORDER_VIEW', 'ORDER_CREATE',
    'WISHLIST_MANAGE', 'CART_MANAGE',
    'REVIEW_VIEW', 'REVIEW_CREATE'
  ]
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email?: string, password?: string, role?: UserRole) => Promise<void>;
  register: (payload: { name: string; email: string; password?: string; role?: UserRole; storeName?: string }) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (permissionCode: string) => boolean;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  refreshPermissions: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const deriveRoleFromEmail = (emailStr: string, requestedRole?: UserRole): UserRole => {
    if (requestedRole) return requestedRole;
    const lower = (emailStr || '').toLowerCase();
    if (lower.includes('superadmin')) return 'SUPER_ADMIN';
    if (lower.includes('admin')) return 'ADMIN';
    if (lower.includes('moderator')) return 'MODERATOR';
    if (lower.includes('seller')) return 'SELLER';
    return 'CUSTOMER';
  };

  const fetchProfileAndPermissions = async (preferredRole?: UserRole): Promise<User | null> => {
    try {
      const profRes = await userApi.getProfile();
      const profile = (profRes as any).data || profRes;
      if (!profile || !profile.email) {
        return null;
      }

      const assignedRole = deriveRoleFromEmail(profile.email, preferredRole || profile.role);

      let perms: string[] = [];
      try {
        const permRes = await userApi.getUserPermissions(profile.id);
        const permData = (permRes as any).data || permRes;
        if (permData && Array.isArray(permData.permissions)) {
          perms = permData.permissions.map((p: any) => (typeof p === 'string' ? p : p.name));
        } else if (Array.isArray(permData)) {
          perms = permData.map((p: any) => (typeof p === 'string' ? p : p.name));
        }
      } catch {
        // Fallback to role-based default permissions
      }

      if (!perms || perms.length === 0) {
        perms = ROLE_DEFAULT_PERMISSIONS[assignedRole] || [];
      }

      const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(' ') || profile.email;
      const fullUser: User = {
        id: String(profile.id || 'usr_1'),
        name: fullName,
        email: profile.email,
        role: assignedRole,
        permissions: perms,
        status: 'ACTIVE',
      };

      localStorage.setItem('user_session', JSON.stringify(fullUser));
      setUser(fullUser);
      return fullUser;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('jwt_token');
      const savedUser = localStorage.getItem('user_session');

      if (savedToken) {
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch {
            // parse error
          }
        }
        await fetchProfileAndPermissions();
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email?: string, password?: string, role?: UserRole) => {
    setLoading(true);
    try {
      const response = await authApi.login({ email, password });
      const res = (response as any).data || response;
      const token = res?.accessToken || res?.token;
      if (token) {
        localStorage.setItem('jwt_token', token);
        if (res?.refreshToken) {
          localStorage.setItem('refresh_token', res.refreshToken);
        }
        const loggedUser = await fetchProfileAndPermissions(role);
        if (!loggedUser) {
          throw new Error('Failed to retrieve user profile after login');
        }
      } else {
        throw new Error('Invalid authentication credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: { name: string; email: string; password?: string; role?: UserRole; storeName?: string }) => {
    setLoading(true);
    try {
      const nameParts = (payload.name || '').trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      await authApi.register({
        firstName,
        lastName,
        email: payload.email,
        password: payload.password,
      });

      // Auto login after successful registration
      if (payload.password) {
        await login(payload.email, payload.password, payload.role);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore API failure during logout
    } finally {
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_session');
      setUser(null);
    }
  };

  const hasPermission = (permissionCode: string): boolean => {
    if (!user) return false;
    if (user.role === 'SUPER_ADMIN') return true;
    if (user.permissions && user.permissions.includes('*')) return true;
    return user.permissions ? user.permissions.includes(permissionCode) : false;
  };

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    if (user.role === 'SUPER_ADMIN') return true;
    const roleList = Array.isArray(roles) ? roles : [roles];
    return roleList.includes(user.role);
  };

  const refreshPermissions = async () => {
    if (!user) return;
    try {
      const permRes = await userApi.getUserPermissions(user.id);
      const permData = (permRes as any).data || permRes;
      if (permData && Array.isArray(permData.permissions)) {
        const perms = permData.permissions.map((p: any) => (typeof p === 'string' ? p : p.name));
        setUser((prev) => (prev ? { ...prev, permissions: perms } : prev));
      }
    } catch {
      // Keep existing permissions
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        hasPermission,
        hasRole,
        refreshPermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
};

