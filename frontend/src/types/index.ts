export type RoleName = 'ROLE_USER' | 'ROLE_ADMIN';

export interface Role {
  id: string;
  name: RoleName;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  enabled: boolean;
  emailVerified?: boolean;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  postalCode?: string;
  isDefaultLanguage: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  itemCount?: number;
  createdAt: string;
}

export interface Inventory {
  id: string;
  productId: string;
  quantity: number;
  reservedQuantity: number;
  updatedAt: string;
}

export interface Product {
  id: string;
  categoryId: string;
  categoryName?: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  stockQuantity: number;
  imageUrl: string;
  additionalImages?: string[];
  rating: number;
  reviewCount: number;
  active: boolean;
  isFeatured?: boolean;
  isFlashSale?: boolean;
  specifications?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shippingFee: number;
  couponCode?: string;
  total: number;
  createdAt: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  createdAt: string;
}

export type OrderStatus =
  | 'PLACED'
  | 'PROCESSING'
  | 'PACKED'
  | 'SHIPPED'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURNED';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage?: string;
  productImageUrl?: string;
  quantity: number;
  price: number;
}

export type PaymentMethod = 'CARD' | 'PAYPAL' | 'CRYPTO' | 'COD' | 'UPI' | 'RAZORPAY';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';

export interface Order {
  id: string;
  orderNumber?: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  addressId: string;
  address?: Address;
  shippingAddress?: Address;
  orderStatus: OrderStatus;
  status?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  orderId: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionId: string;
  amount: number;
  createdAt: string;
}

export interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location: string;
  timestamp: string;
}

export interface Shipping {
  id: string;
  orderId: string;
  trackingNumber: string;
  carrier: string;
  shippingStatus: OrderStatus;
  status?: string;
  shippedDate?: string;
  deliveredDate?: string;
  estimatedDelivery: string;
  activities?: {
    status: string;
    location: string;
    timestamp: string;
    completed: boolean;
  }[];
  trackingEvents?: TrackingEvent[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export type DiscountType = 'PERCENTAGE' | 'FIXED' | 'FIXED_AMOUNT';

export interface Coupon {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  minOrderValue?: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  expiryDate: string;
  active?: boolean;
  isActive?: boolean;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface AdminDashboardData {
  totalRevenue: number;
  revenueChangePercent: number;
  totalOrders: number;
  pendingOrders?: number;
  ordersChangePercent: number;
  totalUsers?: number;
  totalCustomers: number;
  customersChangePercent: number;
  lowStockItemsCount: number;
  lowStockCount?: number;
  recentOrders: Order[];
  lowStockProducts?: Product[];
  topSellingProducts: {
    product: Product;
    soldQuantity: number;
    revenue: number;
  }[];
}

export interface AnalyticsSalesData {
  period: string;
  sales: number;
  orders: number;
}

export interface AnalyticsRevenueData {
  month: string;
  revenue: number;
  target: number;
}
