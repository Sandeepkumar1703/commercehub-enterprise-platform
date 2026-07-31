package com.commercehub.backend.review.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductRatingSummaryResponse {

    /**
     * Product ID.
     */
    private Long productId;

    /**
     * Average rating.
     */
    private Double averageRating;

    /**
     * Total number of reviews.
     */
    private Long ratingCount;

    /**
     * Rating distribution.
     */
    private RatingDistributionResponse ratingDistribution;

    /**
     * Reviews for the product.
     */
    private List<ReviewResponse> reviews;
}