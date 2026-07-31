import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  CreditCard,
  Users,
  ShieldCheck,
  Languages,
  Globe2,
  Image,
  Tag,
  Star,
  MapPin,
  Heart,
  User,
  Boxes,
  BarChart3,
  Truck,
  Bell,
  HelpCircle,
  Server,
  KeyRound,
  UserCog,
  Lock,
  Sliders,
  Flag,
  Plug,
  Database,
  FileText,
  Activity,
  Crown,
} from 'lucide-react';
import { PermissionCode } from './permissions';

export interface MenuItem {
  title: string;
  path: string;
  icon: any;
  permission?: PermissionCode;
  badge?: string;
  badgeColor?: string;
}

export interface MenuSection {
  sectionTitle: string;
  items: MenuItem[];
}

export const CUSTOMER_NAVIGATION: MenuSection[] = [
  {
    sectionTitle: 'My Account',
    items: [
      { title: 'Overview', path: 'dashboard', icon: LayoutDashboard },
      { title: 'My Orders', path: 'orders', icon: ShoppingCart },
      { title: 'Saved Wishlist', path: 'wishlist', icon: Heart },
      { title: 'Shipping Addresses', path: 'addresses', icon: MapPin },
      { title: 'Profile Settings', path: 'profile', icon: User },
    ],
  },
];

export const SELLER_NAVIGATION: MenuSection[] = [
  {
    sectionTitle: 'Store Operations',
    items: [
      { title: 'Seller Overview', path: 'seller/dashboard', icon: LayoutDashboard, permission: 'ANALYTICS_VIEW' },
      { title: 'Product Catalog', path: 'seller/products', icon: Package, permission: 'PRODUCT_VIEW' },
      { title: 'Inventory Control', path: 'seller/inventory', icon: Boxes, permission: 'INVENTORY_VIEW' },
      { title: 'Orders & Fulfillment', path: 'seller/orders', icon: ShoppingCart, permission: 'ORDER_VIEW' },
      { title: 'Promotions & Coupons', path: 'seller/coupons', icon: Tag, permission: 'COUPON_VIEW' },
    ],
  },
  {
    sectionTitle: 'Merchant Insights',
    items: [
      { title: 'Sales Analytics', path: 'seller/analytics', icon: BarChart3, permission: 'SELLER_ANALYTICS_VIEW' },
      { title: 'Customer Reviews', path: 'seller/reviews', icon: Star, permission: 'REVIEW_RESPOND' },
      { title: 'Payout & Payments', path: 'seller/payments', icon: CreditCard, permission: 'PAYMENT_VIEW' },
    ],
  },
];

export const ADMIN_NAVIGATION: MenuSection[] = [
  {
    sectionTitle: 'Catalog & Store',
    items: [
      { title: 'Control Panel', path: 'portal/admin/dashboard', icon: LayoutDashboard, permission: 'ANALYTICS_VIEW' },
      { title: 'Products', path: 'portal/admin/products', icon: Package, permission: 'PRODUCT_VIEW' },
      { title: 'Categories', path: 'portal/admin/categories', icon: FolderTree, permission: 'CATEGORY_VIEW' },
      { title: 'Orders & Shipments', path: 'portal/admin/orders', icon: ShoppingCart, permission: 'ORDER_VIEW' },
      { title: 'Transactions', path: 'portal/admin/payments', icon: CreditCard, permission: 'PAYMENT_VIEW' },
      { title: 'Promotions', path: 'portal/admin/coupons', icon: Tag, permission: 'COUPON_VIEW' },
      { title: 'Moderation', path: 'portal/admin/reviews', icon: Star, permission: 'REVIEW_EDIT' },
    ],
  },
  {
    sectionTitle: 'Security & System',
    items: [
      { title: 'User Management', path: 'portal/admin/users', icon: Users, permission: 'USER_VIEW' },
      { title: 'Role Access (RBAC)', path: 'portal/admin/roles', icon: ShieldCheck, permission: 'ROLE_MANAGE' },
      { title: 'Languages', path: 'portal/admin/languages', icon: Languages, permission: 'SYSTEM_SETTINGS' },
      { title: 'Translations', path: 'portal/admin/translations', icon: Globe2, permission: 'SYSTEM_SETTINGS' },
      { title: 'Media Manager', path: 'portal/admin/media', icon: Image, permission: 'CMS_MANAGE' },
    ],
  },
];

export const SUPER_ADMIN_NAVIGATION: MenuSection[] = [
  {
    sectionTitle: 'Executive Control',
    items: [
      { title: 'Control Center', path: 'portal/super-admin/dashboard', icon: Activity, permission: 'AUDIT_VIEW' },
      { title: 'System Microservices', path: 'portal/super-admin/system', icon: Server, permission: 'SYSTEM_SETTINGS' },
    ],
  },
  {
    sectionTitle: 'Access & Security',
    items: [
      { title: 'All Platform Users', path: 'portal/super-admin/users', icon: Users, permission: 'USER_MANAGE' },
      { title: 'Roles Management', path: 'portal/super-admin/roles', icon: ShieldCheck, permission: 'ROLE_MANAGE' },
      { title: 'Permissions Matrix', path: 'portal/super-admin/permissions', icon: KeyRound, permission: 'PERMISSION_MANAGE' },
      { title: 'System Admins', path: 'portal/super-admin/admins', icon: UserCog, permission: 'ADMIN_MANAGE' },
      { title: 'Security Policies', path: 'portal/super-admin/security', icon: Lock, permission: 'SYSTEM_SETTINGS' },
    ],
  },
  {
    sectionTitle: 'System Operations',
    items: [
      { title: 'Platform Config', path: 'portal/super-admin/configurations', icon: Sliders, permission: 'PLATFORM_CONFIG' },
      { title: 'Feature Flags', path: 'portal/super-admin/feature-flags', icon: Flag, permission: 'FEATURE_FLAG_MANAGE' },
      { title: 'API Keys & Gateways', path: 'portal/super-admin/integrations', icon: Plug, permission: 'API_KEY_MANAGE' },
      { title: 'Database & Backups', path: 'portal/super-admin/database', icon: Database, permission: 'DATABASE_BACKUP' },
      { title: 'System Audit Logs', path: 'portal/super-admin/audit-logs', icon: FileText, permission: 'AUDIT_VIEW' },
    ],
  },
];
