package com.commercehub.backend.wishlist.repository;

import com.commercehub.backend.product.entity.Product;
import com.commercehub.backend.user.entity.User;
import com.commercehub.backend.wishlist.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    /**
     * Returns all wishlist items for a user.
     */
    List<Wishlist> findByUser(User user);

    /**
     * Returns a specific wishlist entry for a user and product.
     */
    Optional<Wishlist> findByUserAndProduct(User user, Product product);

    /**
     * Checks whether a product already exists
     * in the user's wishlist.
     */
    boolean existsByUserAndProduct(User user, Product product);

    /**
     * Deletes a wishlist entry for a user and product.
     */
    void deleteByUserAndProduct(User user, Product product);

}