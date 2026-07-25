import { ApiClient } from './apiClient';

export interface ProductApiItem {
  id: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  stockQuantity: number;
  imageUrl: string;
  categoryId: number;
  categoryName?: string;
}

export interface ProductCreateRequest {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
  sku: string;
  categoryId: number;
}

export const productService = {
  // GET /api/products
  async getAllProducts(): Promise<ProductApiItem[]> {
    return await ApiClient.get<ProductApiItem[]>('/api/products');
  },

  // GET /api/products/{id}
  async getProductById(id: number): Promise<ProductApiItem> {
    return await ApiClient.get<ProductApiItem>(`/api/products/${id}`);
  },

  // POST /api/products
  async createProduct(data: ProductCreateRequest): Promise<ProductApiItem> {
    return await ApiClient.post<ProductApiItem>('/api/products', data);
  },

  // PUT /api/products/{id}
  async updateProduct(id: number, data: ProductCreateRequest): Promise<ProductApiItem> {
    return await ApiClient.put<ProductApiItem>(`/api/products/${id}`, data);
  },

  // DELETE /api/products/{id}
  async deleteProduct(id: number): Promise<void> {
    return await ApiClient.delete<void>(`/api/products/${id}`);
  },

  // POST /api/products/bulk
  async createBulkProducts(data: ProductCreateRequest[]): Promise<ProductApiItem[]> {
    return await ApiClient.post<ProductApiItem[]>('/api/products/bulk', data);
  },
};
