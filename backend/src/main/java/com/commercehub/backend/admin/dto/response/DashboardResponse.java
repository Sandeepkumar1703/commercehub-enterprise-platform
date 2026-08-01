package com.commercehub.backend.admin.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private Long totalCustomers;

    private Long totalProducts;

    private Long totalOrders;

    private Long totalCategories;

    private Double totalRevenue;

    private Long pendingOrders;

    private Long completedOrders;

    private Long cancelledOrders;

    private Long lowStockProducts;
}