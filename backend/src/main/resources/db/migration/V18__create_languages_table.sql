-- ==========================================================
-- Create Languages Table
-- ==========================================================

CREATE TABLE languages
(
    id BIGSERIAL PRIMARY KEY,

    code VARCHAR(10) NOT NULL UNIQUE,

    name VARCHAR(100) NOT NULL,

    native_name VARCHAR(100) NOT NULL,

    flag_url VARCHAR(500),

    is_default BOOLEAN NOT NULL DEFAULT FALSE,

    enabled BOOLEAN NOT NULL DEFAULT TRUE,

    rtl BOOLEAN NOT NULL DEFAULT FALSE,

    sort_order INTEGER NOT NULL DEFAULT 0
);

-- ==========================================================
-- Indexes
-- ==========================================================

CREATE INDEX idx_languages_code
ON languages(code);

CREATE INDEX idx_languages_enabled
ON languages(enabled);

CREATE INDEX idx_languages_sort_order
ON languages(sort_order);