import { request } from './axiosClient';
import {
  AdminDashboardSummary,
  AdminSalesDashboard,
  AdminRevenueDashboard,
  AdminProductsDashboard,
  AdminOrdersDashboard,
  AdminCustomersDashboard,
  AdminRecentOrder,
  AdminTopProduct,
  AdminLowStockProduct,
  Product,
  Order,
  User,
} from '../types';

export const adminApi = {
  getDashboardSummary: () => request<AdminDashboardSummary>('get', '/admin/dashboard'),
  getSalesDashboard: () => request<AdminSalesDashboard>('get', '/admin/dashboard/sales'),
  getRevenueDashboard: () => request<AdminRevenueDashboard>('get', '/admin/dashboard/revenue'),
  getProductsDashboard: () => request<AdminProductsDashboard>('get', '/admin/dashboard/products'),
  getOrdersDashboard: () => request<AdminOrdersDashboard>('get', '/admin/dashboard/orders'),
  getCustomersDashboard: () => request<AdminCustomersDashboard>('get', '/admin/dashboard/customers'),
  getRecentOrders: () => request<AdminRecentOrder[] | Order[]>('get', '/admin/dashboard/recent-orders'),
  getTopProducts: () => request<AdminTopProduct[] | Product[]>('get', '/admin/dashboard/top-products'),
  getLowStockItems: () => request<AdminLowStockProduct[] | Product[]>('get', '/admin/dashboard/low-stock'),

  // Backwards compatibility aliases preserving existing method names
  getDashboardMetrics: () => request<AdminDashboardSummary>('get', '/admin/dashboard'),
  getSalesOverview: () => request<AdminSalesDashboard>('get', '/admin/dashboard/sales'),
  getRevenueOverview: () => request<AdminRevenueDashboard>('get', '/admin/dashboard/revenue'),
  getAdminProducts: () => request<AdminProductsDashboard>('get', '/admin/dashboard/products'),
  getAdminOrders: () => request<AdminOrdersDashboard>('get', '/admin/dashboard/orders'),
  getCustomers: () => request<AdminCustomersDashboard | User[]>('get', '/admin/dashboard/customers'),
};

