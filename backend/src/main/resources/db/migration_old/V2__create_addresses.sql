-- Flyway Migration V2
-- Create Addresses table
-- Created: July 22, 2026

-- ===================================================================
-- CREATE ADDRESSES TABLE
-- ===================================================================
-- Purpose: Store user addresses (shipping, billing, etc.)
-- A user can have multiple addresses

CREATE TABLE IF NOT EXISTS addresses (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    zip_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    is_default BOOLEAN DEFAULT false NOT NULL,
    type VARCHAR(50) DEFAULT 'SHIPPING', -- SHIPPING, BILLING, OTHER
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT addresses_street_not_empty CHECK (street IS NOT NULL AND street != ''),
    CONSTRAINT addresses_city_not_empty CHECK (city IS NOT NULL AND city != ''),
    CONSTRAINT addresses_user_id_not_null CHECK (user_id IS NOT NULL)
);

-- Create indexes for address queries
CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_addresses_is_default ON addresses(is_default);
CREATE INDEX IF NOT EXISTS idx_addresses_type ON addresses(type);


COMMENT ON TABLE addresses IS 'User addresses for shipping and billing';
COMMENT ON COLUMN addresses.id IS 'Unique address identifier';
COMMENT ON COLUMN addresses.user_id IS 'Foreign key to users table';
COMMENT ON COLUMN addresses.is_default IS 'Mark as default address for quick checkout';
COMMENT ON COLUMN addresses.type IS 'Address type - SHIPPING, BILLING, or OTHER';
