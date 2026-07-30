package com.commercehub.backend.translation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateTranslationKeyRequest {

    @NotBlank(message = "Translation key is required.")
    private String keyName;

    @NotBlank(message = "Translation value is required.")
    private String value;

    @NotNull(message = "Language ID is required.")
    private Long languageId;

}