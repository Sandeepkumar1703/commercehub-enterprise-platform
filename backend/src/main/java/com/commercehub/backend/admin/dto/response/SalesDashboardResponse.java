package com.commercehub.backend.admin.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SalesDashboardResponse {

    private BigDecimal todaySales;

    private BigDecimal weeklySales;

    private BigDecimal monthlySales;

    private BigDecimal yearlySales;

    private BigDecimal averageOrderValue;

    private Long totalPaidOrders;

    private Long totalRefundedOrders;
}