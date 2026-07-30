import { axiosInstance } from '../../core/api/axiosInstance';
import { Order, PaymentMethod } from '../../types';

export const orderApi = {
  createOrder: async (payload: { addressId: string; paymentMethod: PaymentMethod; couponCode?: string }) => {
    const { data } = await axiosInstance.post<Order>('/api/orders', payload);
    return data;
  },

  getMyOrders: async () => {
    const { data } = await axiosInstance.get<Order[]>('/api/orders/my-orders');
    return data;
  },

  getOrderById: async (orderId: string) => {
    const { data } = await axiosInstance.get<Order>(`/api/orders/${orderId}`);
    return data;
  },

  cancelOrder: async (orderId: string) => {
    const { data } = await axiosInstance.put<Order>(`/api/orders/${orderId}/cancel`);
    return data;
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    const { data } = await axiosInstance.put<Order>(`/api/orders/${orderId}/status`, { status });
    return data;
  },
};
