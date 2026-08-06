export type PaymentStatus = 'SUCCESS' | 'FAILED' | 'REFUNDED' | 'PENDING' | 'RETRYING' | 'CANCELLED';

export type PaymentMethod = 'CREDIT_CARD' | 'PAYPAL' | 'STRIPE' | 'CASH_ON_DELIVERY';

export interface Payment {
  paymentId: string;
  orderId: string;
  amount: number;
  status: PaymentStatus;
  gateway: string;
  transactionRef: string;
  timestamp: string;
}
