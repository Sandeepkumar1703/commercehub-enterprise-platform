package com.commercehub.backend.payment.repository;

import com.commercehub.backend.order.entity.Order;
import com.commercehub.backend.payment.entity.Payment;
import com.commercehub.backend.payment.enums.PaymentMethod;
import com.commercehub.backend.payment.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    /**
     * Get all payment attempts for an order.
     */
    List<Payment> findByOrder(Order order);

    /**
     * Get latest payment attempt for an order.
     */
    Optional<Payment> findTopByOrderOrderByCreatedAtDesc(Order order);

    /**
     * Find payment by transaction ID.
     */
    Optional<Payment> findByTransactionId(String transactionId);

    /**
     * Find all payments by status.
     */
    List<Payment> findByStatus(PaymentStatus status);

    /**
     * Find all payments by payment method.
     */
    List<Payment> findByMethod(PaymentMethod method);

    /**
     * Find all payments by gateway.
     */
    List<Payment> findByGatewayName(String gatewayName);

    /**
     * Payments created between two dates.
     */
    List<Payment> findByCreatedAtBetween(
            LocalDateTime startDate,
            LocalDateTime endDate
    );

    /**
     * Payments for a specific order and status.
     */
    List<Payment> findByOrderAndStatus(
            Order order,
            PaymentStatus status
    );

    /**
     * Check whether a transaction ID already exists.
     */
    boolean existsByTransactionId(String transactionId);

    /**
     * Check whether a successful payment already exists for an order.
     */
    boolean existsByOrderAndStatus(
            Order order,
            PaymentStatus status
    );
}