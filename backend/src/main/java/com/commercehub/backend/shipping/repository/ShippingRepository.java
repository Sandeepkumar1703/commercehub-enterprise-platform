package com.commercehub.backend.shipping.repository;

import com.commercehub.backend.order.entity.Order;
import com.commercehub.backend.shipping.entity.Shipping;
import com.commercehub.backend.shipping.enums.ShippingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ShippingRepository extends JpaRepository<Shipping, Long> {

    Optional<Shipping> findByOrder(Order order);

    Optional<Shipping> findByTrackingNumber(String trackingNumber);

    List<Shipping> findByStatus(ShippingStatus status);

    boolean existsByOrder(Order order);

    boolean existsByTrackingNumber(String trackingNumber);

    boolean existsByTrackingNumberAndIdNot(
            String trackingNumber,
            Long id
    );
}