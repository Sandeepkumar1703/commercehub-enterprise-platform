package com.commercehub.backend.wishlist.controller;

import com.commercehub.backend.common.response.ApiResponse;
import com.commercehub.backend.wishlist.dto.response.WishlistResponse;
import com.commercehub.backend.wishlist.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    /**
     * Add a product to the authenticated user's wishlist.
     *
     * POST /api/v1/wishlist/{productId}
     */
    @PostMapping("/{productId}")
    public ResponseEntity<ApiResponse<WishlistResponse>> addProductToWishlist(
            @PathVariable Long productId
    ) {

        WishlistResponse response =
                wishlistService.addProductToWishlist(productId);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ApiResponse.success(
                                "Product added to wishlist successfully.",
                                response
                        )
                );
    }

    /**
     * Remove a product from the authenticated user's wishlist.
     *
     * DELETE /api/v1/wishlist/{productId}
     */
    @DeleteMapping("/{productId}")
    public ResponseEntity<ApiResponse<Void>> removeProductFromWishlist(
            @PathVariable Long productId
    ) {

        wishlistService.removeProductFromWishlist(productId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Product removed from wishlist successfully.",
                        null
                )
        );
    }

    /**
     * Get all wishlist items for the authenticated user.
     *
     * GET /api/v1/wishlist
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<WishlistResponse>>> getMyWishlist() {

        List<WishlistResponse> wishlist =
                wishlistService.getMyWishlist();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Wishlist fetched successfully.",
                        wishlist
                )
        );
    }

}