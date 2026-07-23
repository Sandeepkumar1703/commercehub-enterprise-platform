package com.commercehub.backend.product.entity;

import com.commercehub.backend.common.entity.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * Category entity.
 *
 * Represents a product category in the system.
 *
 * Example:
 * Electronics
 * Fashion
 * Grocery
 * Furniture
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "categories")
public class Category extends BaseEntity {

    /**
     * Category name.
     *
     * Must be unique.
     */
    @Column(nullable = false, unique = true, length = 100)
    private String name;

    /**
     * Optional category description.
     */
    @Column(length = 500)
    private String description;

    /**
     * Products belonging to this category.
     *
     * Bidirectional relationship.
     */
    @Builder.Default
    @OneToMany(
            mappedBy = "category",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Product> products = new ArrayList<>();
}