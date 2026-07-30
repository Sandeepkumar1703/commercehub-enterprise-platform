package com.commercehub.backend.translation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateTranslationValueRequest {

    @NotNull(message = "Translation key id is required.")
    private Long translationKeyId;

    @NotNull(message = "Language id is required.")
    private Long languageId;

    @NotBlank(message = "Translation value is required.")
    private String value;
}