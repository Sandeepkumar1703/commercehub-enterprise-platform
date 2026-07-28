package com.commercehub.backend.cart.controller;

import com.commercehub.backend.cart.dto.request.UpdateCartRequest;
import com.commercehub.backend.cart.dto.response.CartResponse;
import com.commercehub.backend.cart.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {


    private final CartService cartService;


    /**
     * Get logged-in user's cart
     */
    @GetMapping
    public ResponseEntity<CartResponse> getCart() {

        return ResponseEntity.ok(
                cartService.getCart()
        );
    }


    /**
     * Add product to cart
     */
    @PostMapping("/{productId}")
    public ResponseEntity<CartResponse> addProductToCart(
            @PathVariable Long productId
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        cartService.addProductToCart(productId)
                );
    }


    /**
     * Update cart item quantity
     */
    @PutMapping("/items/{cartItemId}")
    public ResponseEntity<CartResponse> updateCartItem(
            @PathVariable Long cartItemId,
            @Valid @RequestBody UpdateCartRequest request
    ) {

        return ResponseEntity.ok(
                cartService.updateCartItem(
                        cartItemId,
                        request
                )
        );
    }


    /**
     * Remove item from cart
     */
    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<Void> removeCartItem(
            @PathVariable Long cartItemId
    ) {

        cartService.removeCartItem(cartItemId);

        return ResponseEntity.noContent()
                .build();
    }


    /**
     * Clear complete cart
     */
    @DeleteMapping
    public ResponseEntity<Void> clearCart() {

        cartService.clearCart();

        return ResponseEntity.noContent()
                .build();
    }

}