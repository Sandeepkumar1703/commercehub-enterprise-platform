package com.commercehub.backend.wishlist.service;

import com.commercehub.backend.wishlist.dto.response.WishlistResponse;

import java.util.List;

public interface WishlistService {

    /**
     * Add a product to the authenticated user's wishlist.
     *
     * @param productId Product ID
     * @return WishlistResponse
     */
    WishlistResponse addProductToWishlist(Long productId);

    /**
     * Remove a product from the authenticated user's wishlist.
     *
     * @param productId Product ID
     */
    void removeProductFromWishlist(Long productId);

    /**
     * Get all wishlist items of the authenticated user.
     *
     * @return List of WishlistResponse
     */
    List<WishlistResponse> getMyWishlist();

}