package com.commercehub.backend.language.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

/**
 * Request DTO for creating a new language.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateLanguageRequest {

    /**
     * ISO language code.
     *
     * Example: en hi ar
     */
    @NotBlank(message = "Language code is required.")
    @Size(max = 10, message = "Language code must not exceed 10 characters.")
    private String code;

    /**
     * Language name in English.
     *
     * Example: English Hindi
     */
    @NotBlank(message = "Language name is required.")
    @Size(max = 100, message = "Language name must not exceed 100 characters.")
    private String name;

    /**
     * Native language name.
     *
     * Example: English हिन्दी العربية
     */
    @NotBlank(message = "Native language name is required.")
    @Size(max = 100, message = "Native language name must not exceed 100 characters.")
    private String nativeName;

    /**
     * Flag image URL.
     */
    @Size(max = 500, message = "Flag URL must not exceed 500 characters.")
    private String flagUrl;

    /**
     * Whether this language is the default language.
     */
    @NotNull(message = "Default language flag is required.")
    private Boolean defaultLanguage;

    /**
     * Whether this language is enabled.
     */
    @NotNull(message = "Enabled flag is required.")
    private Boolean enabled;

    /**
     * Whether this language uses RTL layout.
     */
    @NotNull(message = "RTL flag is required.")
    private Boolean rtl;

    /**
     * Display order.
     */
    @NotNull(message = "Sort order is required.")
    private Integer sortOrder;

}
