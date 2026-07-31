import { User, RoleName } from '../../types';

export type { RoleName };

export type Permission =
  // Products
  | 'PRODUCT_VIEW'
  | 'PRODUCT_CREATE'
  | 'PRODUCT_UPDATE'
  | 'PRODUCT_DELETE'
  | 'PRODUCT_APPROVE'
  // Categories
  | 'CATEGORY_VIEW'
  | 'CATEGORY_MANAGE'
  // Inventory
  | 'INVENTORY_VIEW'
  | 'INVENTORY_UPDATE'
  // Orders
  | 'ORDER_VIEW'
  | 'ORDER_CREATE'
  | 'ORDER_UPDATE'
  | 'ORDER_CANCEL'
  | 'ORDER_RETURN'
  // Cart & Wishlist
  | 'CART_MANAGE'
  | 'WISHLIST_MANAGE'
  // Reviews
  | 'REVIEW_CREATE'
  | 'REVIEW_EDIT'
  | 'REVIEW_DELETE'
  | 'REVIEW_RESPOND'
  // Coupons
  | 'COUPON_VIEW'
  | 'COUPON_CREATE'
  | 'COUPON_MANAGE'
  // Payments & Refunds
  | 'PAYMENT_VIEW'
  | 'PAYMENT_MANAGE'
  | 'REFUND_ISSUE'
  // Shipping
  | 'SHIPPING_MANAGE'
  // User Management
  | 'USER_VIEW'
  | 'USER_CREATE'
  | 'USER_UPDATE'
  | 'USER_DELETE'
  | 'USER_MANAGE'
  | 'PROFILE_MANAGE'
  // Seller Management
  | 'SELLER_APPROVE'
  | 'SELLER_ANALYTICS_VIEW'
  // Support & Content
  | 'SUPPORT_TICKET_CREATE'
  | 'SUPPORT_TICKET_MANAGE'
  | 'CMS_MANAGE'
  // Reports & Analytics
  | 'REPORT_VIEW'
  | 'REPORT_EXPORT'
  | 'ANALYTICS_VIEW'
  // Super Admin & Platform System
  | 'ROLE_MANAGE'
  | 'PERMISSION_MANAGE'
  | 'ADMIN_MANAGE'
  | 'SYSTEM_SETTINGS'
  | 'PLATFORM_CONFIG'
  | 'DATABASE_BACKUP'
  | 'DATABASE_RESTORE'
  | 'FEATURE_FLAG_MANAGE'
  | 'API_KEY_MANAGE'
  | 'AUDIT_VIEW'
  | 'IMPERSONATE_USER'
  | 'GLOBAL_NOTIFICATION_SEND';

export const CUSTOMER_PERMISSIONS: Permission[] = [
  'PRODUCT_VIEW',
  'CATEGORY_VIEW',
  'CART_MANAGE',
  'WISHLIST_MANAGE',
  'ORDER_VIEW',
  'ORDER_CREATE',
  'ORDER_CANCEL',
  'ORDER_RETURN',
  'REVIEW_CREATE',
  'REVIEW_EDIT',
  'PROFILE_MANAGE',
  'SUPPORT_TICKET_CREATE',
  'COUPON_VIEW',
  'PAYMENT_VIEW',
];

export const SELLER_PERMISSIONS: Permission[] = [
  ...CUSTOMER_PERMISSIONS,
  'PRODUCT_CREATE',
  'PRODUCT_UPDATE',
  'PRODUCT_DELETE',
  'INVENTORY_VIEW',
  'INVENTORY_UPDATE',
  'ORDER_UPDATE',
  'COUPON_CREATE',
  'COUPON_MANAGE',
  'REVIEW_RESPOND',
  'SELLER_ANALYTICS_VIEW',
  'SHIPPING_MANAGE',
  'PAYMENT_MANAGE',
];

export const ADMIN_PERMISSIONS: Permission[] = [
  ...SELLER_PERMISSIONS,
  'PRODUCT_APPROVE',
  'CATEGORY_MANAGE',
  'USER_VIEW',
  'USER_CREATE',
  'USER_UPDATE',
  'USER_MANAGE',
  'SELLER_APPROVE',
  'REFUND_ISSUE',
  'SUPPORT_TICKET_MANAGE',
  'CMS_MANAGE',
  'REPORT_VIEW',
  'REPORT_EXPORT',
  'ANALYTICS_VIEW',
  'REVIEW_DELETE',
];

export const SUPER_ADMIN_PERMISSIONS: Permission[] = [
  ...ADMIN_PERMISSIONS,
  'ROLE_MANAGE',
  'PERMISSION_MANAGE',
  'ADMIN_MANAGE',
  'SYSTEM_SETTINGS',
  'PLATFORM_CONFIG',
  'DATABASE_BACKUP',
  'DATABASE_RESTORE',
  'FEATURE_FLAG_MANAGE',
  'API_KEY_MANAGE',
  'AUDIT_VIEW',
  'IMPERSONATE_USER',
  'GLOBAL_NOTIFICATION_SEND',
  'USER_DELETE',
];

/**
 * Normalizes role string to canonical form
 */
export function normalizeRole(role: string): RoleName {
  const upper = role.toUpperCase().trim();
  if (upper === 'SUPER_ADMIN' || upper === 'ROLE_SUPER_ADMIN') return 'ROLE_SUPER_ADMIN';
  if (upper === 'ADMIN' || upper === 'ROLE_ADMIN') return 'ROLE_ADMIN';
  if (upper === 'SELLER' || upper === 'ROLE_SELLER') return 'ROLE_SELLER';
  if (upper === 'CUSTOMER' || upper === 'ROLE_CUSTOMER' || upper === 'USER' || upper === 'ROLE_USER') {
    return 'ROLE_CUSTOMER';
  }
  return 'ROLE_CUSTOMER';
}

/**
 * Normalizes a list of user roles
 */
export function getUserRoles(user: User | null): RoleName[] {
  if (!user || !Array.isArray(user.roles) || user.roles.length === 0) {
    return ['ROLE_CUSTOMER'];
  }
  return user.roles.map((r) => normalizeRole(r.name));
}

/**
 * Get primary role of user
 */
export function getPrimaryRole(user: User | null): RoleName {
  const roles = getUserRoles(user);
  if (roles.includes('ROLE_SUPER_ADMIN')) return 'ROLE_SUPER_ADMIN';
  if (roles.includes('ROLE_ADMIN')) return 'ROLE_ADMIN';
  if (roles.includes('ROLE_SELLER')) return 'ROLE_SELLER';
  return 'ROLE_CUSTOMER';
}

/**
 * Checks if user has any of the allowed roles
 */
export function hasRole(user: User | null, allowedRoles: RoleName | RoleName[] | string | string[]): boolean {
  if (!user) return false;
  const userRoles = getUserRoles(user);
  const targets = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  const normalizedTargets = targets.map((r) => normalizeRole(r));
  return userRoles.some((ur) => normalizedTargets.includes(ur));
}

/**
 * Gets all permissions granted to user
 */
export function getUserPermissions(user: User | null): Permission[] {
  if (!user) return [];

  // Combine backend-provided permissions with role-based default permissions
  const permsSet = new Set<Permission>();

  if (Array.isArray(user.permissions)) {
    user.permissions.forEach((p) => permsSet.add(p as Permission));
  }

  const userRoles = getUserRoles(user);

  if (userRoles.includes('ROLE_SUPER_ADMIN')) {
    SUPER_ADMIN_PERMISSIONS.forEach((p) => permsSet.add(p));
  } else if (userRoles.includes('ROLE_ADMIN')) {
    ADMIN_PERMISSIONS.forEach((p) => permsSet.add(p));
  } else if (userRoles.includes('ROLE_SELLER')) {
    SELLER_PERMISSIONS.forEach((p) => permsSet.add(p));
  } else {
    CUSTOMER_PERMISSIONS.forEach((p) => permsSet.add(p));
  }

  return Array.from(permsSet);
}

/**
 * Checks if user has permission
 */
export function hasPermission(
  user: User | null,
  requiredPermissions: Permission | Permission[],
  requireAll: boolean = false
): boolean {
  if (!user) return false;
  const userPerms = getUserPermissions(user);
  const targets = Array.isArray(requiredPermissions) ? requiredPermissions : [requiredPermissions];

  if (requireAll) {
    return targets.every((p) => userPerms.includes(p));
  }
  return targets.some((p) => userPerms.includes(p));
}

/**
 * Returns the default dashboard path for a user based on their primary role
 */
export function getUserDefaultDashboard(user: User | null, lang: string = 'en'): string {
  const role = getPrimaryRole(user);
  switch (role) {
    case 'ROLE_SUPER_ADMIN':
      return `/${lang}/portal/super-admin/dashboard`;
    case 'ROLE_ADMIN':
      return `/${lang}/portal/admin/dashboard`;
    case 'ROLE_SELLER':
      return `/${lang}/seller/dashboard`;
    case 'ROLE_CUSTOMER':
    default:
      return `/${lang}/dashboard`;
  }
}
