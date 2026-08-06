import { request } from './axiosClient';
import {
  AnalyticsDashboardMetrics,
  AnalyticsRevenueReport,
  AnalyticsSalesReport,
  YearlyAnalytics,
  SalesAnalyticsResponse,
  RevenueAnalyticsResponse,
  ProductAnalyticsResponse,
  OrderAnalyticsResponse,
  MonthlyAnalytics,
  CustomerAnalyticsResponse,
  CategoryAnalyticsResponse,
} from '../types';

export const analyticsApi = {
  getYearlyAnalytics: () => request<YearlyAnalytics[]>('get', '/analytics/yearly'),
  getSalesAnalytics: () => request<SalesAnalyticsResponse & AnalyticsSalesReport>('get', '/analytics/sales'),
  getRevenueAnalytics: () => request<RevenueAnalyticsResponse & AnalyticsRevenueReport>('get', '/analytics/revenue'),
  getProductAnalytics: () => request<ProductAnalyticsResponse>('get', '/analytics/products'),
  getOrderAnalytics: () => request<OrderAnalyticsResponse>('get', '/analytics/orders'),
  getMonthlyAnalytics: () => request<MonthlyAnalytics[]>('get', '/analytics/monthly'),
  getCustomerAnalytics: () => request<CustomerAnalyticsResponse>('get', '/analytics/customers'),
  getCategoryAnalytics: () => request<CategoryAnalyticsResponse>('get', '/analytics/categories'),
  getDashboardMetrics: () => request<AnalyticsDashboardMetrics>('get', '/analytics/dashboard'),
};

