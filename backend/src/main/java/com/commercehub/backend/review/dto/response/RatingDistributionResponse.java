package com.commercehub.backend.review.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RatingDistributionResponse {

    /**
     * Number of 5-star reviews.
     */
    private Long fiveStar;

    /**
     * Number of 4-star reviews.
     */
    private Long fourStar;

    /**
     * Number of 3-star reviews.
     */
    private Long threeStar;

    /**
     * Number of 2-star reviews.
     */
    private Long twoStar;

    /**
     * Number of 1-star reviews.
     */
    private Long oneStar;
}