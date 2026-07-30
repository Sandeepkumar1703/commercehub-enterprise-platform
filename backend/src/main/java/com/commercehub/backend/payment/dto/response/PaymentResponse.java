package com.commercehub.backend.payment.dto.response;

import com.commercehub.backend.payment.enums.PaymentMethod;
import com.commercehub.backend.payment.enums.PaymentStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponse {

    /**
     * Payment ID
     */
    private Long id;

    /**
     * Order ID
     */
    private Long orderId;

    /**
     * Payment amount
     */
    private BigDecimal amount;

    /**
     * Payment status
     */
    private PaymentStatus status;

    /**
     * Payment method
     */
    private PaymentMethod method;

    /**
     * Unique transaction ID
     */
    private String transactionId;

    /**
     * Stripe charge ID (future integration)
     */
    private String stripeChargeId;

    /**
     * Payment gateway name
     * Example:
     * STRIPE
     * RAZORPAY
     * PAYU
     * PHONEPE
     */
    private String gatewayName;

    /**
     * Gateway response message/reference
     */
    private String gatewayResponse;

    /**
     * Failure reason
     */
    private String errorMessage;

    /**
     * Refund timestamp
     */
    private LocalDateTime refundedAt;

    /**
     * Cancellation timestamp
     */
    private LocalDateTime cancelledAt;

    /**
     * Created timestamp
     */
    private LocalDateTime createdAt;

    /**
     * Updated timestamp
     */
    private LocalDateTime updatedAt;
}