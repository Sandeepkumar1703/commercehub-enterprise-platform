import { axiosInstance } from '../../core/api/axiosInstance';
import { AnalyticsRevenueData, AnalyticsSalesData, Product } from '../../types';

export const analyticsApi = {
  getSalesData: async () => {
    const { data } = await axiosInstance.get<AnalyticsSalesData[]>('/api/analytics/sales');
    return data;
  },

  getRevenueData: async () => {
    const { data } = await axiosInstance.get<AnalyticsRevenueData[]>('/api/analytics/revenue');
    return data;
  },

  getTopProducts: async () => {
    const { data } = await axiosInstance.get<Product[]>('/api/analytics/products');
    return data;
  },

  getInventoryStatus: async () => {
    const { data } = await axiosInstance.get<{ inStock: number; lowStock: number; outOfStock: number }>('/api/analytics/inventory');
    return data;
  },
};
