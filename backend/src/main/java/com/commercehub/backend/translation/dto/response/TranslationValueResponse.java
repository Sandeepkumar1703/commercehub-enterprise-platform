package com.commercehub.backend.translation.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TranslationValueResponse {

    private Long id;

    private Long translationKeyId;

    private String keyName;

    private Long languageId;

    private String languageCode;

    private String languageName;

    private String value;
}