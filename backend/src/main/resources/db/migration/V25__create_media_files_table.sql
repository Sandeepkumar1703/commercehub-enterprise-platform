CREATE TABLE media_files
(
    id UUID PRIMARY KEY,

    file_name VARCHAR(255) NOT NULL,

    original_file_name VARCHAR(255) NOT NULL,

    content_type VARCHAR(100) NOT NULL,

    file_size BIGINT NOT NULL,

    storage_path VARCHAR(500) NOT NULL,

    file_url VARCHAR(500) NOT NULL,

    uploaded_by BIGINT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_media_uploaded_by
        FOREIGN KEY (uploaded_by)
        REFERENCES users(id)
        ON DELETE SET NULL
);

CREATE INDEX idx_media_uploaded_by
    ON media_files(uploaded_by);

CREATE INDEX idx_media_created_at
    ON media_files(created_at);