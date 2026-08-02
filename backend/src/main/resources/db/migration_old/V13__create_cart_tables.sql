-- =========================================================
-- V13__create_cart_tables.sql
-- Create Shopping Cart tables
-- =========================================================

-- =========================================================
-- CART
-- One cart per user
-- =========================================================

CREATE TABLE cart (

    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL UNIQUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_cart_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- =========================================================
-- CART ITEMS
-- Multiple products inside a cart
-- =========================================================

CREATE TABLE cart_items (

    id BIGSERIAL PRIMARY KEY,

    cart_id BIGINT NOT NULL,

    product_id BIGINT NOT NULL,

    quantity INTEGER NOT NULL DEFAULT 1,

    unit_price NUMERIC(10,2) NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_cart_items_cart
        FOREIGN KEY (cart_id)
        REFERENCES cart(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_cart_items_product
        FOREIGN KEY (product_id)
        REFERENCES products(id),

    CONSTRAINT uq_cart_product
        UNIQUE (cart_id, product_id),

    CONSTRAINT chk_cart_quantity
        CHECK (quantity > 0)
);

-- =========================================================
-- INDEXES
-- =========================================================

CREATE INDEX idx_cart_user
    ON cart(user_id);

CREATE INDEX idx_cart_items_cart
    ON cart_items(cart_id);

CREATE INDEX idx_cart_items_product
    ON cart_items(product_id);