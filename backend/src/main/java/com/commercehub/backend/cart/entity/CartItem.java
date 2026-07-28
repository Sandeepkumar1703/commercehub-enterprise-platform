package com.commercehub.backend.cart.entity;

import com.commercehub.backend.product.entity.Product;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "cart_items",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uq_cart_product",
            columnNames = {"cart_id", "product_id"}
        )
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "cart_id",
        nullable = false
    )
    private Cart cart;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "product_id",
        nullable = false
    )
    private Product product;


    @Column(nullable = false)
    private Long quantity;


    @Column(
        name = "unit_price",
        nullable = false,
        precision = 10,
        scale = 2
    )
    private BigDecimal unitPrice;


    @Column(
        name = "created_at",
        nullable = false
    )
    private LocalDateTime createdAt;


    @Column(
        name = "updated_at",
        nullable = false
    )
    private LocalDateTime updatedAt;


    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }


    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}