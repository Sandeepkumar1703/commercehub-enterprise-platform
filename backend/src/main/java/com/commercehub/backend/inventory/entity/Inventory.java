package com.commercehub.backend.inventory.entity;

import com.commercehub.backend.product.entity.Product;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "inventory",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "inventory_product_id_key",
                        columnNames = "product_id"
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "product_id",
            nullable = false
    )
    private Product product;


    @Column(nullable = false)
    private Long quantity = 0L;


    @Column(nullable = false)
    private Long reserved = 0L;


    @Column(name = "reorder_level")
    private Long reorderLevel = 10L;


    @Column(name = "updated_at")
    private LocalDateTime updatedAt;


    @PrePersist
    @PreUpdate
    public void updateTimestamp() {
        this.updatedAt = LocalDateTime.now();
    }
}