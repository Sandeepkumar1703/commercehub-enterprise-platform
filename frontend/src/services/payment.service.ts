import apiClient from '../core/api/axios';
import { API_ENDPOINTS } from '../core/api/apiEndpoints';

export const paymentService = {
  createPayment: (payload: Record<string, any>) =>
    apiClient.post(API_ENDPOINTS.PAYMENTS.BASE, payload),

  getPayments: () => apiClient.get(API_ENDPOINTS.PAYMENTS.BASE),

  getPaymentById: (paymentId: string) =>
    apiClient.get(API_ENDPOINTS.PAYMENTS.BY_ID(paymentId)),

  getPaymentsByOrder: (orderId: string) =>
    apiClient.get(API_ENDPOINTS.PAYMENTS.BY_ORDER(orderId)),

  getPaymentsByStatus: (status: string) =>
    apiClient.get(API_ENDPOINTS.PAYMENTS.BY_STATUS(status)),

  getPaymentByTransaction: (transactionId: string) =>
    apiClient.get(API_ENDPOINTS.PAYMENTS.BY_TRANSACTION(transactionId)),

  markSuccess: (paymentId: string) =>
    apiClient.put(API_ENDPOINTS.PAYMENTS.SUCCESS(paymentId)),

  markFailed: (paymentId: string) =>
    apiClient.put(API_ENDPOINTS.PAYMENTS.FAILED(paymentId)),

  cancelPayment: (paymentId: string) =>
    apiClient.put(API_ENDPOINTS.PAYMENTS.CANCEL(paymentId)),

  refundPayment: (paymentId: string) =>
    apiClient.put(API_ENDPOINTS.PAYMENTS.REFUND(paymentId)),

  retryPayment: (paymentId: string) =>
    apiClient.put(API_ENDPOINTS.PAYMENTS.RETRY(paymentId)),
};
