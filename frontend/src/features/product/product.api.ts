import { axiosInstance } from '../../core/api/axiosInstance';
import { PaginatedResponse, Product } from '../../types';

export interface ProductQueryFilter {
  page?: number;
  size?: number;
  categoryId?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
}

export const productApi = {
  getProducts: async (filters: ProductQueryFilter = {}) => {
    const params = new URLSearchParams();
    if (filters.page !== undefined) params.append('page', filters.page.toString());
    if (filters.size !== undefined) params.append('size', filters.size.toString());
    if (filters.categoryId) params.append('categoryId', filters.categoryId);
    if (filters.sort) params.append('sort', filters.sort);
    if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());
    if (filters.minRating !== undefined) params.append('minRating', filters.minRating.toString());
    if (filters.inStock) params.append('inStock', 'true');

    const { data } = await axiosInstance.get<any>(`/api/products?${params.toString()}`);
    const content = Array.isArray(data)
      ? data
      : Array.isArray(data?.content)
      ? data.content
      : Array.isArray(data?.data?.content)
      ? data.data.content
      : [];

    return {
      content,
      totalElements: data?.totalElements ?? content.length,
      totalPages: data?.totalPages ?? 1,
      page: data?.number ?? filters.page ?? 0,
      size: data?.size ?? filters.size ?? content.length,
    } as PaginatedResponse<Product>;
  },

  searchProducts: async (keyword: string) => {
    const { data } = await axiosInstance.get<any>(`/api/products/search?keyword=${encodeURIComponent(keyword)}`);
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.content)) return data.content;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  },

  getProductById: async (id: string) => {
    const { data } = await axiosInstance.get<Product>(`/api/products/${id}`);
    return data;
  },

  createProduct: async (productData: Partial<Product>) => {
    const { data } = await axiosInstance.post<Product>('/api/products', productData);
    return data;
  },

  updateProduct: async (id: string, productData: Partial<Product>) => {
    const { data } = await axiosInstance.put<Product>(`/api/products/${id}`, productData);
    return data;
  },

  deleteProduct: async (id: string) => {
    const { data } = await axiosInstance.delete<{ message: string }>(`/api/products/${id}`);
    return data;
  },
};
