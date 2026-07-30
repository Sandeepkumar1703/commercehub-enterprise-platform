package com.commercehub.backend.language.service;

import com.commercehub.backend.language.dto.request.CreateLanguageRequest;
import com.commercehub.backend.language.dto.request.UpdateLanguageRequest;
import com.commercehub.backend.language.dto.response.LanguageResponse;

import java.util.List;

/**
 * Service interface for Language operations.
 */
public interface LanguageService {

    /**
     * Create a new language.
     *
     * @param request language creation request
     * @return created language
     */
    LanguageResponse createLanguage(CreateLanguageRequest request);

    /**
     * Get all languages.
     *
     * @return list of languages
     */
    List<LanguageResponse> getAllLanguages();

    /**
     * Get only enabled languages.
     *
     * @return enabled languages
     */
    List<LanguageResponse> getEnabledLanguages();

    /**
     * Get language by ID.
     *
     * @param id language ID
     * @return language details
     */
    LanguageResponse getLanguageById(Long id);

    /**
     * Get language by ISO code.
     *
     * @param code language code
     * @return language details
     */
    LanguageResponse getLanguageByCode(String code);

    /**
     * Update language.
     *
     * @param id language ID
     * @param request update request
     * @return updated language
     */
    LanguageResponse updateLanguage(Long id, UpdateLanguageRequest request);

    /**
     * Delete language.
     *
     * @param id language ID
     */
    void deleteLanguage(Long id);

    /**
     * Enable language.
     *
     * @param id language ID
     */
    void enableLanguage(Long id);

    /**
     * Disable language.
     *
     * @param id language ID
     */
    void disableLanguage(Long id);

    /**
     * Set default language.
     *
     * @param id language ID
     */
    void setDefaultLanguage(Long id);

}
