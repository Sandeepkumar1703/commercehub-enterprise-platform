-- Flyway Migration V3
-- Create Categories and Products tables
-- Created: July 22, 2026

-- ===================================================================
-- CREATE CATEGORIES TABLE
-- ===================================================================
-- Purpose: Product categorization for organization and navigation

CREATE TABLE IF NOT EXISTS categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT categories_name_not_empty CHECK (name IS NOT NULL AND name != '')
);

-- Create indexes for category queries
CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON categories(is_active);

-- Insert default categories
INSERT INTO categories (name, description, is_active) VALUES 
    ('Electronics', 'Electronic devices and gadgets', true),
    ('Clothing', 'Apparel and fashion items', true),
    ('Books', 'Books and educational materials', true),
    ('Home & Garden', 'Home and garden products', true),
    ('Sports', 'Sports and outdoor equipment', true),
    ('Toys', 'Toys and games', true),
    ('Beauty', 'Beauty and personal care', true),
    ('Food & Beverages', 'Food and beverage products', true)
ON CONFLICT (name) DO NOTHING;


-- ===================================================================
-- CREATE PRODUCTS TABLE
-- ===================================================================
-- Purpose: Store product information and pricing
-- Central product catalog table

CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    category_id BIGINT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    discount_price DECIMAL(10, 2),
    sku VARCHAR(100) NOT NULL UNIQUE,
    image_url VARCHAR(500),
    status VARCHAR(50) DEFAULT 'ACTIVE', -- ACTIVE, INACTIVE, DISCONTINUED
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT products_name_not_empty CHECK (name IS NOT NULL AND name != ''),
    CONSTRAINT products_price_positive CHECK (price > 0),
    CONSTRAINT products_category_id_not_null CHECK (category_id IS NOT NULL),
    CONSTRAINT products_discount_check CHECK (discount_price IS NULL OR discount_price > 0),
    CONSTRAINT products_discount_vs_price CHECK (discount_price IS NULL OR discount_price < price)
);

-- Create indexes for product queries and search
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);


-- ===================================================================
-- CREATE INVENTORY TABLE
-- ===================================================================
-- Purpose: Track product stock levels
-- One inventory record per product (1-to-1 relationship)

CREATE TABLE IF NOT EXISTS inventory (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL UNIQUE REFERENCES products(id) ON DELETE CASCADE,
    quantity BIGINT DEFAULT 0 NOT NULL,
    reserved BIGINT DEFAULT 0 NOT NULL,
    reorder_level BIGINT DEFAULT 10,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT inventory_quantity_non_negative CHECK (quantity >= 0),
    CONSTRAINT inventory_reserved_non_negative CHECK (reserved >= 0),
    CONSTRAINT inventory_reserved_not_exceeds_quantity CHECK (reserved <= quantity),
    CONSTRAINT inventory_product_id_not_null CHECK (product_id IS NOT NULL)
);

-- Create index for inventory lookups
CREATE INDEX IF NOT EXISTS idx_inventory_product_id ON inventory(product_id);


COMMENT ON TABLE categories IS 'Product categories for organization and navigation';
COMMENT ON COLUMN categories.id IS 'Unique category identifier';
COMMENT ON COLUMN categories.is_active IS 'Soft delete flag';

COMMENT ON TABLE products IS 'Product catalog with pricing and information';
COMMENT ON COLUMN products.id IS 'Unique product identifier';
COMMENT ON COLUMN products.category_id IS 'Foreign key to categories table';
COMMENT ON COLUMN products.sku IS 'Stock Keeping Unit - unique product code';
COMMENT ON COLUMN products.discount_price IS 'Special/promotional price (optional)';
COMMENT ON COLUMN products.status IS 'Status: ACTIVE, INACTIVE, or DISCONTINUED';

COMMENT ON TABLE inventory IS 'Product stock tracking and inventory management';
COMMENT ON COLUMN inventory.id IS 'Unique inventory record identifier';
COMMENT ON COLUMN inventory.product_id IS 'Foreign key to products (UNIQUE - one per product)';
COMMENT ON COLUMN inventory.quantity IS 'Current available stock quantity';
COMMENT ON COLUMN inventory.reserved IS 'Quantity reserved for pending orders';
COMMENT ON COLUMN inventory.reorder_level IS 'Threshold for automated reorder alerts';
