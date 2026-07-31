package com.commercehub.backend.review.controller;

import com.commercehub.backend.common.response.ApiResponse;
import com.commercehub.backend.review.dto.request.CreateReviewRequest;
import com.commercehub.backend.review.dto.request.MerchantReplyRequest;
import com.commercehub.backend.review.dto.request.UpdateReviewRequest;
import com.commercehub.backend.review.dto.response.ProductRatingSummaryResponse;
import com.commercehub.backend.review.dto.response.ReviewResponse;
import com.commercehub.backend.review.service.ReviewService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {


    private final ReviewService reviewService;


    /**
     * Get product reviews.
     *
     * GET /api/reviews/product/{productId}
     */
    @GetMapping("/product/{productId}")
    public ResponseEntity<ApiResponse<ProductRatingSummaryResponse>> getProductReviews(
            @PathVariable Long productId,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size
    ) {

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by("createdAt").descending()
                );


        ProductRatingSummaryResponse response =
                reviewService.getProductReviews(
                        productId,
                        pageable
                );


        return ResponseEntity.ok(
                ApiResponse.success(
                        "Reviews fetched successfully",
                        response
                )
        );
    }



    /**
     * Create review.
     *
     * POST /api/reviews
     */
    @PostMapping
    public ResponseEntity<ApiResponse<ReviewResponse>> createReview(
            @Valid
            @RequestBody CreateReviewRequest request
    ) {


        ReviewResponse response =
                reviewService.createReview(request);


        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ApiResponse.success(
                                "Review created successfully",
                                response
                        )
                );
    }



    /**
     * Update review.
     *
     * PUT /api/reviews/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ReviewResponse>> updateReview(
            @PathVariable Long id,

            @Valid
            @RequestBody UpdateReviewRequest request
    ) {


        ReviewResponse response =
                reviewService.updateReview(
                        id,
                        request
                );


        return ResponseEntity.ok(
                ApiResponse.success(
                        "Review updated successfully",
                        response
                )
        );
    }



    /**
     * Delete review.
     *
     * DELETE /api/reviews/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteReview(
            @PathVariable Long id
    ) {


        reviewService.deleteReview(id);


        return ResponseEntity.ok(
                ApiResponse.success(
                        "Review deleted successfully."
                )
        );
    }



    /**
     * Merchant/Admin reply.
     *
     * POST /api/reviews/{id}/respond
     */
    @PostMapping("/{id}/respond")
    public ResponseEntity<ApiResponse<ReviewResponse>> replyToReview(
            @PathVariable Long id,

            @Valid
            @RequestBody MerchantReplyRequest request
    ) {


        ReviewResponse response =
                reviewService.replyToReview(
                        id,
                        request
                );


        return ResponseEntity.ok(
                ApiResponse.success(
                        "Reply added successfully",
                        response
                )
        );
    }

}