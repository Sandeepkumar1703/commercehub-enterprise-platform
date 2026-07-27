package com.commercehub.backend.category.entity;

import com.commercehub.backend.common.entity.BaseEntity;
import com.commercehub.backend.product.entity.Product;
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
     */
    @Column(nullable = false, unique = true, length = 100)
    private String name;

    /**
     * Category description.
     */
    @Column(length = 500)
    private String description;

    /**
     * Category image URL.
     */
    @Column(name = "image_url", length = 500)
    private String imageUrl;

    /**
     * Whether the category is active.
     */
    @Builder.Default
    @Column(name = "is_active", nullable = false)
    private Boolean active = true;

    /**
     * Products belonging to this category.
     */
    @Builder.Default
    @OneToMany(
            mappedBy = "category",
            fetch = FetchType.LAZY
    )
    private List<Product> products = new ArrayList<>();
}