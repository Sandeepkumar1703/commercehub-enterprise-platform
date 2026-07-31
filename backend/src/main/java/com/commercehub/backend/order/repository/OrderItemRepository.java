package com.commercehub.backend.order.repository;

import com.commercehub.backend.order.entity.OrderItem;
import com.commercehub.backend.order.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    @Query("""
            SELECT COUNT(oi) > 0
            FROM OrderItem oi
            JOIN oi.order o
            WHERE o.userId = :userId
            AND oi.productId = :productId
            AND o.status = :status
            """)
    boolean hasVerifiedPurchase(
            @Param("userId") Long userId,
            @Param("productId") Long productId,
            @Param("status") OrderStatus status
    );
}