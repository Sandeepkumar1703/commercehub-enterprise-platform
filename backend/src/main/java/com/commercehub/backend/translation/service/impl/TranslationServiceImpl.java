package com.commercehub.backend.translation.service.impl;

import com.commercehub.backend.common.exception.DuplicateResourceException;
import com.commercehub.backend.common.exception.ResourceNotFoundException;
import com.commercehub.backend.language.entity.Language;
import com.commercehub.backend.language.repository.LanguageRepository;
import com.commercehub.backend.translation.dto.request.CreateTranslationKeyRequest;
import com.commercehub.backend.translation.dto.request.CreateTranslationValueRequest;
import com.commercehub.backend.translation.dto.request.UpdateTranslationKeyRequest;
import com.commercehub.backend.translation.dto.request.UpdateTranslationValueRequest;
import com.commercehub.backend.translation.dto.response.TranslationResponse;
import com.commercehub.backend.translation.dto.response.TranslationValueResponse;
import com.commercehub.backend.translation.entity.TranslationKey;
import com.commercehub.backend.translation.entity.TranslationValue;
import com.commercehub.backend.translation.mapper.TranslationMapper;
import com.commercehub.backend.translation.repository.TranslationKeyRepository;
import com.commercehub.backend.translation.repository.TranslationValueRepository;
import com.commercehub.backend.translation.service.TranslationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.LinkedHashMap;

@Service
@RequiredArgsConstructor
@Transactional
public class TranslationServiceImpl implements TranslationService {

    private final TranslationKeyRepository translationKeyRepository;

    private final TranslationValueRepository translationValueRepository;

    private final LanguageRepository languageRepository;

    private final TranslationMapper translationMapper;

    /**
     * Create Translation Key
     */
    @Override
    public TranslationResponse createTranslationKey(
            CreateTranslationKeyRequest request
    ) {

        if (translationKeyRepository.existsByKeyName(request.getKeyName())) {
            throw new DuplicateResourceException(
                    "Translation key already exists."
            );
        }

        Language language = languageRepository.findById(request.getLanguageId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Language not found."
                        ));

        TranslationKey translationKey = TranslationKey.builder()
                .keyName(request.getKeyName())
                .build();

        translationKeyRepository.save(translationKey);

        TranslationValue translationValue = TranslationValue.builder()
                .translationKey(translationKey)
                .language(language)
                .value(request.getValue())
                .build();

        translationValueRepository.save(translationValue);

        return TranslationResponse.builder()
                .id(translationKey.getId())
                .keyName(translationKey.getKeyName())
                .languageId(language.getId())
                .languageCode(language.getCode())
                .languageName(language.getName())
                .value(request.getValue())
                .build();
    }

    /**
     * Update Translation Key
     */
    @Override
    public TranslationResponse updateTranslationKey(
            Long id,
            UpdateTranslationKeyRequest request
    ) {

        TranslationKey translationKey = translationKeyRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Translation key not found."
                        ));

        TranslationValue translationValue =
                translationValueRepository.findByTranslationKey(translationKey)
                        .stream()
                        .findFirst()
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Translation value not found."
                                ));

        translationValue.setValue(request.getValue());

        translationValueRepository.save(translationValue);

        return TranslationResponse.builder()
                .id(translationKey.getId())
                .keyName(translationKey.getKeyName())
                .languageId(translationValue.getLanguage().getId())
                .languageCode(translationValue.getLanguage().getCode())
                .languageName(translationValue.getLanguage().getName())
                .value(translationValue.getValue())
                .build();
    }

    /**
     * Delete Translation Key
     */
    @Override
    public void deleteTranslationKey(Long id) {

        TranslationKey translationKey = translationKeyRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Translation key not found."
                        ));

        translationKeyRepository.delete(translationKey);
    }

    /**
     * Get Translation Key By Id
     */
    @Override
    @Transactional(readOnly = true)
    public TranslationResponse getTranslationKeyById(Long id) {

        TranslationKey translationKey = translationKeyRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Translation key not found."
                        ));

        TranslationValue translationValue =
                translationValueRepository.findByTranslationKey(translationKey)
                        .stream()
                        .findFirst()
                        .orElse(null);

        return TranslationResponse.builder()
                .id(translationKey.getId())
                .keyName(translationKey.getKeyName())
                .languageId(
                        translationValue != null
                                ? translationValue.getLanguage().getId()
                                : null
                )
                .languageCode(
                        translationValue != null
                                ? translationValue.getLanguage().getCode()
                                : null
                )
                .languageName(
                        translationValue != null
                                ? translationValue.getLanguage().getName()
                                : null
                )
                .value(
                        translationValue != null
                                ? translationValue.getValue()
                                : null
                )
                .build();
    }

    /**
     * Get All Translation Keys
     */
    @Override
    @Transactional(readOnly = true)
    public List<TranslationResponse> getAllTranslationKeys() {

        return translationKeyRepository.findAll()
                .stream()
                .map(key -> {

                    TranslationValue value =
                            translationValueRepository.findByTranslationKey(key)
                                    .stream()
                                    .findFirst()
                                    .orElse(null);

                    return TranslationResponse.builder()
                            .id(key.getId())
                            .keyName(key.getKeyName())
                            .languageId(value != null ? value.getLanguage().getId() : null)
                            .languageCode(value != null ? value.getLanguage().getCode() : null)
                            .languageName(value != null ? value.getLanguage().getName() : null)
                            .value(value != null ? value.getValue() : null)
                            .build();
                })
                .toList();
    }


        /**
     * Create Translation Value
     */
    @Override
    public TranslationValueResponse createTranslationValue(
            CreateTranslationValueRequest request
    ) {

        TranslationKey translationKey = translationKeyRepository.findById(
                request.getTranslationKeyId()
        ).orElseThrow(() ->
                new ResourceNotFoundException("Translation key not found."));

        Language language = languageRepository.findById(
                request.getLanguageId()
        ).orElseThrow(() ->
                new ResourceNotFoundException("Language not found."));

        if (translationValueRepository.existsByTranslationKeyAndLanguage(
                translationKey,
                language
        )) {
            throw new DuplicateResourceException(
                    "Translation already exists for this language."
            );
        }

        TranslationValue translationValue = TranslationValue.builder()
                .translationKey(translationKey)
                .language(language)
                .value(request.getValue())
                .build();

        translationValueRepository.save(translationValue);

        return translationMapper.toTranslationValueResponse(
                translationValue
        );
    }

    /**
     * Update Translation Value
     */
    @Override
    public TranslationValueResponse updateTranslationValue(
            Long id,
            UpdateTranslationValueRequest request
    ) {

        TranslationValue translationValue =
                translationValueRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Translation value not found."
                                ));

        translationValue.setValue(request.getValue());

        translationValueRepository.save(translationValue);

        return translationMapper.toTranslationValueResponse(
                translationValue
        );
    }

    /**
     * Delete Translation Value
     */
    @Override
    public void deleteTranslationValue(Long id) {

        TranslationValue translationValue =
                translationValueRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Translation value not found."
                                ));

        translationValueRepository.delete(translationValue);
    }

    /**
     * Get Translation Value By Id
     */
    @Override
    @Transactional(readOnly = true)
    public TranslationValueResponse getTranslationValueById(Long id) {

        TranslationValue translationValue =
                translationValueRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Translation value not found."
                                ));

        return translationMapper.toTranslationValueResponse(
                translationValue
        );
    }

    /**
     * Get All Translation Values
     */
    @Override
    @Transactional(readOnly = true)
    public List<TranslationValueResponse> getAllTranslationValues() {

        return translationMapper.toTranslationValueResponseList(
                translationValueRepository.findAll()
        );
    }

    /**
     * Get Translation Values By Language
     */
    @Override
    @Transactional(readOnly = true)
    public List<TranslationValueResponse> getTranslationsByLanguage(
            String languageCode
    ) {

        Language language = languageRepository.findByCode(languageCode)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Language not found."
                        ));

        return translationMapper.toTranslationValueResponseList(
                translationValueRepository.findByLanguage(language)
        );
    }


        /**
     * Returns all translations for a language as a key-value map.
     *
     * Example:
     * {
     *   "product.add_to_cart": "Add to Cart",
     *   "checkout.place_order": "Place Order"
     * }
     */
    @Override
    @Transactional(readOnly = true)
    public Map<String, String> getTranslationMap(
            String languageCode
    ) {

        Language language = languageRepository.findByCode(languageCode)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Language not found."
                        ));

        List<TranslationValue> translations =
                translationValueRepository.findByLanguage(language);

        Map<String, String> translationMap = new LinkedHashMap<>();

        for (TranslationValue translation : translations) {
            translationMap.put(
                    translation.getTranslationKey().getKeyName(),
                    translation.getValue()
            );
        }

        return translationMap;
    }

}