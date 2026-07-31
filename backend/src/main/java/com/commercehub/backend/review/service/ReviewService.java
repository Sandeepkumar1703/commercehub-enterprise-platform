package com.commercehub.backend.review.service;

import com.commercehub.backend.review.dto.request.CreateReviewRequest;
import com.commercehub.backend.review.dto.request.MerchantReplyRequest;
import com.commercehub.backend.review.dto.request.UpdateReviewRequest;
import com.commercehub.backend.review.dto.response.ProductRatingSummaryResponse;
import com.commercehub.backend.review.dto.response.ReviewResponse;
import org.springframework.data.domain.Pageable;

public interface ReviewService {

    /**
     * Create a new review.
     *
     * @param request Review request
     * @return Created review
     */
    ReviewResponse createReview(CreateReviewRequest request);

    /**
     * Update an existing review.
     *
     * @param reviewId Review ID
     * @param request Updated review data
     * @return Updated review
     */
    ReviewResponse updateReview(
            Long reviewId,
            UpdateReviewRequest request
    );

    /**
     * Soft delete a review.
     *
     * @param reviewId Review ID
     */
    void deleteReview(Long reviewId);

    /**
     * Merchant/Admin reply to a review.
     *
     * @param reviewId Review ID
     * @param request Reply request
     * @return Updated review
     */
    ReviewResponse replyToReview(
            Long reviewId,
            MerchantReplyRequest request
    );

    /**
     * Get rating summary and reviews for a product.
     *
     * @param productId Product ID
     * @param pageable Pagination information
     * @return Product rating summary
     */
    ProductRatingSummaryResponse getProductReviews(
            Long productId,
            Pageable pageable
    );
}