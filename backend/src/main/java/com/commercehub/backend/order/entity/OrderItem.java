package com.commercehub.backend.order.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;


@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;


    @Column(name = "product_id", nullable = false)
    private Long productId;


    @Column(nullable = false)
    private Long  quantity;


    @Column(nullable = false)
    private BigDecimal price;


    private BigDecimal subtotal;


    private BigDecimal discount;


    private BigDecimal tax;


    private BigDecimal total;


    @Column(name = "created_at")
    private LocalDateTime createdAt;


    @PrePersist
    public void prePersist(){
        createdAt = LocalDateTime.now();
    }
}