export type ProductStatus = 'APPROVED' | 'PENDING_APPROVAL' | 'REJECTED' | 'DRAFT';

export interface Product {
  id: string | number;
  name?: string;
  title?: string;
  sku?: string;
  description?: string;
  price: number;
  comparePrice?: number;
  category?: string;
  categoryName?: string;
  categoryId?: string | number;
  brand?: string;
  stock?: number;
  stockQuantity?: number;
  sellerId?: string;
  sellerName?: string;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
  images?: string[];
  status?: ProductStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string | number;
  name: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  active?: boolean;
  totalProducts?: number;
  productCount?: number;
  createdAt?: string;
  updatedAt?: string;
}
