package com.commercehub.backend.category.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Response DTO for Category.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {

    private Long id;

    private String name;

    private String description;

    private String imageUrl;

    private Boolean active;

    private Long totalProducts;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}