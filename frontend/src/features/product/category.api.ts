import { axiosInstance } from '../../core/api/axiosInstance';
import { Category } from '../../types';

export const categoryApi = {
  getCategories: async () => {
    const { data } = await axiosInstance.get<any>('/api/categories');
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  },

  getCategoryById: async (id: string) => {
    const { data } = await axiosInstance.get<Category>(`/api/categories/${id}`);
    return data;
  },

  createCategory: async (categoryData: Partial<Category>) => {
    const { data } = await axiosInstance.post<Category>('/api/categories', categoryData);
    return data;
  },

  updateCategory: async (id: string, categoryData: Partial<Category>) => {
    const { data } = await axiosInstance.put<Category>(`/api/categories/${id}`, categoryData);
    return data;
  },

  deleteCategory: async (id: string) => {
    const { data } = await axiosInstance.delete<{ message: string }>(`/api/categories/${id}`);
    return data;
  },
};
