package com.commercehub.backend.admin.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LowStockProductResponse {

    private Long productId;

    private String productName;

    private String sku;

    private String categoryName;

    private Long currentStock;

    private Long minimumStock;

    private Boolean active;
}