package com.commercehub.backend.wishlist.service.impl;

import com.commercehub.backend.wishlist.service.WishlistService;
import com.commercehub.backend.common.exception.DuplicateResourceException;
import com.commercehub.backend.common.exception.ResourceNotFoundException;
import com.commercehub.backend.product.entity.Product;
import com.commercehub.backend.product.repository.ProductRepository;
import com.commercehub.backend.user.entity.User;
import com.commercehub.backend.user.repository.UserRepository;
import com.commercehub.backend.wishlist.dto.response.WishlistResponse;
import com.commercehub.backend.wishlist.entity.Wishlist;
import com.commercehub.backend.wishlist.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public WishlistResponse addProductToWishlist(Long productId) {

        User user = getAuthenticatedUser();

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id : " + productId
                        ));

        if (wishlistRepository.existsByUserAndProduct(user, product)) {
            throw new DuplicateResourceException(
                    "Product already exists in wishlist."
            );
        }

        Wishlist wishlist = Wishlist.builder()
                .user(user)
                .product(product)
                .build();

        Wishlist savedWishlist = wishlistRepository.save(wishlist);

        return mapToResponse(savedWishlist);
    }

    @Override
    public void removeProductFromWishlist(Long productId) {

        User user = getAuthenticatedUser();

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id : " + productId
                        ));

        Wishlist wishlist = wishlistRepository
                .findByUserAndProduct(user, product)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found in wishlist."
                        ));

        wishlistRepository.delete(wishlist);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WishlistResponse> getMyWishlist() {

        User user = getAuthenticatedUser();

        return wishlistRepository
                .findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    /**
     * Returns currently authenticated user.
     */
    private User getAuthenticatedUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Authenticated user not found."
                        ));
    }

    /**
     * Maps Wishlist entity to WishlistResponse DTO.
     */
    private WishlistResponse mapToResponse(Wishlist wishlist) {

        Product product = wishlist.getProduct();

        return WishlistResponse.builder()
                .wishlistId(wishlist.getId())
                .productId(product.getId())
                .productName(product.getName())
                .productDescription(product.getDescription())
                .price(product.getPrice())
                .sku(product.getSku())
                .imageUrl(product.getImageUrl())
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getName())
                .stockQuantity(product.getStockQuantity())
                .addedAt(wishlist.getCreatedAt())
                .build();
    }

}