DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE reviews
(
    id BIGSERIAL PRIMARY KEY,

    product_id BIGINT NOT NULL,

    user_id BIGINT NOT NULL,

    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),

    title VARCHAR(150),

    comment TEXT,

    verified_purchase BOOLEAN NOT NULL DEFAULT FALSE,

    merchant_reply TEXT,

    merchant_reply_at TIMESTAMP,

    merchant_reply_by BIGINT,

    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_review_product
        FOREIGN KEY(product_id)
        REFERENCES products(id),

    CONSTRAINT fk_review_user
        FOREIGN KEY(user_id)
        REFERENCES users(id),

    CONSTRAINT fk_review_reply_user
        FOREIGN KEY(merchant_reply_by)
        REFERENCES users(id)
);

CREATE INDEX idx_review_product
ON reviews(product_id);

CREATE INDEX idx_review_user
ON reviews(user_id);

CREATE INDEX idx_review_rating
ON reviews(rating);

CREATE INDEX idx_review_deleted
ON reviews(is_deleted);