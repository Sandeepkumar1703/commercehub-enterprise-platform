package com.commercehub.backend.cart.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemResponse {

    private Long cartItemId;

    private Long productId;

    private String productName;

    private String productDescription;

    private String imageUrl;

    private BigDecimal unitPrice;

    private Long  quantity;

    private BigDecimal totalPrice;

}