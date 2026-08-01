package com.commercehub.backend.admin.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductsDashboardResponse {

    private Long totalProducts;

    private Long activeProducts;

    private Long inactiveProducts;

    private Long inStockProducts;

    private Long outOfStockProducts;

    private Long lowStockProducts;

    private Long totalCategories;
}