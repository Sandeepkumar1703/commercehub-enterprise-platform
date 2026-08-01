package com.commercehub.backend.analytics.dto.response;


import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class ProductAnalyticsResponse {

    private Long totalProducts;

    private Long activeProducts;

    private Long outOfStockProducts;

}