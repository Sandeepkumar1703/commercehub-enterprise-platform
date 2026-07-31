package com.commercehub.backend.review.service.impl;

import com.commercehub.backend.common.exception.BadRequestException;
import com.commercehub.backend.common.exception.ForbiddenException;
import com.commercehub.backend.common.exception.ResourceNotFoundException;
import com.commercehub.backend.order.entity.OrderStatus;
import com.commercehub.backend.order.repository.OrderItemRepository;
import com.commercehub.backend.product.entity.Product;
import com.commercehub.backend.product.repository.ProductRepository;
import com.commercehub.backend.review.dto.request.CreateReviewRequest;
import com.commercehub.backend.review.dto.request.MerchantReplyRequest;
import com.commercehub.backend.review.dto.request.UpdateReviewRequest;
import com.commercehub.backend.review.dto.response.ProductRatingSummaryResponse;
import com.commercehub.backend.review.dto.response.RatingDistributionResponse;
import com.commercehub.backend.review.dto.response.ReviewResponse;
import com.commercehub.backend.review.entity.Review;
import com.commercehub.backend.review.mapper.ReviewMapper;
import com.commercehub.backend.review.repository.ReviewRepository;
import com.commercehub.backend.review.service.ReviewService;
import com.commercehub.backend.user.entity.User;
import com.commercehub.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    private final ProductRepository productRepository;

    private final UserRepository userRepository;

    private final OrderItemRepository orderItemRepository;

    private final ReviewMapper reviewMapper;

    /**
     * Returns the currently authenticated user.
     */
    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ForbiddenException("User is not authenticated.");
        }

        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Authenticated user not found."));
    }

    @Override
public ReviewResponse createReview(CreateReviewRequest request) {

    User currentUser = getCurrentUser();

    Product product = productRepository.findById(request.getProductId())
            .orElseThrow(() ->
                    new ResourceNotFoundException("Product not found."));

    if (reviewRepository.existsByProductAndUserAndIsDeletedFalse(product, currentUser)) {
        throw new BadRequestException(
                "You have already reviewed this product."
        );
    }

    boolean verifiedPurchase = orderItemRepository.hasVerifiedPurchase(
            currentUser.getId(),
            product.getId(),
            OrderStatus.DELIVERED
    );

    Review review = reviewMapper.toEntity(request);

    review.setProduct(product);
    review.setUser(currentUser);
    review.setVerifiedPurchase(verifiedPurchase);

    Review savedReview = reviewRepository.save(review);

    return reviewMapper.toResponse(savedReview);
}

    @Override
public ReviewResponse updateReview(
        Long reviewId,
        UpdateReviewRequest request) {

    User currentUser = getCurrentUser();

    Review review = reviewRepository.findByIdAndIsDeletedFalse(reviewId)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Review not found."));

    // Only the review owner can update it.
    if (!review.getUser().getId().equals(currentUser.getId())) {
        throw new ForbiddenException(
                "You are not authorized to update this review."
        );
    }

    reviewMapper.updateEntity(review, request);

    Review updatedReview = reviewRepository.save(review);

    return reviewMapper.toResponse(updatedReview);
}

    @Override
public void deleteReview(Long reviewId) {

    User currentUser = getCurrentUser();

    Review review = reviewRepository.findByIdAndIsDeletedFalse(reviewId)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Review not found."));

    // Only the review owner can delete it.
    if (!review.getUser().getId().equals(currentUser.getId())) {
        throw new ForbiddenException(
                "You are not authorized to delete this review."
        );
    }

    review.setIsDeleted(true);

    reviewRepository.save(review);
}

    @Override
public ReviewResponse replyToReview(
        Long reviewId,
        MerchantReplyRequest request) {

    User currentUser = getCurrentUser();

    boolean isAdmin = currentUser.getRoles()
            .stream()
            .anyMatch(role -> "ROLE_ADMIN".equals(role.getName()));

    boolean isMerchant = currentUser.getRoles()
            .stream()
            .anyMatch(role -> "ROLE_MERCHANT".equals(role.getName()));

    if (!isAdmin && !isMerchant) {
        throw new ForbiddenException(
                "Only administrators or merchants can reply to reviews."
        );
    }

    Review review = reviewRepository.findByIdAndIsDeletedFalse(reviewId)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Review not found."));

    review.setMerchantReply(request.getReply());
    review.setMerchantReplyAt(java.time.LocalDateTime.now());
    review.setMerchantReplyBy(currentUser);

    Review updatedReview = reviewRepository.save(review);

    return reviewMapper.toResponse(updatedReview);
}

    @Override
@Transactional(readOnly = true)
public ProductRatingSummaryResponse getProductReviews(
        Long productId,
        Pageable pageable) {

    Product product = productRepository.findById(productId)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Product not found."));

    Double averageRating = reviewRepository.getAverageRating(productId);

    Long ratingCount = reviewRepository.getRatingCount(productId);

    RatingDistributionResponse distribution =
            new RatingDistributionResponse();

    distribution.setFiveStar(
            reviewRepository.getRatingCountByStars(productId, 5));

    distribution.setFourStar(
            reviewRepository.getRatingCountByStars(productId, 4));

    distribution.setThreeStar(
            reviewRepository.getRatingCountByStars(productId, 3));

    distribution.setTwoStar(
            reviewRepository.getRatingCountByStars(productId, 2));

    distribution.setOneStar(
            reviewRepository.getRatingCountByStars(productId, 1));

    List<ReviewResponse> reviews = reviewRepository
            .findByProductAndIsDeletedFalse(product, pageable)
            .stream()
            .map(reviewMapper::toResponse)
            .toList();

    ProductRatingSummaryResponse response =
            new ProductRatingSummaryResponse();

    response.setProductId(productId);
    response.setAverageRating(averageRating);
    response.setRatingCount(ratingCount);
    response.setRatingDistribution(distribution);
    response.setReviews(reviews);

    return response;
}

}