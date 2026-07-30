package com.commercehub.backend.translation.controller;

import com.commercehub.backend.translation.dto.request.CreateTranslationKeyRequest;
import com.commercehub.backend.translation.dto.request.CreateTranslationValueRequest;
import com.commercehub.backend.translation.dto.request.UpdateTranslationKeyRequest;
import com.commercehub.backend.translation.dto.request.UpdateTranslationValueRequest;
import com.commercehub.backend.translation.dto.response.TranslationResponse;
import com.commercehub.backend.translation.dto.response.TranslationValueResponse;
import com.commercehub.backend.translation.service.TranslationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/translations")
public class TranslationController {

    private final TranslationService translationService;

    /*
     * ==========================================
     * Translation Keys
     * ==========================================
     */

    @PostMapping("/keys")
    public ResponseEntity<TranslationResponse> createTranslationKey(
            @Valid @RequestBody CreateTranslationKeyRequest request
    ) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(translationService.createTranslationKey(request));
    }

    @GetMapping("/keys")
    public ResponseEntity<List<TranslationResponse>> getAllTranslationKeys() {

        return ResponseEntity.ok(
                translationService.getAllTranslationKeys()
        );
    }

    @GetMapping("/keys/{id}")
    public ResponseEntity<TranslationResponse> getTranslationKeyById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                translationService.getTranslationKeyById(id)
        );
    }

    @PutMapping("/keys/{id}")
    public ResponseEntity<TranslationResponse> updateTranslationKey(
            @PathVariable Long id,
            @Valid @RequestBody UpdateTranslationKeyRequest request
    ) {

        return ResponseEntity.ok(
                translationService.updateTranslationKey(id, request)
        );
    }

    @DeleteMapping("/keys/{id}")
    public ResponseEntity<Void> deleteTranslationKey(
            @PathVariable Long id
    ) {

        translationService.deleteTranslationKey(id);

        return ResponseEntity.noContent().build();
    }

    /*
     * ==========================================
     * Translation Values
     * ==========================================
     */

    @PostMapping("/values")
    public ResponseEntity<TranslationValueResponse> createTranslationValue(
            @Valid @RequestBody CreateTranslationValueRequest request
    ) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(translationService.createTranslationValue(request));
    }

    @GetMapping("/values")
    public ResponseEntity<List<TranslationValueResponse>> getAllTranslationValues() {

        return ResponseEntity.ok(
                translationService.getAllTranslationValues()
        );
    }

    @GetMapping("/values/{id}")
    public ResponseEntity<TranslationValueResponse> getTranslationValueById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                translationService.getTranslationValueById(id)
        );
    }

    @PutMapping("/values/{id}")
    public ResponseEntity<TranslationValueResponse> updateTranslationValue(
            @PathVariable Long id,
            @Valid @RequestBody UpdateTranslationValueRequest request
    ) {

        return ResponseEntity.ok(
                translationService.updateTranslationValue(id, request)
        );
    }

    @DeleteMapping("/values/{id}")
    public ResponseEntity<Void> deleteTranslationValue(
            @PathVariable Long id
    ) {

        translationService.deleteTranslationValue(id);

        return ResponseEntity.noContent().build();
    }

    /*
     * ==========================================
     * Language Translations
     * ==========================================
     */

    @GetMapping("/language/{languageCode}")
    public ResponseEntity<List<TranslationValueResponse>> getTranslationsByLanguage(
            @PathVariable String languageCode
    ) {

        return ResponseEntity.ok(
                translationService.getTranslationsByLanguage(languageCode)
        );
    }

    @GetMapping("/map/{languageCode}")
    public ResponseEntity<Map<String, String>> getTranslationMap(
            @PathVariable String languageCode
    ) {

        return ResponseEntity.ok(
                translationService.getTranslationMap(languageCode)
        );
    }
}