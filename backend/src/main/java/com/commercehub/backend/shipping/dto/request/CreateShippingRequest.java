package com.commercehub.backend.shipping.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateShippingRequest {

    @NotNull(message = "Order ID is required.")
    private Long orderId;

    @NotBlank(message = "Carrier is required.")
    private String carrier;

    private LocalDateTime  estimatedDelivery;

}