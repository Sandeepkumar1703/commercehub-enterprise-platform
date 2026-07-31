package com.commercehub.backend.review.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateReviewRequest {

    /**
     * Product to review.
     */
    @NotNull(message = "Product ID is required.")
    private Long productId;

    /**
     * Rating between 1 and 5.
     */
    @NotNull(message = "Rating is required.")
    @Min(value = 1, message = "Rating must be at least 1.")
    @Max(value = 5, message = "Rating cannot be greater than 5.")
    private Integer rating;

    /**
     * Review title.
     */
    @Size(max = 150, message = "Title cannot exceed 150 characters.")
    private String title;

    /**
     * Review comment.
     */
    @Size(max = 2000, message = "Comment cannot exceed 2000 characters.")
    private String comment;
}