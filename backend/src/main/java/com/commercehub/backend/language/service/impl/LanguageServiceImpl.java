package com.commercehub.backend.language.service.impl;

import com.commercehub.backend.common.exception.DuplicateResourceException;
import com.commercehub.backend.common.exception.ResourceNotFoundException;
import com.commercehub.backend.language.dto.request.CreateLanguageRequest;
import com.commercehub.backend.language.dto.request.UpdateLanguageRequest;
import com.commercehub.backend.language.dto.response.LanguageResponse;
import com.commercehub.backend.language.entity.Language;
import com.commercehub.backend.language.mapper.LanguageMapper;
import com.commercehub.backend.language.repository.LanguageRepository;
import com.commercehub.backend.language.service.LanguageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.commercehub.backend.common.exception.BadRequestException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class LanguageServiceImpl implements LanguageService {

    private final LanguageRepository languageRepository;
    private final LanguageMapper languageMapper;

    @Override
    public LanguageResponse createLanguage(CreateLanguageRequest request) {

        if (languageRepository.existsByCode(request.getCode())) {
            throw new DuplicateResourceException(
                    "Language with code '" + request.getCode() + "' already exists."
            );
        }

        if (Boolean.TRUE.equals(request.getDefaultLanguage())) {
            clearDefaultLanguage();
        }

        Language language = languageMapper.toEntity(request);

        Language savedLanguage = languageRepository.save(language);

        return languageMapper.toResponse(savedLanguage);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LanguageResponse> getAllLanguages() {

        return languageMapper.toResponseList(
                languageRepository.findAll()
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<LanguageResponse> getEnabledLanguages() {

        return languageMapper.toResponseList(
                languageRepository.findByEnabledTrueOrderBySortOrderAsc()
        );
    }

    @Override
    @Transactional(readOnly = true)
    public LanguageResponse getLanguageById(Long id) {

        Language language = languageRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Language not found with id: " + id
                        ));

        return languageMapper.toResponse(language);
    }

    @Override
    @Transactional(readOnly = true)
    public LanguageResponse getLanguageByCode(String code) {

        Language language = languageRepository.findByCode(code)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Language not found with code: " + code
                        ));

        return languageMapper.toResponse(language);
    }

    @Override
    public LanguageResponse updateLanguage(
            Long id,
            UpdateLanguageRequest request
    ) {

        Language language = languageRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Language not found with id: " + id
                        ));

        if (Boolean.TRUE.equals(request.getDefaultLanguage())) {
            clearDefaultLanguage();
        }

        languageMapper.updateEntity(request, language);

        Language updatedLanguage = languageRepository.save(language);

        return languageMapper.toResponse(updatedLanguage);
    }

    @Override
@Transactional
public void deleteLanguage(Long id) {

    Language language = languageRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Language not found with id: " + id
                    )
            );

    if (language.isDefaultLanguage()) {
        throw new BadRequestException(
                "Default language cannot be deleted. Please assign another default language first."
        );
    }

    languageRepository.delete(language);
}

    @Override
    public void enableLanguage(Long id) {

        Language language = languageRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Language not found with id: " + id
                        ));

        language.setEnabled(true);

        languageRepository.save(language);
    }

    @Override
    public void disableLanguage(Long id) {

        Language language = languageRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Language not found with id: " + id
                        ));

        language.setEnabled(false);

        languageRepository.save(language);
    }

    @Override
    public void setDefaultLanguage(Long id) {

        Language language = languageRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Language not found with id: " + id
                        ));

        clearDefaultLanguage();

        language.setDefaultLanguage(true);

        languageRepository.save(language);
    }

    /**
     * Ensures only one language is marked as the default.
     */
    private void clearDefaultLanguage() {

        languageRepository.findByDefaultLanguageTrue()
                .ifPresent(language -> {
                    language.setDefaultLanguage(false);
                    languageRepository.save(language);
                });
    }
}