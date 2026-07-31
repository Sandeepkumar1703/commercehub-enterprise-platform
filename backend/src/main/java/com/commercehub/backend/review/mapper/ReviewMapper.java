package com.commercehub.backend.review.mapper;

import com.commercehub.backend.review.dto.request.CreateReviewRequest;
import com.commercehub.backend.review.dto.request.UpdateReviewRequest;
import com.commercehub.backend.review.dto.response.ReviewResponse;
import com.commercehub.backend.review.entity.Review;
import org.springframework.stereotype.Component;

@Component
public class ReviewMapper {

    /**
     * Convert CreateReviewRequest to Review entity.
     *
     * Product and User are assigned in the service layer.
     */
    public Review toEntity(CreateReviewRequest request) {

        Review review = new Review();

        review.setRating(request.getRating());
        review.setTitle(request.getTitle());
        review.setComment(request.getComment());

        return review;
    }

    /**
     * Update an existing Review entity.
     */
    public void updateEntity(
            Review review,
            UpdateReviewRequest request
    ) {

        review.setRating(request.getRating());
        review.setTitle(request.getTitle());
        review.setComment(request.getComment());
    }

    /**
     * Convert Review entity to ReviewResponse.
     */
    public ReviewResponse toResponse(Review review) {

        ReviewResponse response = new ReviewResponse();

        response.setId(review.getId());

        // Product
        response.setProductId(review.getProduct().getId());
        response.setProductName(review.getProduct().getName());

        // Reviewer
        response.setUserId(review.getUser().getId());
        response.setReviewerName(
                review.getUser().getFirstName()
                        + " "
                        + review.getUser().getLastName()
        );

        // Review
        response.setRating(review.getRating());
        response.setTitle(review.getTitle());
        response.setComment(review.getComment());

        response.setVerifiedPurchase(review.getVerifiedPurchase());

        // Merchant Reply
        response.setMerchantReply(review.getMerchantReply());
        response.setMerchantReplyAt(review.getMerchantReplyAt());

        // Audit
        response.setCreatedAt(review.getCreatedAt());
        response.setUpdatedAt(review.getUpdatedAt());

        return response;
    }

}