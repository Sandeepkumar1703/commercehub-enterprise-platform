package com.commercehub.backend.translation.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateTranslationValueRequest {

    @NotBlank(message = "Translation value is required.")
    private String value;
}