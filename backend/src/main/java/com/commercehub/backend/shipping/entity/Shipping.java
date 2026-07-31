package com.commercehub.backend.shipping.entity;

import com.commercehub.backend.order.entity.Order;
import com.commercehub.backend.shipping.enums.ShippingStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "shipping")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shipping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * One shipment per order.
     */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "order_id",
            nullable = false,
            unique = true
    )
    private Order order;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private ShippingStatus status = ShippingStatus.PENDING;

    @Column(length = 100)
    private String carrier;

    @Column(name = "tracking_number", unique = true, length = 255)
    private String trackingNumber;

    @Column(name = "tracking_url", length = 500)
    private String trackingUrl;

    /**
     * Expected delivery date & time.
     * Maps to PostgreSQL TIMESTAMP.
     */
    @Column(name = "estimated_delivery")
    private LocalDateTime estimatedDelivery;

    /**
     * Actual delivery date & time.
     * Maps to PostgreSQL TIMESTAMP.
     */
    @Column(name = "actual_delivery")
    private LocalDateTime actualDelivery;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;

        if (status == null) {
            status = ShippingStatus.PENDING;
        }
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}