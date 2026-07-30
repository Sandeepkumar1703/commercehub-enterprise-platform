package com.commercehub.backend.payment.dto.request;

import com.commercehub.backend.payment.enums.PaymentMethod;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentRequest {

    /**
     * Order for which payment is being made.
     */
    @NotNull(message = "Order ID is required")
    private Long orderId;

    /**
     * Payment amount.
     */
    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than zero")
    private BigDecimal amount;

    /**
     * Payment method selected by the customer.
     */
    @NotNull(message = "Payment method is required")
    private PaymentMethod method;
}