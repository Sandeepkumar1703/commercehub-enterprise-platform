-- Flyway Migration V5
-- Create Payments, Shipping, Reviews, Wishlist, and Notifications tables
-- Created: July 22, 2026

-- ===================================================================
-- CREATE PAYMENTS TABLE
-- ===================================================================
-- Purpose: Payment transaction records
-- Supports multiple payment attempts per order with status tracking

CREATE TABLE IF NOT EXISTS payments (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    amount DECIMAL(12, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, COMPLETED, FAILED, REFUNDED, CANCELLED
    method VARCHAR(50) NOT NULL, -- CREDIT_CARD, DEBIT_CARD, PAYPAL, STRIPE, CASH, BANK_TRANSFER
    transaction_id VARCHAR(100),
    stripe_charge_id VARCHAR(100),
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT payments_order_id_not_null CHECK (order_id IS NOT NULL),
    CONSTRAINT payments_amount_positive CHECK (amount > 0),
    CONSTRAINT payments_method_not_empty CHECK (method IS NOT NULL AND method != '')
);

-- Create indexes for payment queries
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_transaction_id ON payments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);


-- ===================================================================
-- CREATE SHIPPING TABLE
-- ===================================================================
-- Purpose: Shipping and delivery tracking
-- Multiple shipments can exist per order (partial fulfillment support)

CREATE TABLE IF NOT EXISTS shipping (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, SHIPPED, IN_TRANSIT, DELIVERED, FAILED, RETURNED
    carrier VARCHAR(100), -- FedEx, UPS, DHL, USPS, etc.
    tracking_number VARCHAR(100),
    estimated_delivery TIMESTAMP,
    actual_delivery TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT shipping_order_id_not_null CHECK (order_id IS NOT NULL),
    CONSTRAINT shipping_delivered_after_shipped CHECK (actual_delivery IS NULL OR estimated_delivery IS NULL OR actual_delivery >= estimated_delivery)
);

-- Create indexes for shipping queries
CREATE INDEX IF NOT EXISTS idx_shipping_order_id ON shipping(order_id);
CREATE INDEX IF NOT EXISTS idx_shipping_status ON shipping(status);
CREATE INDEX IF NOT EXISTS idx_shipping_tracking_number ON shipping(tracking_number);
CREATE INDEX IF NOT EXISTS idx_shipping_created_at ON shipping(created_at);


-- ===================================================================
-- CREATE REVIEWS TABLE
-- ===================================================================
-- Purpose: Product reviews and ratings from customers
-- Links customers to product reviews with verification flag

CREATE TABLE IF NOT EXISTS reviews (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL, -- 1-5 stars
    title VARCHAR(255),
    comment TEXT,
    helpful_count BIGINT DEFAULT 0,
    is_verified BOOLEAN DEFAULT false, -- Flag for verified purchases
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT reviews_product_id_not_null CHECK (product_id IS NOT NULL),
    CONSTRAINT reviews_user_id_not_null CHECK (user_id IS NOT NULL),
    CONSTRAINT reviews_rating_range CHECK (rating >= 1 AND rating <= 5),
    CONSTRAINT reviews_helpful_count_non_negative CHECK (helpful_count >= 0)
);

-- Create indexes for review queries
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_is_verified ON reviews(is_verified);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at);

-- Ensure one review per user per product (composite unique)
CREATE UNIQUE INDEX IF NOT EXISTS idx_reviews_product_user_unique ON reviews(product_id, user_id);


-- ===================================================================
-- CREATE WISHLIST TABLE
-- ===================================================================
-- Purpose: Products users wish to purchase later
-- Many-to-many relationship between users and products

CREATE TABLE IF NOT EXISTS wishlist (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT wishlist_user_id_not_null CHECK (user_id IS NOT NULL),
    CONSTRAINT wishlist_product_id_not_null CHECK (product_id IS NOT NULL)
);

-- Create composite unique index (each user can wishlist each product only once)
CREATE UNIQUE INDEX IF NOT EXISTS idx_wishlist_user_product_unique ON wishlist(user_id, product_id);

-- Create indexes for wishlist queries
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_product_id ON wishlist(product_id);


-- ===================================================================
-- CREATE NOTIFICATIONS TABLE
-- ===================================================================
-- Purpose: User notifications for order updates, messages, promotions
-- Tracks notification delivery and read status

CREATE TABLE IF NOT EXISTS notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- ORDER_UPDATE, SHIPPING_UPDATE, PROMOTION, SYSTEM, ALERT
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT notifications_user_id_not_null CHECK (user_id IS NOT NULL),
    CONSTRAINT notifications_type_not_empty CHECK (type IS NOT NULL AND type != ''),
    CONSTRAINT notifications_message_not_empty CHECK (message IS NOT NULL AND message != ''),
    CONSTRAINT notifications_read_at_after_creation CHECK (read_at IS NULL OR read_at >= created_at)
);

-- Create indexes for notification queries
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- Composite index for efficient unread notification queries
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id, is_read, created_at DESC);


-- ===================================================================
-- Table Comments and Documentation
-- ===================================================================

COMMENT ON TABLE payments IS 'Payment transactions for orders - supports multiple attempts per order';
COMMENT ON COLUMN payments.id IS 'Unique payment identifier';
COMMENT ON COLUMN payments.order_id IS 'Foreign key to orders table';
COMMENT ON COLUMN payments.method IS 'Payment method used (CREDIT_CARD, PAYPAL, etc.)';
COMMENT ON COLUMN payments.transaction_id IS 'External payment processor transaction identifier';
COMMENT ON COLUMN payments.stripe_charge_id IS 'Stripe-specific charge ID for integration';
COMMENT ON COLUMN payments.error_message IS 'Error details if payment fails, for debugging';

COMMENT ON TABLE shipping IS 'Shipping and delivery tracking - one or more shipments per order';
COMMENT ON COLUMN shipping.id IS 'Unique shipping record identifier';
COMMENT ON COLUMN shipping.order_id IS 'Foreign key to orders table';
COMMENT ON COLUMN shipping.carrier IS 'Shipping carrier name (FedEx, UPS, DHL, USPS)';
COMMENT ON COLUMN shipping.tracking_number IS 'Carrier-provided tracking number';
COMMENT ON COLUMN shipping.status IS 'Shipping status from PENDING to DELIVERED/RETURNED';

COMMENT ON TABLE reviews IS 'Product reviews and customer ratings';
COMMENT ON COLUMN reviews.id IS 'Unique review identifier';
COMMENT ON COLUMN reviews.product_id IS 'Foreign key to products';
COMMENT ON COLUMN reviews.user_id IS 'Foreign key to users';
COMMENT ON COLUMN reviews.rating IS 'Star rating from 1 to 5';
COMMENT ON COLUMN reviews.is_verified IS 'Verified purchase flag - true if user purchased the product';
COMMENT ON COLUMN reviews.helpful_count IS 'Number of users who found review helpful';

COMMENT ON TABLE wishlist IS 'User wishlists - many-to-many relationship between users and products';
COMMENT ON COLUMN wishlist.id IS 'Unique wishlist item identifier';
COMMENT ON COLUMN wishlist.user_id IS 'Foreign key to users';
COMMENT ON COLUMN wishlist.product_id IS 'Foreign key to products';

COMMENT ON TABLE notifications IS 'User notifications for orders, shipping, promotions, and alerts';
COMMENT ON COLUMN notifications.id IS 'Unique notification identifier';
COMMENT ON COLUMN notifications.user_id IS 'Foreign key to users';
COMMENT ON COLUMN notifications.type IS 'Notification type: ORDER_UPDATE, SHIPPING_UPDATE, PROMOTION, SYSTEM, ALERT';
COMMENT ON COLUMN notifications.is_read IS 'Read status flag';
COMMENT ON COLUMN notifications.read_at IS 'Timestamp when notification was read (null if unread)';
