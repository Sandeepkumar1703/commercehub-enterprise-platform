import { request } from './axiosClient';
import { Payment } from '../types';

export const paymentApi = {
  createPayment: (paymentDetails: { orderId: number | string; amount: number; method: string } | Partial<Payment>) =>
    request<Payment>('post', '/payments', paymentDetails),
  getPaymentById: (paymentId: string | number) =>
    request<Payment>('get', `/payments/${paymentId}`),
  getPayments: () => request<Payment[]>('get', '/payments'),
  getPaymentByOrderId: (orderId: string | number) =>
    request<Payment[]>('get', `/payments/order/${orderId}`),
  getPaymentsByStatus: (status: string) =>
    request<Payment[]>('get', `/payments/status/${status}`),
  getPaymentByTransactionId: (transactionId: string) =>
    request<Payment>('get', `/payments/transaction/${transactionId}`),
  markSuccess: (paymentId: string | number, gatewayReferenceId?: string) =>
    request<Payment>('put', `/payments/${paymentId}/success`, undefined, gatewayReferenceId ? { gatewayReferenceId } : undefined),
  markFailed: (paymentId: string | number, errorMessage?: string) =>
    request<Payment>('put', `/payments/${paymentId}/failed`, undefined, errorMessage ? { errorMessage } : undefined),
  retryPayment: (paymentId: string | number) =>
    request<Payment>('put', `/payments/${paymentId}/retry`),
  cancelPayment: (paymentId: string | number) =>
    request<Payment>('put', `/payments/${paymentId}/cancel`),
  refundPayment: (paymentId: string | number) =>
    request<Payment>('put', `/payments/${paymentId}/refund`),
  updatePaymentStatus: (paymentId: string | number, status: string) =>
    request<Payment>('put', `/payments/${paymentId}/status`, { status }),
};

