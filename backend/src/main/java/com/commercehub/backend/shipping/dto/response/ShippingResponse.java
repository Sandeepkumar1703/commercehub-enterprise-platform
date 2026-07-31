package com.commercehub.backend.shipping.dto.response;

import com.commercehub.backend.shipping.enums.ShippingStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShippingResponse {

    private Long id;

    private Long orderId;

    private ShippingStatus status;

    private String carrier;

    private String trackingNumber;

    private String trackingUrl;

    private LocalDateTime estimatedDelivery;

    private LocalDateTime actualDelivery;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}