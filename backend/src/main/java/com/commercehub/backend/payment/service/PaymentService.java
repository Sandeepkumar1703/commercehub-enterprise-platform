package com.commercehub.backend.payment.service;

import com.commercehub.backend.payment.dto.request.PaymentRequest;
import com.commercehub.backend.payment.dto.response.PaymentResponse;
import com.commercehub.backend.payment.enums.PaymentStatus;

import java.util.List;

public interface PaymentService {

    /**
     * Create a new payment for an order.
     */
    PaymentResponse createPayment(PaymentRequest request);

    /**
     * Get payment by ID.
     */
    PaymentResponse getPaymentById(Long paymentId);

    /**
     * Get all payment attempts for an order.
     */
    List<PaymentResponse> getPaymentsByOrderId(Long orderId);

    /**
     * Mark payment as successful.
     */
    PaymentResponse markPaymentSuccess(Long paymentId, String gatewayReferenceId);

    /**
     * Mark payment as failed.
     */
    PaymentResponse markPaymentFailed(Long paymentId, String errorMessage);

    /**
     * Cancel a pending payment.
     */
    PaymentResponse cancelPayment(Long paymentId);

    /**
     * Refund a successful payment.
     */
    PaymentResponse refundPayment(Long paymentId);

    /**
     * Retry a failed payment.
     */
    PaymentResponse retryPayment(Long paymentId);

    /**
     * Get payment by transaction ID.
     */
    PaymentResponse getPaymentByTransactionId(String transactionId);

    /**
     * Get all payments having the given status.
     */
    List<PaymentResponse> getPaymentsByStatus(PaymentStatus status);

    /**
     * Get all payments.
     */
    List<PaymentResponse> getAllPayments();
}