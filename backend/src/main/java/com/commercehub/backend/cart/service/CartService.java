package com.commercehub.backend.cart.service;

import com.commercehub.backend.cart.dto.request.UpdateCartRequest;
import com.commercehub.backend.cart.dto.response.CartResponse;

public interface CartService {


    CartResponse getCart();


    CartResponse addProductToCart(Long productId);


    CartResponse updateCartItem(
            Long cartItemId,
            UpdateCartRequest request
    );


    void removeCartItem(Long cartItemId);


    void clearCart();

}