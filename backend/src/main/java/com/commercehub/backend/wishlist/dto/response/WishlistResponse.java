package com.commercehub.backend.wishlist.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WishlistResponse {

    /**
     * Wishlist Entry ID
     */
    private Long wishlistId;

    /**
     * Product ID
     */
    private Long productId;

    /**
     * Product Name
     */
    private String productName;

    /**
     * Product Description
     */
    private String productDescription;

    /**
     * Product Price
     */
    private BigDecimal price;

    /**
     * Product SKU
     */
    private String sku;

    /**
     * Product Image URL
     */
    private String imageUrl;

    /**
     * Category ID
     */
    private Long categoryId;

    /**
     * Category Name
     */
    private String categoryName;

    /**
     * Available Stock
     */
    private Integer stockQuantity;

    /**
     * Date when the product was added to the wishlist
     */
    private LocalDateTime addedAt;

}