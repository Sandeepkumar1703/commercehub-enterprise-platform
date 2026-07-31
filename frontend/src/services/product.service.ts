import apiClient from '../core/api/axios';
import { API_ENDPOINTS } from '../core/api/apiEndpoints';

export const productService = {
  getProducts: (params?: Record<string, any>) =>
    apiClient.get(API_ENDPOINTS.PRODUCTS.BASE, { params }),

  getProductById: (id: string) =>
    apiClient.get(API_ENDPOINTS.PRODUCTS.BY_ID(id)),

  createProduct: (payload: Record<string, any>) =>
    apiClient.post(API_ENDPOINTS.PRODUCTS.BASE, payload),

  updateProduct: (id: string, payload: Record<string, any>) =>
    apiClient.put(API_ENDPOINTS.PRODUCTS.BY_ID(id), payload),

  deleteProduct: (id: string) =>
    apiClient.delete(API_ENDPOINTS.PRODUCTS.BY_ID(id)),

  uploadProductImage: (productId: string, formData: FormData) =>
    apiClient.post(API_ENDPOINTS.PRODUCTS.IMAGE(productId), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  bulkCreateProducts: (products: any[]) =>
    apiClient.post(API_ENDPOINTS.PRODUCTS.BULK, { products }),

  searchProducts: (query: string) =>
    apiClient.get(`${API_ENDPOINTS.PRODUCTS.SEARCH}?query=${encodeURIComponent(query)}`),

  filterByPrice: (minPrice: number, maxPrice: number) =>
    apiClient.get(`${API_ENDPOINTS.PRODUCTS.FILTER_PRICE}?min=${minPrice}&max=${maxPrice}`),

  filterOutOfStock: () => apiClient.get(API_ENDPOINTS.PRODUCTS.FILTER_OUT_OF_STOCK),

  filterInStock: () => apiClient.get(API_ENDPOINTS.PRODUCTS.FILTER_IN_STOCK),

  filterByCategory: (categoryId: string) =>
    apiClient.get(API_ENDPOINTS.PRODUCTS.FILTER_CATEGORY(categoryId)),
};
