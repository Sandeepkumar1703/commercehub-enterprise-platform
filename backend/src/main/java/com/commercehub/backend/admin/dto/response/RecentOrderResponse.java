package com.commercehub.backend.admin.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecentOrderResponse {

    private Long orderId;

    private String orderNumber;

    private Long customerId;

    private String customerName;

    private BigDecimal orderAmount;

    private String orderStatus;

    private String paymentStatus;

    private LocalDateTime orderDate;
}