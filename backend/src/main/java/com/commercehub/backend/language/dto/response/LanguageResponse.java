package com.commercehub.backend.language.dto.response;

import lombok.*;

/**
 * Response DTO for Language.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LanguageResponse {

    /**
     * Language ID.
     */
    private Long id;

    /**
     * ISO language code.
     */
    private String code;

    /**
     * Language name in English.
     */
    private String name;

    /**
     * Native language name.
     */
    private String nativeName;

    /**
     * Flag image URL.
     */
    private String flagUrl;

    /**
     * Indicates whether this is the default language.
     */
    private boolean defaultLanguage;

    /**
     * Indicates whether this language is enabled.
     */
    private boolean enabled;

    /**
     * Indicates whether this language uses
     * Right-To-Left (RTL) layout.
     */
    private boolean rtl;

    /**
     * Display order.
     */
    private Integer sortOrder;

}