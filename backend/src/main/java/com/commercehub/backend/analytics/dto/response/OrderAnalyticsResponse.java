package com.commercehub.backend.analytics.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderAnalyticsResponse {

    private Long totalOrders;

    private Long pendingOrders;

    private Long completedOrders;

    private Long cancelledOrders;

}