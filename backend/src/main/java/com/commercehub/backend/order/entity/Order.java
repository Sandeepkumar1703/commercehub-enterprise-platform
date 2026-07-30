package com.commercehub.backend.order.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import com.commercehub.backend.payment.enums.PaymentStatus;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "user_id", nullable = false)
    private Long userId;


    @Column(name = "order_number", nullable = false, unique = true)
    private String orderNumber;


    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;


    @Column(name = "tax_amount")
    private BigDecimal taxAmount;


    @Column(name = "discount_amount")
    private BigDecimal discountAmount;


    @Column(name = "shipping_cost")
    private BigDecimal shippingCost;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;


    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    private PaymentStatus paymentStatus;


    @Column(name = "shipping_address_id")
    private Long shippingAddressId;


    @Column(name = "coupon_id")
    private Long couponId;


    private String notes;


    @Column(name = "created_at")
    private LocalDateTime createdAt;


    @Column(name = "updated_at")
    private LocalDateTime updatedAt;


    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @Builder.Default
    private List<OrderItem> items = new ArrayList<>();


    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }


    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}