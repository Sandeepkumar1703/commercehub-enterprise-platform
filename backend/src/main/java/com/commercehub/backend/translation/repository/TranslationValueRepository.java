package com.commercehub.backend.translation.repository;

import com.commercehub.backend.language.entity.Language;
import com.commercehub.backend.translation.entity.TranslationKey;
import com.commercehub.backend.translation.entity.TranslationValue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TranslationValueRepository
        extends JpaRepository<TranslationValue, Long> {

    List<TranslationValue> findByLanguage(Language language);

    List<TranslationValue> findByTranslationKey(TranslationKey translationKey);

    Optional<TranslationValue> findByTranslationKeyAndLanguage(
            TranslationKey translationKey,
            Language language
    );

    boolean existsByTranslationKeyAndLanguage(
            TranslationKey translationKey,
            Language language
    );
}