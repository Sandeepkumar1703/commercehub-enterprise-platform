import { request } from './axiosClient';
import { Order, OrderStatus } from '../types';

export const orderApi = {
  createOrder: (orderPayload: { shippingAddressId?: number | string; couponId?: number | string; notes?: string } | Partial<Order>) =>
    request<Order>('post', '/orders', orderPayload),
  getOrderById: (id: string | number) => request<Order>('get', `/orders/${id}`),
  getOrders: () => request<Order[]>('get', '/orders'),
  getMyOrders: () => request<Order[]>('get', '/orders/my-orders'),
  updateOrderStatus: (id: string | number, status: OrderStatus) =>
    request<Order>('put', `/orders/${id}/status`, { status }),
  cancelOrder: (id: string | number) => request<Order | void>('put', `/orders/${id}/cancel`),
};

