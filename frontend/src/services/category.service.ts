import apiClient from '../core/api/axios';
import { API_ENDPOINTS } from '../core/api/apiEndpoints';

export const categoryService = {
  getCategories: () => apiClient.get(API_ENDPOINTS.CATEGORIES.BASE),

  getCategoryById: (id: string) => apiClient.get(API_ENDPOINTS.CATEGORIES.BY_ID(id)),

  createCategory: (payload: Record<string, any>) =>
    apiClient.post(API_ENDPOINTS.CATEGORIES.BASE, payload),

  updateCategory: (id: string, payload: Record<string, any>) =>
    apiClient.put(API_ENDPOINTS.CATEGORIES.BY_ID(id), payload),

  deleteCategory: (id: string) =>
    apiClient.delete(API_ENDPOINTS.CATEGORIES.BY_ID(id)),
};
