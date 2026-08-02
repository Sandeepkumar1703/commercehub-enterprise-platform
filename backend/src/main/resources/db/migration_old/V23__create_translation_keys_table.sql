CREATE TABLE translation_keys
(
    id BIGSERIAL PRIMARY KEY,

    key_name VARCHAR(255) NOT NULL,

    description VARCHAR(500),

    created_at TIMESTAMP,

    updated_at TIMESTAMP,

    created_by VARCHAR(100),

    updated_by VARCHAR(100),

    CONSTRAINT uk_translation_key_name
        UNIQUE (key_name)
);

CREATE INDEX idx_translation_key_name
ON translation_keys(key_name);