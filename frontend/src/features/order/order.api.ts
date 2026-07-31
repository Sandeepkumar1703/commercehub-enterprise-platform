import { axiosInstance } from '../../core/api/axiosInstance';
import { Order, PaymentMethod } from '../../types';

export const orderApi = {
  createOrder: async (payload: { addressId?: string | number; shippingAddressId?: string | number; paymentMethod?: PaymentMethod; couponCode?: string; couponId?: number; notes?: string }) => {
    const body = {
      shippingAddressId: Number(payload.shippingAddressId || payload.addressId || 0),
      couponId: payload.couponId ? Number(payload.couponId) : undefined,
      notes: payload.notes || '',
    };
    const { data } = await axiosInstance.post<Order>('/api/orders', body);
    return data;
  },

  getMyOrders: async () => {
    const { data } = await axiosInstance.get<any>('/api/orders/my-orders');
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
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
