package com.commercehub.backend.order.dto.response;

import com.commercehub.backend.order.entity.OrderStatus;
import com.commercehub.backend.payment.enums.PaymentStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {


    private Long id;

    private String orderNumber;

    private BigDecimal totalAmount;

    private BigDecimal taxAmount;

    private BigDecimal discountAmount;

    private BigDecimal shippingCost;

    private OrderStatus status;

    private PaymentStatus paymentStatus;

    private Long shippingAddressId;

    private Long couponId;

    private String notes;

    private LocalDateTime createdAt;

    private List<OrderItemResponse> items;
}