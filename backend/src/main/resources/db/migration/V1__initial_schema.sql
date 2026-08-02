-- ===================================================================
-- Flyway Migration: V1__initial_schema.sql
-- Description: Complete initial database schema and seed data setup
-- Green Consolidation Migration for CommerceHub Enterprise Platform
-- ===================================================================

-- ===================================================================
-- 1. ROLES
-- ===================================================================
CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    
    CONSTRAINT roles_name_not_empty CHECK (name IS NOT NULL AND name != '')
);

CREATE INDEX idx_roles_name ON roles(name);

-- ===================================================================
-- 2. PERMISSIONS
-- ===================================================================
CREATE TABLE permissions (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),

    CONSTRAINT permissions_name_not_empty CHECK (name IS NOT NULL AND name != '')
);

CREATE INDEX idx_permissions_name ON permissions(name);

-- ===================================================================
-- 3. USERS
-- ===================================================================
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true NOT NULL,
    enabled BOOLEAN DEFAULT false NOT NULL,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    
    CONSTRAINT users_email_not_empty CHECK (email IS NOT NULL AND email != ''),
    CONSTRAINT users_password_not_empty CHECK (password IS NOT NULL AND password != '')
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_is_active ON users(is_active);
CREATE INDEX idx_users_created_at ON users(created_at);

-- ===================================================================
-- 4. USER_ROLES JUNCTION
-- ===================================================================
CREATE TABLE user_roles (
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (user_id, role_id)
);

CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role_id ON user_roles(role_id);

-- ===================================================================
-- 5. ROLE_PERMISSIONS JUNCTION
-- ===================================================================
CREATE TABLE role_permissions (
    role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id BIGINT NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    
    PRIMARY KEY(role_id, permission_id)
);

CREATE INDEX idx_role_permissions_role_id ON role_permissions(role_id);
CREATE INDEX idx_role_permissions_permission_id ON role_permissions(permission_id);

-- ===================================================================
-- 6. LANGUAGES
-- ===================================================================
CREATE TABLE languages (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    native_name VARCHAR(100) NOT NULL,
    flag_url VARCHAR(500),
    is_default BOOLEAN DEFAULT false NOT NULL,
    enabled BOOLEAN DEFAULT true NOT NULL,      -- <--- Restored enabled column for JPA Entity validation
    is_active BOOLEAN DEFAULT true NOT NULL,
    rtl BOOLEAN DEFAULT false NOT NULL,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

CREATE INDEX idx_languages_code ON languages(code);
CREATE INDEX idx_languages_enabled ON languages(enabled);
CREATE INDEX idx_languages_is_active ON languages(is_active);
CREATE INDEX idx_languages_sort_order ON languages(sort_order);

-- ===================================================================
-- 7. TRANSLATION_KEYS
-- ===================================================================
CREATE TABLE translation_keys (
    id BIGSERIAL PRIMARY KEY,
    key_name VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

CREATE INDEX idx_translation_key_name ON translation_keys(key_name);

-- ===================================================================
-- 8. TRANSLATION_VALUES
-- ===================================================================
CREATE TABLE translation_values (
    id BIGSERIAL PRIMARY KEY,
    translation_key_id BIGINT NOT NULL REFERENCES translation_keys(id) ON DELETE CASCADE,
    language_id BIGINT NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    value TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),

    CONSTRAINT uk_translation_language_key UNIQUE (translation_key_id, language_id)
);

CREATE INDEX idx_translation_value_key ON translation_values(translation_key_id);
CREATE INDEX idx_translation_value_language ON translation_values(language_id);

-- ===================================================================
-- 9. CATEGORIES
-- ===================================================================
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    
    CONSTRAINT categories_name_not_empty CHECK (name IS NOT NULL AND name != '')
);

CREATE INDEX idx_categories_name ON categories(name);
CREATE INDEX idx_categories_is_active ON categories(is_active);

-- ===================================================================
-- 10. PRODUCTS
-- ===================================================================
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    category_id BIGINT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    discount_price DECIMAL(10, 2),
    sku VARCHAR(100) NOT NULL UNIQUE,
    stock_quantity INTEGER DEFAULT 0 NOT NULL,
    image_url VARCHAR(500),
    status VARCHAR(50) DEFAULT 'ACTIVE',
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    
    CONSTRAINT products_name_not_empty CHECK (name IS NOT NULL AND name != ''),
    CONSTRAINT products_price_positive CHECK (price > 0),
    CONSTRAINT products_discount_check CHECK (discount_price IS NULL OR discount_price > 0),
    CONSTRAINT products_discount_vs_price CHECK (discount_price IS NULL OR discount_price < price)
);

CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_created_at ON products(created_at);

-- ===================================================================
-- 11. INVENTORY (Sole source of truth for stock)
-- ===================================================================
CREATE TABLE inventory (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL UNIQUE REFERENCES products(id) ON DELETE CASCADE,
    quantity BIGINT DEFAULT 0 NOT NULL,
    reserved BIGINT DEFAULT 0 NOT NULL,
    reorder_level BIGINT DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    
    CONSTRAINT inventory_quantity_non_negative CHECK (quantity >= 0),
    CONSTRAINT inventory_reserved_non_negative CHECK (reserved >= 0),
    CONSTRAINT inventory_reserved_not_exceeds_quantity CHECK (reserved <= quantity)
);

CREATE INDEX idx_inventory_product_id ON inventory(product_id);

-- ===================================================================
-- 12. COUPONS
-- ===================================================================
CREATE TABLE coupons (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    discount_type VARCHAR(50) NOT NULL, -- PERCENTAGE, FIXED_AMOUNT
    discount_value DECIMAL(10,2) NOT NULL,
    max_uses BIGINT,
    current_uses BIGINT DEFAULT 0,
    min_amount DECIMAL(10,2) DEFAULT 0.00,
    max_discount DECIMAL(10,2),
    valid_from TIMESTAMP NOT NULL,
    valid_until TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),

    CONSTRAINT coupons_code_not_empty CHECK(code <> ''),
    CONSTRAINT coupons_discount_value_positive CHECK(discount_value > 0),
    CONSTRAINT coupons_current_uses_non_negative CHECK(current_uses >= 0),
    CONSTRAINT coupons_max_uses_positive CHECK(max_uses IS NULL OR max_uses > 0),
    CONSTRAINT coupons_usage_limit_check CHECK(max_uses IS NULL OR current_uses <= max_uses),
    CONSTRAINT coupons_valid_date_check CHECK(valid_until > valid_from),
    CONSTRAINT coupons_min_amount_non_negative CHECK(min_amount >= 0)
);

CREATE INDEX idx_coupons_code ON coupons(code);
CREATE INDEX idx_coupons_is_active ON coupons(is_active);
CREATE INDEX idx_coupons_valid_from ON coupons(valid_from);
CREATE INDEX idx_coupons_valid_until ON coupons(valid_until);

-- ===================================================================
-- 13. ADDRESSES
-- ===================================================================
CREATE TABLE addresses (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL DEFAULT '',
    phone_number VARCHAR(20) NOT NULL DEFAULT '',
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    landmark VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    address_type VARCHAR(50) DEFAULT 'SHIPPING',
    is_default BOOLEAN DEFAULT false NOT NULL,
    active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    
    CONSTRAINT addresses_line1_not_empty CHECK (address_line1 IS NOT NULL AND address_line1 != ''),
    CONSTRAINT addresses_city_not_empty CHECK (city IS NOT NULL AND city != '')
);

CREATE INDEX idx_addresses_user_id ON addresses(user_id);
CREATE INDEX idx_addresses_is_default ON addresses(is_default);
CREATE INDEX idx_addresses_address_type ON addresses(address_type);
CREATE INDEX idx_addresses_active ON addresses(active);

-- ===================================================================
-- 14. CART
-- ===================================================================
CREATE TABLE cart (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

CREATE INDEX idx_cart_user_id ON cart(user_id);

-- ===================================================================
-- 15. CART_ITEMS
-- ===================================================================
CREATE TABLE cart_items (
    id BIGSERIAL PRIMARY KEY,
    cart_id BIGINT NOT NULL REFERENCES cart(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    quantity BIGINT DEFAULT 1 NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),

    CONSTRAINT uq_cart_product UNIQUE (cart_id, product_id),
    CONSTRAINT chk_cart_quantity CHECK (quantity > 0)
);

CREATE INDEX idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX idx_cart_items_product_id ON cart_items(product_id);

-- ===================================================================
-- 16. ORDERS
-- ===================================================================
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    total_amount DECIMAL(12,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0.00,
    discount_amount DECIMAL(10,2) DEFAULT 0.00,
    shipping_cost DECIMAL(10,2) DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'PENDING',
    payment_status VARCHAR(50) DEFAULT 'UNPAID',
    shipping_address_id BIGINT REFERENCES addresses(id) ON DELETE SET NULL,
    coupon_id BIGINT REFERENCES coupons(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),

    CONSTRAINT orders_total_positive CHECK(total_amount >= 0),
    CONSTRAINT orders_tax_positive CHECK(tax_amount >= 0),
    CONSTRAINT orders_discount_positive CHECK(discount_amount >= 0),
    CONSTRAINT orders_shipping_positive CHECK(shipping_cost >= 0)
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- ===================================================================
-- 17. ORDER_ITEMS
-- ===================================================================
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    quantity BIGINT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0.00,
    tax DECIMAL(10,2) DEFAULT 0.00,
    total DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),

    CONSTRAINT order_item_quantity_positive CHECK(quantity > 0),
    CONSTRAINT order_item_price_positive CHECK(price >= 0),
    CONSTRAINT order_item_total_check CHECK(total = subtotal - discount + tax)
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- ===================================================================
-- 18. PAYMENTS
-- ===================================================================
CREATE TABLE payments (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    amount DECIMAL(12, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, COMPLETED, FAILED, REFUNDED, CANCELLED
    method VARCHAR(50) NOT NULL, -- CREDIT_CARD, DEBIT_CARD, PAYPAL, STRIPE, CASH, BANK_TRANSFER
    transaction_id VARCHAR(100),
    stripe_charge_id VARCHAR(100),
    gateway_name VARCHAR(50),
    gateway_response TEXT,
    error_message TEXT,
    refunded_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    
    CONSTRAINT payments_amount_positive CHECK (amount > 0),
    CONSTRAINT payments_method_not_empty CHECK (method IS NOT NULL AND method != '')
);

CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_transaction_id ON payments(transaction_id);
CREATE INDEX idx_payments_created_at ON payments(created_at);

-- ===================================================================
-- 19. SHIPPING
-- ===================================================================
CREATE TABLE shipping (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, SHIPPED, IN_TRANSIT, DELIVERED, FAILED, RETURNED
    carrier VARCHAR(100),
    tracking_number VARCHAR(100),
    tracking_url VARCHAR(500),
    estimated_delivery TIMESTAMP,
    actual_delivery TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    
    CONSTRAINT shipping_delivered_after_shipped CHECK (actual_delivery IS NULL OR estimated_delivery IS NULL OR actual_delivery >= estimated_delivery)
);

CREATE INDEX idx_shipping_order_id ON shipping(order_id);
CREATE INDEX idx_shipping_status ON shipping(status);
CREATE INDEX idx_shipping_tracking_number ON shipping(tracking_number);
CREATE INDEX idx_shipping_created_at ON shipping(created_at);

-- ===================================================================
-- 20. WISHLIST
-- ===================================================================
CREATE TABLE wishlist (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    
    CONSTRAINT idx_wishlist_user_product_unique UNIQUE (user_id, product_id)
);

CREATE INDEX idx_wishlist_user_id ON wishlist(user_id);
CREATE INDEX idx_wishlist_product_id ON wishlist(product_id);

-- ===================================================================
-- 21. REVIEWS (Consolidated to enhanced review schema)
-- ===================================================================
CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(150),
    comment TEXT,
    verified_purchase BOOLEAN DEFAULT false NOT NULL,
    merchant_reply TEXT,
    merchant_reply_at TIMESTAMP,
    merchant_reply_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_is_deleted ON reviews(is_deleted);

-- ===================================================================
-- 22. NOTIFICATIONS
-- ===================================================================
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- ORDER_UPDATE, SHIPPING_UPDATE, PROMOTION, SYSTEM, ALERT
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false NOT NULL,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    
    CONSTRAINT notifications_type_not_empty CHECK (type IS NOT NULL AND type != ''),
    CONSTRAINT notifications_message_not_empty CHECK (message IS NOT NULL AND message != ''),
    CONSTRAINT notifications_read_at_after_creation CHECK (read_at IS NULL OR read_at >= created_at)
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read, created_at DESC);

-- ===================================================================
-- 23. EMAIL_VERIFICATION_TOKENS
-- ===================================================================
CREATE TABLE email_verification_tokens (
    id UUID PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL UNIQUE,
    expiry_date TIMESTAMP NOT NULL,
    verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

CREATE INDEX idx_email_verification_token ON email_verification_tokens(token);
CREATE INDEX idx_email_verification_user ON email_verification_tokens(user_id);

-- ===================================================================
-- 24. PASSWORD_RESET_TOKENS
-- ===================================================================
CREATE TABLE password_reset_tokens (
    id BIGSERIAL PRIMARY KEY,
    token VARCHAR(255) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expiry_date TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

CREATE INDEX idx_password_reset_token ON password_reset_tokens(token);
CREATE INDEX idx_password_reset_user ON password_reset_tokens(user_id);

-- ===================================================================
-- 25. MEDIA_FILES
-- ===================================================================
CREATE TABLE media_files (
    id UUID PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    original_file_name VARCHAR(255) NOT NULL,
    content_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    storage_path VARCHAR(500) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    uploaded_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

CREATE INDEX idx_media_uploaded_by ON media_files(uploaded_by);
CREATE INDEX idx_media_created_at ON media_files(created_at);

-- ===================================================================
-- SEED DATA (In strict dependency order)
-- ===================================================================

-- 1. Seed Roles (including ROLE_SUPER_ADMIN)
INSERT INTO roles (name, description) VALUES 
    ('ROLE_SUPER_ADMIN', 'Super Administrator with unrestricted access'),
    ('ROLE_ADMIN', 'Administrator with full access'),
    ('ROLE_VENDOR', 'Vendor user for selling'),
    ('ROLE_USER', 'Regular user with standard access'),
    ('ROLE_MODERATOR', 'Moderator with review and content management')
ON CONFLICT (name) DO NOTHING;

-- 2. Seed Permissions (Single consolidated insert)
INSERT INTO permissions (name, description) VALUES
    ('ANALYTICS_VIEW', 'View analytics dashboard'),
    ('USER_VIEW', 'View users'),
    ('USER_CREATE', 'Create users'),
    ('USER_UPDATE', 'Update users'),
    ('USER_DELETE', 'Delete users'),
    ('PRODUCT_CREATE', 'Create products'),
    ('PRODUCT_UPDATE', 'Update products'),
    ('PRODUCT_DELETE', 'Delete products'),
    ('ORDER_VIEW', 'View orders'),
    ('ORDER_UPDATE', 'Update orders'),
    ('ROLE_MANAGE', 'Manage roles'),
    ('PERMISSION_MANAGE', 'Manage permissions')
ON CONFLICT (name) DO NOTHING;

-- 3. Seed Role-Permissions
-- Assign ALL permissions to ROLE_SUPER_ADMIN and ROLE_ADMIN
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name IN ('ROLE_SUPER_ADMIN', 'ROLE_ADMIN')
ON CONFLICT DO NOTHING;

-- Assign specific permissions to ROLE_VENDOR
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'ROLE_VENDOR' 
  AND p.name IN ('ANALYTICS_VIEW', 'PRODUCT_CREATE', 'PRODUCT_UPDATE', 'ORDER_VIEW')
ON CONFLICT DO NOTHING;

-- 4. Seed Default Categories
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

-- 5. Seed Default Languages
INSERT INTO languages (code, name, native_name, flag_url, is_default, enabled, is_active, rtl, sort_order) VALUES
    ('en', 'English', 'English', '/flags/en.png', true, true, true, false, 1),
    ('hi', 'Hindi', 'हिन्दी', '/flags/hi.png', false, true, true, false, 2),
    ('ar', 'Arabic', 'العربية', '/flags/ar.png', false, true, true, true, 3),
    ('ru', 'Russian', 'Русский', '/flags/ru.png', false, true, true, false, 4),
    ('es', 'Spanish', 'Español', '/flags/es.png', false, true, true, false, 5),
    ('fr', 'French', 'Français', '/flags/fr.png', false, true, true, false, 6),
    ('de', 'German', 'Deutsch', '/flags/de.png', false, true, true, false, 7)
ON CONFLICT (code) DO NOTHING;