package com.commercehub.backend.review.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MerchantReplyRequest {

    /**
     * Merchant/Admin response to the review.
     */
    @NotBlank(message = "Reply is required.")
    @Size(
            max = 2000,
            message = "Reply cannot exceed 2000 characters."
    )
    private String reply;
}