CREATE TABLE translation_values
(
    id BIGSERIAL PRIMARY KEY,

    translation_key_id BIGINT NOT NULL,

    language_id BIGINT NOT NULL,

    value TEXT NOT NULL,

    created_at TIMESTAMP,

    updated_at TIMESTAMP,

    created_by VARCHAR(100),

    updated_by VARCHAR(100),

    CONSTRAINT fk_translation_value_key
        FOREIGN KEY (translation_key_id)
        REFERENCES translation_keys(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_translation_value_language
        FOREIGN KEY (language_id)
        REFERENCES languages(id)
        ON DELETE CASCADE,

    CONSTRAINT uk_translation_language_key
        UNIQUE (translation_key_id, language_id)
);

CREATE INDEX idx_translation_value_key
ON translation_values(translation_key_id);

CREATE INDEX idx_translation_value_language
ON translation_values(language_id);