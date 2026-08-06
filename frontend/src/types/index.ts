export * from './User';
export * from './Product';
export * from './Order';
export * from './Payment';
export * from './Role';
export * from './Permission';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
  errorCode?: string;
}

export type SellerStatus = 'APPROVED' | 'PENDING' | 'REJECTED' | 'SUSPENDED';

export interface SellerProfile {
  id: string;
  storeName: string;
  ownerName: string;
  email: string;
  phone: string;
  rating: number;
  status: SellerStatus;
  productCount: number;
  totalSales: number;
}

export interface SystemSettings {
  siteName: string;
  supportEmail: string;
  currency: string;
  taxRatePercent: number;
  maintenanceMode: boolean;
  requireSellerApproval: boolean;
}

export interface AuditLog {
  id: string;
  actorEmail: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
  details: string;
}

export interface AnalyticsDashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  activeProducts: number;
  lowStockCount: number;
  totalCustomers: number;
  growthRate: number;
  revenueGraph?: { month: string; sales: number }[];
}

export interface AnalyticsRevenueReport {
  grossRevenue: number;
  netProfit: number;
  averageOrderValue: number;
  refundsTotal: number;
  quarterlyTrend?: { period: string; revenue: number }[];
}

export interface AnalyticsSalesReport {
  topProducts: { productId: string; title: string; unitsSold: number; totalSales: number }[];
  categorySales: { category: string; sales: number; percentage: number }[];
}

export interface Coupon {
  code: string;
  discountPercent: number;
  validUntil: string;
  isActive: boolean;
}

export interface CartItem {
  cartItemId?: number;
  id?: string | number;
  productId: string | number;
  productName?: string;
  productTitle?: string;
  productDescription?: string;
  imageUrl?: string;
  productImage?: string;
  unitPrice?: number;
  price?: number;
  quantity: number;
  totalPrice?: number;
  sellerId?: string;
}

export interface Cart {
  cartId?: number;
  userId?: number;
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

export interface WishlistItem {
  wishlistId?: number;
  id?: string | number;
  productId: string | number;
  productName?: string;
  productTitle?: string;
  productDescription?: string;
  price?: number;
  sku?: string;
  imageUrl?: string;
  image?: string;
  images?: string[];
  categoryId?: number | string;
  categoryName?: string;
  stockQuantity?: number;
  addedAt?: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  sellerResponse?: string;
}

export interface ShippingDetails {
  id: string;
  orderId: string;
  carrier: string;
  trackingNumber: string;
  status: string;
  estimatedDelivery: string;
  address: string;
  updates: { timestamp: string; location: string; status: string }[];
}

export interface Language {
  id?: number;
  code: string;
  name: string;
  nativeName: string;
  flagUrl?: string;
  defaultLanguage?: boolean;
  enabled: boolean;
  rtl?: boolean;
  direction?: 'ltr' | 'rtl';
  sortOrder?: number;
}

export interface MediaFile {
  id: string;
  fileName: string;
  originalFileName?: string;
  contentType?: string;
  fileSize?: number;
  storagePath?: string;
  fileUrl?: string;
  uploadedBy?: number;
  createdAt?: string;
  // Legacy / UI computed getters
  url?: string;
  sizeMb?: number;
  mimeType?: string;
  uploadedAt?: string;
}

export interface InventoryRecord {
  productId: string | number;
  productName?: string;
  quantity?: number;
  reserved?: number;
  availableQuantity?: number;
  title?: string;
  sku?: string;
  stock?: number;
  status?: 'HEALTHY' | 'LOW_STOCK' | 'OUT_OF_STOCK' | string;
}

// Analytics DTOs
export interface YearlyAnalytics {
  year: number;
  revenue: number;
  orders: number;
}

export interface SalesAnalyticsResponse {
  totalOrders: number;
  totalItemsSold: number;
  totalSales: number;
}

export interface RevenueAnalyticsResponse {
  totalRevenue: number;
  averageOrderValue: number;
  grossRevenue?: number;
  netProfit?: number;
  quarterlyTrend?: { period: string; revenue: number }[];
}

export interface ProductAnalyticsResponse {
  totalProducts: number;
  activeProducts: number;
  outOfStockProducts: number;
}

export interface OrderAnalyticsResponse {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
}

export interface MonthlyAnalytics {
  month: string;
  revenue: number;
  orders: number;
}

export interface CustomerAnalyticsResponse {
  totalCustomers: number;
  newCustomers: number;
}

export interface CategoryAnalyticsResponse {
  totalCategories: number;
}

// Admin Dashboard DTOs
export interface AdminDashboardSummary {
  totalCustomers: number;
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  lowStockProducts: number;
}

export interface AdminSalesDashboard {
  todaySales: number;
  weeklySales: number;
  monthlySales: number;
  yearlySales: number;
  averageOrderValue: number;
  totalPaidOrders: number;
  totalRefundedOrders: number;
}

export interface AdminRevenueDashboard {
  totalRevenue: number;
  todayRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  averageOrderValue: number;
  highestOrderValue: number;
  lowestOrderValue: number;
}

export interface AdminProductsDashboard {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  inStockProducts: number;
  outOfStockProducts: number;
  lowStockProducts: number;
  totalCategories: number;
}

export interface AdminOrdersDashboard {
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  returnedOrders: number;
}

export interface AdminCustomersDashboard {
  totalCustomers: number;
  activeCustomers: number;
  inactiveCustomers: number;
  verifiedCustomers: number;
  newCustomersToday: number;
  newCustomersThisWeek: number;
  newCustomersThisMonth: number;
}

export interface AdminRecentOrder {
  orderId: number | string;
  orderNumber: string;
  customerId: number | string;
  customerName: string;
  orderAmount: number;
  orderStatus: string;
  paymentStatus: string;
  orderDate: string;
}

export interface AdminTopProduct {
  productId: number | string;
  productName: string;
  sku: string;
  imageUrl: string;
  totalQuantitySold: number;
  totalRevenue: number;
  averageRating: number;
  reviewCount: number;
  currentStock: number;
}

export interface AdminLowStockProduct {
  productId: number | string;
  productName: string;
  sku: string;
  categoryName: string;
  currentStock: number;
  minimumStock: number;
  active: boolean;
}
