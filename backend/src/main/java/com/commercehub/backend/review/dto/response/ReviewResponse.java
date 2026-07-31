package com.commercehub.backend.review.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReviewResponse {

    /**
     * Review ID.
     */
    private Long id;

    /**
     * Product information.
     */
    private Long productId;
    private String productName;

    /**
     * Reviewer information.
     */
    private Long userId;
    private String reviewerName;

    /**
     * Rating (1-5).
     */
    private Integer rating;

    /**
     * Review title.
     */
    private String title;

    /**
     * Review comment.
     */
    private String comment;

    /**
     * Indicates whether the review is from
     * a verified purchaser.
     */
    private Boolean verifiedPurchase;

    /**
     * Merchant/Admin reply.
     */
    private String merchantReply;

    /**
     * Reply timestamp.
     */
    private LocalDateTime merchantReplyAt;

    /**
     * Audit information.
     */
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}