CREATE TABLE email_verification_tokens
(
    id UUID PRIMARY KEY,
    
    user_id BIGINT NOT NULL,

    token VARCHAR(255) NOT NULL UNIQUE,

    expiry_date TIMESTAMP NOT NULL,

    verified_at TIMESTAMP NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_email_verification_user
    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);


CREATE INDEX idx_email_verification_token
ON email_verification_tokens(token);


CREATE INDEX idx_email_verification_user
ON email_verification_tokens(user_id);