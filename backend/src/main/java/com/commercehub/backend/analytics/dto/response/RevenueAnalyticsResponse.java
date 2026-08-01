package com.commercehub.backend.analytics.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class RevenueAnalyticsResponse {

    private BigDecimal totalRevenue;

    private BigDecimal averageOrderValue;

}