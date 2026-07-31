import apiClient from '../core/api/axios';
import { API_ENDPOINTS } from '../core/api/apiEndpoints';

export const orderService = {
  createOrder: (payload: Record<string, any>) =>
    apiClient.post(API_ENDPOINTS.ORDERS.BASE, payload),

  getOrderById: (id: string) => apiClient.get(API_ENDPOINTS.ORDERS.BY_ID(id)),

  getMyOrders: () => apiClient.get(API_ENDPOINTS.ORDERS.MY_ORDERS),

  cancelOrder: (id: string) => apiClient.put(API_ENDPOINTS.ORDERS.CANCEL(id)),
};
