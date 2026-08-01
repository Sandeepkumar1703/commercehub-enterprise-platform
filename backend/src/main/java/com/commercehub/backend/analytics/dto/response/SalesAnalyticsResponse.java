package com.commercehub.backend.analytics.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class SalesAnalyticsResponse {

    private Long totalOrders;

    private Long totalItemsSold;

    private BigDecimal totalSales;

}