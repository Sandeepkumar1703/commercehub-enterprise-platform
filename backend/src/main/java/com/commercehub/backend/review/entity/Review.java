package com.commercehub.backend.review.entity;

import com.commercehub.backend.common.entity.BaseEntity;
import com.commercehub.backend.product.entity.Product;
import com.commercehub.backend.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "reviews",
        indexes = {
                @Index(name = "idx_review_product", columnList = "product_id"),
                @Index(name = "idx_review_user", columnList = "user_id"),
                @Index(name = "idx_review_rating", columnList = "rating"),
                @Index(name = "idx_review_deleted", columnList = "is_deleted")
        }
)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Review extends BaseEntity {

    /**
     * Product being reviewed.
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    /**
     * Customer who submitted the review.
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * Rating (1–5).
     */
    @Column(nullable = false)
    private Integer rating;

    /**
     * Review title.
     */
    @Column(length = 150)
    private String title;

    /**
     * Review comment.
     */
    @Column(columnDefinition = "TEXT")
    private String comment;

    /**
     * Indicates whether the reviewer actually purchased
     * the product before reviewing.
     */
    @Column(name = "verified_purchase", nullable = false)
    @Builder.Default
    private Boolean verifiedPurchase = false;

    /**
     * Merchant/Admin response.
     */
    @Column(name = "merchant_reply", columnDefinition = "TEXT")
    private String merchantReply;

    /**
     * Reply timestamp.
     */
    @Column(name = "merchant_reply_at")
    private LocalDateTime merchantReplyAt;

    /**
     * Merchant/Admin who replied.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "merchant_reply_by")
    private User merchantReplyBy;

    /**
     * Soft delete flag.
     */
    @Column(name = "is_deleted", nullable = false)
    @Builder.Default
    private Boolean isDeleted = false;
}