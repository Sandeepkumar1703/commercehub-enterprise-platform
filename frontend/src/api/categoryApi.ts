import { request } from './axiosClient';
import { Category } from '../types';

export const categoryApi = {
  getCategories: () => request<Category[]>('get', '/categories'),
  getCategoryById: (id: string | number) => request<Category>('get', `/categories/${id}`),
  createCategory: (category: Partial<Category>) => request<Category>('post', '/categories', category),
  updateCategory: (id: string | number, category: Partial<Category>) =>
    request<Category>('put', `/categories/${id}`, category),
  deleteCategory: (id: string | number) => request<void>('delete', `/categories/${id}`),
};
