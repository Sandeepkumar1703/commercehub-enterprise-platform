package com.commercehub.backend.language.repository;

import com.commercehub.backend.language.entity.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Language entity.
 */
@Repository
public interface LanguageRepository extends JpaRepository<Language, Long> {

    /**
     * Find language by ISO code.
     *
     * Example: en hi ar
     */
    Optional<Language> findByCode(String code);

    /**
     * Returns all enabled languages ordered by display order.
     */
    List<Language> findByEnabledTrueOrderBySortOrderAsc();

    /**
     * Returns the default language.
     */
    Optional<Language> findByDefaultLanguageTrue();

    /**
     * Check whether a language code already exists.
     */
    boolean existsByCode(String code);

}
