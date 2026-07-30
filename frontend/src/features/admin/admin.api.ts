import { axiosInstance } from '../../core/api/axiosInstance';
import { AdminDashboardData, Order, PaginatedResponse, Review, User } from '../../types';

export const adminApi = {
  getDashboardData: async () => {
    const { data } = await axiosInstance.get<AdminDashboardData>('/api/admin/dashboard');
    return data;
  },

  getUsers: async () => {
    const { data } = await axiosInstance.get<PaginatedResponse<User>>('/api/admin/users');
    return data;
  },

  toggleUserStatus: async (userId: string) => {
    const { data } = await axiosInstance.put<User>(`/api/admin/users/${userId}/toggle-status`);
    return data;
  },

  getOrders: async () => {
    const { data } = await axiosInstance.get<PaginatedResponse<Order>>('/api/admin/orders');
    return data;
  },

  getReviews: async () => {
    const { data } = await axiosInstance.get<PaginatedResponse<Review>>('/api/admin/reviews');
    return data;
  },

  moderateReview: async (reviewId: string, status: 'APPROVED' | 'REJECTED') => {
    const { data } = await axiosInstance.put<Review>(`/api/admin/reviews/${reviewId}/moderate`, { status });
    return data;
  },
};
