package com.commercehub.backend.wishlist.entity;

import com.commercehub.backend.product.entity.Product;
import com.commercehub.backend.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(
        name = "wishlist",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "idx_wishlist_user_product_unique",
                        columnNames = {
                                "user_id",
                                "product_id"
                        }
                )
        }
)
public class Wishlist {

    /**
     * Primary Key
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * User who owns this wishlist entry.
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    private User user;

    /**
     * Product added to wishlist.
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "product_id",
            nullable = false
    )
    private Product product;

    /**
     * Date and time when product was added.
     */
    @Column(
            name = "created_at",
            nullable = false,
            updatable = false
    )
    private LocalDateTime createdAt;

    /**
     * Automatically populate createdAt.
     */
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

}