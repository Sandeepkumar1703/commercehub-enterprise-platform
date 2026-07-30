package com.commercehub.backend.translation.service;

import com.commercehub.backend.translation.dto.request.CreateTranslationKeyRequest;
import com.commercehub.backend.translation.dto.request.CreateTranslationValueRequest;
import com.commercehub.backend.translation.dto.request.UpdateTranslationKeyRequest;
import com.commercehub.backend.translation.dto.request.UpdateTranslationValueRequest;
import com.commercehub.backend.translation.dto.response.TranslationResponse;
import com.commercehub.backend.translation.dto.response.TranslationValueResponse;

import java.util.List;
import java.util.Map;

public interface TranslationService {

    TranslationResponse createTranslationKey(CreateTranslationKeyRequest request);

    TranslationResponse updateTranslationKey(
            Long id,
            UpdateTranslationKeyRequest request
    );

    void deleteTranslationKey(Long id);

    TranslationResponse getTranslationKeyById(Long id);

    List<TranslationResponse> getAllTranslationKeys();

    TranslationValueResponse createTranslationValue(
            CreateTranslationValueRequest request
    );

    TranslationValueResponse updateTranslationValue(
            Long id,
            UpdateTranslationValueRequest request
    );

    void deleteTranslationValue(Long id);

    TranslationValueResponse getTranslationValueById(Long id);

    List<TranslationValueResponse> getAllTranslationValues();

    List<TranslationValueResponse> getTranslationsByLanguage(
            String languageCode
    );

    Map<String, String> getTranslationMap(
            String languageCode
    );
}