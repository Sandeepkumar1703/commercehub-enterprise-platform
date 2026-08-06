import { request, axiosClient } from './axiosClient';
import { Product } from '../types';

export const productApi = {
  getProducts: (page = 0, size = 12) =>
    request<any>('get', '/products', undefined, { page, size }),

  getProductById: (id: string | number) =>
    request<Product>('get', `/products/${id}`),

  searchProducts: (keyword: string, page = 0, size = 12) =>
    request<any>('get', '/products/search', undefined, { keyword, page, size }),

  filterByCategory: (categoryId: string | number, page = 0, size = 12) =>
    request<any>('get', `/products/filter/category/${categoryId}`, undefined, { page, size }),

  filterByPrice: (min: number, max: number, page = 0, size = 12) =>
    request<any>('get', '/products/filter/price', undefined, { min, max, page, size }),

  filterInStock: (page = 0, size = 12) =>
    request<any>('get', '/products/filter/in-stock', undefined, { page, size }),

  filterOutOfStock: (page = 0, size = 12) =>
    request<any>('get', '/products/filter/out-of-stock', undefined, { page, size }),

  createProduct: (productPayload: Partial<Product> | any) =>
    request<Product>('post', '/products', productPayload),

  updateProduct: (id: string | number, productPayload: Partial<Product> | any) =>
    request<Product>('put', `/products/${id}`, productPayload),

  deleteProduct: (id: string | number) =>
    request<void>('delete', `/products/${id}`),

  bulkUploadProducts: (products: any[]) =>
    request<Product[]>('post', '/products/bulk', products),

  uploadProductImage: async (productId: string | number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosClient.post(`/products/${productId}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  approveProduct: (id: string | number, isApproved: boolean) =>
    request<Product>('put', `/products/${id}/approve`, { isApproved }),

  getLowStockProducts: () =>
    request<Product[]>('get', '/products/low-stock'),
};

