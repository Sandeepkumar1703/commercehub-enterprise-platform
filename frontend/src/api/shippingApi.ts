import { request } from './axiosClient';
import { ShippingDetails } from '../types';

export const shippingApi = {
  createShipment: (shippingData: { orderId: number | string; carrier: string; estimatedDelivery?: string } | Partial<ShippingDetails>) =>
    request<ShippingDetails>('post', '/shipping', shippingData),
  getShipmentById: (shippingId: string | number) =>
    request<ShippingDetails>('get', `/shipping/${shippingId}`),
  getShippingDetails: (shippingId: string | number) =>
    request<ShippingDetails>('get', `/shipping/${shippingId}`),
  getShippingList: () =>
    request<ShippingDetails[]>('get', '/shipping'),
  getShippingByOrderId: (orderId: string | number) =>
    request<ShippingDetails>('get', `/shipping/order/${orderId}`),
  getShipmentsByStatus: (status: string) =>
    request<ShippingDetails[]>('get', `/shipping/status/${status}`),
  markAsShipped: (shippingId: string | number, data?: { trackingNumber?: string; trackingUrl?: string }) =>
    request<ShippingDetails>('put', `/shipping/${shippingId}/ship`, data),
  markAsOutForDelivery: (shippingId: string | number) =>
    request<ShippingDetails>('put', `/shipping/${shippingId}/out-for-delivery`),
  markAsDelivered: (shippingId: string | number) =>
    request<ShippingDetails>('put', `/shipping/${shippingId}/deliver`),
  cancelShipment: (shippingId: string | number) =>
    request<ShippingDetails>('put', `/shipping/${shippingId}/cancel`),
  updateShippingStatus: (id: string | number, status: string) =>
    request<ShippingDetails>('put', `/shipping/${id}/status`, { status }),
};

