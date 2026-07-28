package com.commercehub.backend.order.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequest {

    private Long shippingAddressId;

    private Long couponId;

    private String notes;
}