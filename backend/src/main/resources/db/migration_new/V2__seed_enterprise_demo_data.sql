-- =====================================================
-- CommerceHub Enterprise Platform
-- Demo Seed Data
-- Flyway Migration V2
-- =====================================================

-- 1. REFERENCE DATA
INSERT INTO roles (name, description, created_by) VALUES 
('ROLE_ADMIN', 'Platform Administrator', 'SYSTEM'),
('ROLE_USER', 'Standard Shopper', 'SYSTEM'),
('ROLE_VENDOR', 'Merchant Partner', 'SYSTEM'),
('ROLE_MODERATOR', 'Content Moderator', 'SYSTEM') ON CONFLICT DO NOTHING;

INSERT INTO permissions (name, description, created_by) VALUES 
('ANALYTICS_VIEW', 'View Dashboards', 'SYSTEM'), ('USER_MANAGE', 'Manage Users', 'SYSTEM'),
('PRODUCT_CREATE', 'Add Products', 'SYSTEM'), ('ORDER_VIEW', 'View Orders', 'SYSTEM') ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id) 
SELECT r.id, p.id FROM roles r CROSS JOIN permissions p WHERE r.name = 'ROLE_ADMIN' ON CONFLICT DO NOTHING;

-- 2. LANGUAGES
INSERT INTO languages (code, name, native_name, is_default, enabled) VALUES
('en', 'English', 'English', true, true),
('hi', 'Hindi', 'हिन्दी', false, true) ON CONFLICT DO NOTHING;

-- 3. USERS (Pass: password)
INSERT INTO users (email, password, first_name, last_name, is_active, enabled, created_by) VALUES 
('admin@commercehub.local', '$2a$10$8.UnVuG9HHgffUDAlk8q6OuVGkqCYAdVqVoLpc3n3vXUsRJ696Cne', 'System', 'Admin', true, true, 'SYSTEM'),
('alice@example.com', '$2a$10$8.UnVuG9HHgffUDAlk8q6OuVGkqCYAdVqVoLpc3n3vXUsRJ696Cne', 'Alice', 'Smith', true, true, 'SYSTEM'),
('bob@example.com', '$2a$10$8.UnVuG9HHgffUDAlk8q6OuVGkqCYAdVqVoLpc3n3vXUsRJ696Cne', 'Bob', 'Jones', true, true, 'SYSTEM') ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r WHERE u.email = 'admin@commercehub.local' AND r.name = 'ROLE_ADMIN' ON CONFLICT DO NOTHING;
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r WHERE u.email IN ('alice@example.com', 'bob@example.com') AND r.name = 'ROLE_USER' ON CONFLICT DO NOTHING;

-- 4. MEDIA & CATALOG
INSERT INTO media_files (id, file_name, original_file_name, content_type, file_size, storage_path, file_url) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'iphone.jpg', 'iphone.jpg', 'image/jpeg', 50000, '/img/iphone.jpg', 'https://placehold.co/600x400') ON CONFLICT DO NOTHING;

INSERT INTO categories (name, slug, description, created_by) VALUES 
('Electronics', 'electronics', 'High-tech gadgets', 'SYSTEM'),
('Mobiles', 'mobiles', 'Smartphones', 'SYSTEM') ON CONFLICT DO NOTHING;

UPDATE categories SET parent_id = (SELECT id FROM categories WHERE name='Electronics') WHERE name='Mobiles';

INSERT INTO products (category_id, name, slug, price, sku, stock_quantity, status, created_by) VALUES 
((SELECT id FROM categories WHERE name='Mobiles'), 'iPhone 15 Pro', 'iphone-15-pro', 999.00, 'APPLE-IP15P', 50, 'ACTIVE', 'SYSTEM') ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, media_file_id, is_primary)
SELECT id, '550e8400-e29b-41d4-a716-446655440000', true FROM products WHERE sku = 'APPLE-IP15P' ON CONFLICT DO NOTHING;

INSERT INTO product_specifications (product_id, attribute_name, attribute_value)
SELECT id, 'Color', 'Natural Titanium' FROM products WHERE sku = 'APPLE-IP15P' ON CONFLICT DO NOTHING;

-- 5. INVENTORY TRANSACTION
INSERT INTO inventory (product_id, quantity, reserved) 
SELECT id, 50, 2 FROM products WHERE sku = 'APPLE-IP15P' ON CONFLICT (product_id) DO UPDATE SET quantity = 50, reserved = 2;

INSERT INTO inventory_transactions (product_id, type, quantity, remarks, created_by)
SELECT id, 'PURCHASE', 50, 'Initial Stock Load', 'SYSTEM' FROM products WHERE sku = 'APPLE-IP15P';

-- 6. ADDRESS & ORDER FLOW
DO $$ 
DECLARE alice_id BIGINT; addr_id BIGINT; ord_id BIGINT; 
BEGIN
    SELECT id INTO alice_id FROM users WHERE email = 'alice@example.com';
    
    IF NOT EXISTS (SELECT 1 FROM addresses WHERE user_id = alice_id) THEN
        INSERT INTO addresses (user_id, full_name, phone_number, address_line1, city, postal_code, country, address_type, is_default)
        VALUES (alice_id, 'Alice Smith', '555-0101', '123 Main St', 'NYC', '10001', 'USA', 'HOME', true) RETURNING id INTO addr_id;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM orders WHERE order_number = 'ORD-2026-001') THEN
        INSERT INTO orders (user_id, order_number, total_amount, status, payment_status, shipping_address_id, created_by)
        VALUES (alice_id, 'ORD-2026-001', 999.00, 'DELIVERED', 'COMPLETED', addr_id, 'SYSTEM') RETURNING id INTO ord_id;

        INSERT INTO order_items (order_id, product_id, quantity, price, subtotal, total)
        SELECT ord_id, id, 1, 999.00, 999.00, 999.00 FROM products WHERE sku = 'APPLE-IP15P';

        INSERT INTO payments (order_id, amount, status, method, transaction_id, gateway_name, created_by)
        VALUES (ord_id, 999.00, 'COMPLETED', 'STRIPE', 'ch_12345', 'Stripe', 'SYSTEM');

        INSERT INTO shipping (order_id, status, carrier, tracking_number, actual_delivery)
        VALUES (ord_id, 'DELIVERED', 'FedEx', 'FEDEX-9988', NOW());

        INSERT INTO order_status_history (order_id, status, remarks, created_by)
        VALUES (ord_id, 'DELIVERED', 'Package handed to resident', 'SYSTEM');
    END IF;
END $$;

-- 7. REVIEWS & NOTIFICATIONS
INSERT INTO reviews (product_id, user_id, rating, title, comment, verified_purchase)
SELECT p.id, u.id, 5, 'Perfect', 'Love this phone!', true 
FROM products p, users u WHERE p.sku = 'APPLE-IP15P' AND u.email = 'alice@example.com' ON CONFLICT DO NOTHING;

INSERT INTO notifications (user_id, type, subject, message, status)
SELECT id, 'ORDER', 'Order Delivered', 'Your order ORD-2026-001 has been delivered.', 'READ' 
FROM users WHERE email = 'alice@example.com' ON CONFLICT DO NOTHING;

-- 8. AUDIT & LOGIN
INSERT INTO login_history (user_id, ip_address, user_agent)
SELECT id, '192.168.1.1', 'Mozilla/5.0' FROM users WHERE email = 'admin@commercehub.local';

INSERT INTO audit_logs (user_id, action, entity_name, entity_id)
SELECT id, 'CREATE_PRODUCT', 'Product', (SELECT id FROM products WHERE sku='APPLE-IP15P')
FROM users WHERE email = 'admin@commercehub.local';