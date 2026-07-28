package com.commercehub.backend.inventory.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InventoryResponse {


    private Long productId;

    private String productName;

    private Long quantity;

    private Long reserved;

    private Long availableQuantity;

}