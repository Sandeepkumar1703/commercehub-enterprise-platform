package com.commercehub.backend.translation.entity;

import com.commercehub.backend.common.entity.Auditable;
import com.commercehub.backend.language.entity.Language;
import jakarta.persistence.*;
import lombok.*;

/**
 * Stores the translated value of a key
 * for a particular language.
 */
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(
        name = "translation_values",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_translation_language_key",
                        columnNames = {
                                "translation_key_id",
                                "language_id"
                        }
                )
        }
)
public class TranslationValue extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Translation key.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "translation_key_id",
            nullable = false
    )
    private TranslationKey translationKey;

    /**
     * Language of this translation.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "language_id",
            nullable = false
    )
    private Language language;

    /**
     * Localized text.
     */
    @Column(nullable = false, columnDefinition = "TEXT")
    private String value;
}