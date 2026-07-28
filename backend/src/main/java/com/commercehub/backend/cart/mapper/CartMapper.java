package com.commercehub.backend.cart.mapper;

import com.commercehub.backend.cart.dto.response.CartItemResponse;
import com.commercehub.backend.cart.dto.response.CartResponse;
import com.commercehub.backend.cart.entity.Cart;
import com.commercehub.backend.cart.entity.CartItem;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class CartMapper {


    public CartItemResponse toItemResponse(CartItem item) {

        BigDecimal totalPrice =
                item.getUnitPrice()
                        .multiply(BigDecimal.valueOf(item.getQuantity()));


        return CartItemResponse.builder()
                .cartItemId(item.getId())
                .productId(item.getProduct().getId())
                .productName(item.getProduct().getName())
                .productDescription(item.getProduct().getDescription())
                .imageUrl(item.getProduct().getImageUrl())
                .unitPrice(item.getUnitPrice())
                .quantity(item.getQuantity())
                .totalPrice(totalPrice)
                .build();
    }


    public CartResponse toCartResponse(Cart cart) {

        List<CartItemResponse> items =
                cart.getItems()
                        .stream()
                        .map(this::toItemResponse)
                        .toList();


        Long totalItems =
        items.stream()
                .mapToLong(CartItemResponse::getQuantity)
                .sum();


        BigDecimal totalAmount =
                items.stream()
                        .map(CartItemResponse::getTotalPrice)
                        .reduce(
                                BigDecimal.ZERO,
                                BigDecimal::add
                        );


        return CartResponse.builder()
                .cartId(cart.getId())
                .userId(cart.getUser().getId())
                .items(items)
                .totalItems(totalItems)
                .totalAmount(totalAmount)
                .build();
    }
}