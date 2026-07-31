package com.commercehub.backend.review.repository;

import com.commercehub.backend.product.entity.Product;
import com.commercehub.backend.review.entity.Review;
import com.commercehub.backend.user.entity.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface ReviewRepository extends JpaRepository<Review, Long> {


    /**
     * Get all active reviews for a product.
     */
    Page<Review> findByProductAndIsDeletedFalse(
            Product product,
            Pageable pageable
    );


    /**
     * Get all active reviews by a user.
     */
    List<Review> findByUserAndIsDeletedFalse(
            User user
    );


    /**
     * Check if user already reviewed product.
     */
    boolean existsByProductAndUserAndIsDeletedFalse(
            Product product,
            User user
    );


    /**
     * Find user's active review for a product.
     */
    Optional<Review> findByProductAndUserAndIsDeletedFalse(
            Product product,
            User user
    );


    /**
     * Find active review by id.
     */
    Optional<Review> findByIdAndIsDeletedFalse(
            Long id
    );


    /**
     * Get all active reviews for product.
     */
    List<Review> findAllByProductAndIsDeletedFalse(
            Product product
    );


    /**
     * Average rating.
     */
    @Query("""
            SELECT COALESCE(AVG(r.rating),0)
            FROM Review r
            WHERE r.product.id = :productId
            AND r.isDeleted = false
            """)
    Double getAverageRating(
            @Param("productId") Long productId
    );


    /**
     * Total review count.
     */
    @Query("""
            SELECT COUNT(r)
            FROM Review r
            WHERE r.product.id = :productId
            AND r.isDeleted = false
            """)
    Long getRatingCount(
            @Param("productId") Long productId
    );


    /**
     * Rating distribution.
     */
    @Query("""
            SELECT COUNT(r)
            FROM Review r
            WHERE r.product.id = :productId
            AND r.rating = :rating
            AND r.isDeleted = false
            """)
    Long getRatingCountByStars(
            @Param("productId") Long productId,
            @Param("rating") Integer rating
    );

}