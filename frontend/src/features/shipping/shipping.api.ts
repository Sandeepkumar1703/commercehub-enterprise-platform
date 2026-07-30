import { axiosInstance } from '../../core/api/axiosInstance';
import { Shipping } from '../../types';

export const shippingApi = {
  getShippingByOrderId: async (orderId: string) => {
    const { data } = await axiosInstance.get<Shipping>(`/api/shipping/${orderId}`);
    return data;
  },

  updateShipping: async (orderId: string, shippingData: Partial<Shipping>) => {
    const { data } = await axiosInstance.put<Shipping>(`/api/shipping/${orderId}`, shippingData);
    return data;
  },
};
