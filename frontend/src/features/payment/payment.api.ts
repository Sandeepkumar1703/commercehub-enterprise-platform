import { axiosInstance } from '../../core/api/axiosInstance';
import { Payment, PaymentMethod } from '../../types';

export const paymentApi = {
  initiatePayment: async (payload: { orderId: string; paymentMethod: PaymentMethod; amount: number }) => {
    const { data } = await axiosInstance.post<Payment>('/api/payments', payload);
    return data;
  },

  verifyPayment: async (payload: { transactionId: string; signature?: string }) => {
    const { data } = await axiosInstance.post<{ verified: boolean; message: string }>('/api/payments/verify', payload);
    return data;
  },

  getPaymentHistory: async () => {
    const { data } = await axiosInstance.get<Payment[]>('/api/payments/history');
    return data;
  },
};
