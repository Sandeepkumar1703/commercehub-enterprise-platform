export type UserRole = 'super_admin' | 'ops_manager' | 'auditor' | 'support_agent' | 'seller' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: 'active' | 'suspended' | 'pending';
  lastActive: string;
  twoFactorEnabled?: boolean;
}

export interface ProductVariant {
  id: string;
  color: string;
  size: string;
  sku: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQuantity: number;
  sku: string;
  description: string;
  specs: Record<string, string>;
  materials: string[];
  images: string[];
  variants?: ProductVariant[];
  sellerId: string;
  sellerName: string;
  status: 'published' | 'draft' | 'low_stock' | 'archived';
  createdAt: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  selectedVariantId?: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export type OrderStatus = 'placed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  items: OrderItem[];
  totalAmount: number;
  taxAmount: number;
  shippingFee: number;
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  status: OrderStatus;
  trackingNumber?: string;
  carrier?: string;
  createdAt: string;
  estimatedDelivery?: string;
}

export interface Seller {
  id: string;
  storeName: string;
  ownerName: string;
  email: string;
  rating: number;
  grossRevenue: number;
  availableBalance: number;
  pendingBalance: number;
  activeOrdersCount: number;
  status: 'verified' | 'pending' | 'suspended';
  avatar: string;
  joinedDate: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  ipAddress: string;
  geoLocation: string;
  actionType: 'CREATE' | 'UPDATE' | 'DELETE' | 'IMPERSONATE' | 'REFUND' | 'LOGIN';
  targetEntity: string;
  targetId: string;
  beforeState?: Record<string, any>;
  afterState?: Record<string, any>;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
  verifiedPurchase: boolean;
  userVotedHelpful?: boolean;
}

export interface PayoutTransaction {
  id: string;
  date: string;
  amount: number;
  status: 'completed' | 'processing' | 'failed';
  bankAccount: string;
  commissionDeduction: number;
  shippingDeduction: number;
  netPayout: number;
}
