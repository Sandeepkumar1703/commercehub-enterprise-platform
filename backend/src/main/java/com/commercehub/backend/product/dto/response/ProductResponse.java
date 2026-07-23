package com.commercehub.backend.product.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class ProductResponse {

    private Long id;

    private String name;

    private String description;

    private BigDecimal price;

    private String sku;
    
    private Integer stockQuantity;

    private String imageUrl;

    private Long categoryId;

    private String categoryName;
}