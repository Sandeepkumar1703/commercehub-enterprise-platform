package com.commercehub.backend.language.entity;

import com.commercehub.backend.common.entity.Auditable;

import jakarta.persistence.*;
import lombok.*;

/**
 * Represents a supported language in the CommerceHub platform.
 *
 * This entity stores metadata about each language that can be
 * selected by users throughout the application.
 */
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Table(
        name = "languages",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_language_code",
                        columnNames = "code"
                )
        }
)
public class Language extends Auditable   {

    /**
     * Primary Key
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * ISO Language Code.
     */
    @Column(nullable = false, length = 10)
    private String code;

    /**
     * Language Name in English.
     */
    @Column(nullable = false)
    private String name;

    /**
     * Native Language Name.
     */
    @Column(nullable = false)
    private String nativeName;

    /**
     * Country or Language Flag URL.
     */
    @Column(length = 500)
    private String flagUrl;

    /**
     * Indicates whether this language
     * is the application's default language.
     */
    @Builder.Default
    @Column(name = "is_default", nullable = false)
    private boolean defaultLanguage = false;

    /**
     * Determines whether users
     * can select this language.
     */
    @Builder.Default
    @Column(nullable = false)
    private boolean enabled = true;

    /**
     * Indicates whether the language
     * uses Right-To-Left layout.
     */
    @Builder.Default
    @Column(nullable = false)
    private boolean rtl = false;

    /**
     * Display order in the language selector.
     */
    @Builder.Default
    @Column(nullable = false)
    private Integer sortOrder = 0;

}