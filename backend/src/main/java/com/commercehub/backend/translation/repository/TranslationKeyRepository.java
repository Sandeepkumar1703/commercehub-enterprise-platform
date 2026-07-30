package com.commercehub.backend.translation.repository;

import com.commercehub.backend.translation.entity.TranslationKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TranslationKeyRepository extends JpaRepository<TranslationKey, Long> {

    Optional<TranslationKey> findByKeyName(String keyName);

    boolean existsByKeyName(String keyName);

}