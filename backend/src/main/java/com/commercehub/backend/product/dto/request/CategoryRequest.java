package com.commercehub.backend.product.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Request DTO for creating a new product category.
 *
 * This DTO is used by the Category Management API to receive
 * category information from the client.
 *
 * Example Request:
 *
 * {
 *   "name": "Electronics",
 *   "description": "Electronic gadgets and accessories"
 * }
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest {

    /**
     * Category name.
     *
     * <p>Validation Rules:</p>
     * <ul>
     *     <li>Must not be blank.</li>
     *     <li>Maximum length: 100 characters.</li>
     * </ul>
     */
    @NotBlank(message = "Category name is required.")
    @Size(
            max = 100,
            message = "Category name must not exceed 100 characters."
    )
    private String name;

    /**
     * Optional category description.
     *
     * <p>Validation Rules:</p>
     * <ul>
     *     <li>Maximum length: 500 characters.</li>
     * </ul>
     */
    @Size(
            max = 500,
            message = "Description must not exceed 500 characters."
    )
    private String description;

}