package com.commercehub.backend.product.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Response DTO for Category.
 *
 * This DTO is returned to the client when category
 * information is requested through the REST APIs.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {

    /**
     * Unique identifier of the category.
     */
    private Long id;

    /**
     * Category name.
     */
    private String name;

    /**
     * Category description.
     */
    private String description;

    /**
     * Total number of products belonging to this category.
     *
     * This field is optional and can be populated
     * whenever required.
     */
    private Long totalProducts;

    /**
     * Category creation timestamp.
     */
    private LocalDateTime createdAt;

    /**
     * Category last updated timestamp.
     */
    private LocalDateTime updatedAt;

}