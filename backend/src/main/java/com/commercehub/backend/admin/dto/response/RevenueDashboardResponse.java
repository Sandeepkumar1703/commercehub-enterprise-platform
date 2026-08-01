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
public class RevenueDashboardResponse {

    private BigDecimal totalRevenue;

    private BigDecimal todayRevenue;

    private BigDecimal weeklyRevenue;

    private BigDecimal monthlyRevenue;

    private BigDecimal yearlyRevenue;

    private BigDecimal averageOrderValue;

    private BigDecimal highestOrderValue;

    private BigDecimal lowestOrderValue;
}