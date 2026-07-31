package com.commercehub.backend.shipping.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateShippingStatusRequest {

    private String trackingNumber;

    private String trackingUrl;

}