package com.commercehub.backend.cart.service;

import com.commercehub.backend.cart.dto.request.UpdateCartRequest;
import com.commercehub.backend.cart.dto.response.CartResponse;
import com.commercehub.backend.cart.entity.Cart;
import com.commercehub.backend.cart.entity.CartItem;
import com.commercehub.backend.cart.mapper.CartMapper;
import com.commercehub.backend.cart.repository.CartItemRepository;
import com.commercehub.backend.cart.repository.CartRepository;
import com.commercehub.backend.product.entity.Product;
import com.commercehub.backend.product.repository.ProductRepository;
import com.commercehub.backend.user.entity.User;
import com.commercehub.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {


    private final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;

    private final ProductRepository productRepository;

    private final UserRepository userRepository;

    private final CartMapper cartMapper;


    @Override
    @Transactional(readOnly = true)
    public CartResponse getCart() {

        User user = getCurrentUser();

        Cart cart = getOrCreateCart(user);

        return cartMapper.toCartResponse(cart);
    }


    @Override
    public CartResponse addProductToCart(Long productId) {

        User user = getCurrentUser();

        Cart cart = getOrCreateCart(user);


        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));


        CartItem item =
                cartItemRepository
                        .findByCartIdAndProductId(
                                cart.getId(),
                                productId
                        )
                        .orElse(null);


        if (item != null) {

            item.setQuantity(
                    item.getQuantity() + 1
            );

        } else {

            item = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(1L)
                    .unitPrice(product.getPrice())
                    .build();

            cart.getItems().add(item);
        }


        cartRepository.save(cart);

        return cartMapper.toCartResponse(cart);
    }


    @Override
    public CartResponse updateCartItem(
            Long cartItemId,
            UpdateCartRequest request
    ) {


        CartItem item =
                cartItemRepository.findById(cartItemId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Cart item not found"
                                ));


        item.setQuantity(
                request.getQuantity()
        );


        cartItemRepository.save(item);


        return cartMapper.toCartResponse(
                item.getCart()
        );
    }


    @Override
    public void removeCartItem(Long cartItemId) {

        CartItem item =
                cartItemRepository.findById(cartItemId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Cart item not found"
                                ));


        cartItemRepository.delete(item);
    }


    @Override
    public void clearCart() {

        User user = getCurrentUser();

        Cart cart = getOrCreateCart(user);

        cartItemRepository.deleteAllByCartId(
                cart.getId()
        );
    }



    private User getCurrentUser() {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();


        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        ));
    }



    private Cart getOrCreateCart(User user) {

        return cartRepository.findByUserId(user.getId())
                .orElseGet(() -> {

                    Cart cart = Cart.builder()
                            .user(user)
                            .build();

                    return cartRepository.save(cart);
                });
    }

}