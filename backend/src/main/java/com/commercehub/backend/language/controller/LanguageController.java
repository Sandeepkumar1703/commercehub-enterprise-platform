package com.commercehub.backend.language.controller;

import com.commercehub.backend.common.response.ApiResponse;
import com.commercehub.backend.language.dto.request.CreateLanguageRequest;
import com.commercehub.backend.language.dto.request.UpdateLanguageRequest;
import com.commercehub.backend.language.dto.response.LanguageResponse;
import com.commercehub.backend.language.service.LanguageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/languages")
@RequiredArgsConstructor
public class LanguageController {

    private final LanguageService languageService;

    /**
     * Create Language
     */
    @PostMapping
    public ResponseEntity<ApiResponse<LanguageResponse>> createLanguage(
            @Valid @RequestBody CreateLanguageRequest request) {

        LanguageResponse response = languageService.createLanguage(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Language created successfully.",
                        response
                ));
    }

    /**
     * Get All Languages
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<LanguageResponse>>> getAllLanguages() {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Languages fetched successfully.",
                        languageService.getAllLanguages()
                )
        );
    }

    /**
     * Get Enabled Languages
     */
    @GetMapping("/enabled")
    public ResponseEntity<ApiResponse<List<LanguageResponse>>> getEnabledLanguages() {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Enabled languages fetched successfully.",
                        languageService.getEnabledLanguages()
                )
        );
    }

    /**
     * Get Language By ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<LanguageResponse>> getLanguageById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Language fetched successfully.",
                        languageService.getLanguageById(id)
                )
        );
    }

    /**
     * Get Language By Code
     */
    @GetMapping("/code/{code}")
    public ResponseEntity<ApiResponse<LanguageResponse>> getLanguageByCode(
            @PathVariable String code) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Language fetched successfully.",
                        languageService.getLanguageByCode(code)
                )
        );
    }

    /**
     * Update Language
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<LanguageResponse>> updateLanguage(
            @PathVariable Long id,
            @Valid @RequestBody UpdateLanguageRequest request) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Language updated successfully.",
                        languageService.updateLanguage(id, request)
                )
        );
    }

    /**
     * Delete Language
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteLanguage(
            @PathVariable Long id) {

        languageService.deleteLanguage(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Language deleted successfully.",
                        null
                )
        );
    }

    /**
     * Enable Language
     */
    @PatchMapping("/{id}/enable")
    public ResponseEntity<ApiResponse<Void>> enableLanguage(
            @PathVariable Long id) {

        languageService.enableLanguage(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Language enabled successfully.",
                        null
                )
        );
    }

    /**
     * Disable Language
     */
    @PatchMapping("/{id}/disable")
    public ResponseEntity<ApiResponse<Void>> disableLanguage(
            @PathVariable Long id) {

        languageService.disableLanguage(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Language disabled successfully.",
                        null
                )
        );
    }

    /**
     * Set Default Language
     */
    @PatchMapping("/{id}/default")
    public ResponseEntity<ApiResponse<Void>> setDefaultLanguage(
            @PathVariable Long id) {

        languageService.setDefaultLanguage(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Default language updated successfully.",
                        null
                )
        );
    }

}
