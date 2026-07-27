package com.commercehub.backend.category.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Request DTO for Category APIs.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest {

    /**
     * Category name.
     */
    @NotBlank(message = "Category name is required.")
    @Size(max = 100, message = "Category name must not exceed 100 characters.")
    private String name;

    /**
     * Category description.
     */
    @Size(max = 500, message = "Description must not exceed 500 characters.")
    private String description;

    /**
     * Category image URL.
     */
    @Size(max = 500, message = "Image URL must not exceed 500 characters.")
    private String imageUrl;

    /**
     * Category active status.
     *
     * Optional.
     * Defaults to true if omitted.
     */
    @Builder.Default
    private Boolean active = true;
}