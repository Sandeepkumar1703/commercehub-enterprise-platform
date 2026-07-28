package com.commercehub.backend.inventory.dto.request;

import jakarta.validation.constraints.Min;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateInventoryRequest {


    @Min(
        value = 0,
        message = "Quantity cannot be negative"
    )
    private Long quantity;

}