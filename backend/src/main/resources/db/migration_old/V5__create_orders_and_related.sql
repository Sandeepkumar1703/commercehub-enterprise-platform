-- Flyway Migration V5
-- Create Orders and OrderItems tables
-- Created: July 22, 2026


CREATE TABLE IF NOT EXISTS orders (

    id BIGSERIAL PRIMARY KEY,


    user_id BIGINT NOT NULL
        REFERENCES users(id)
        ON DELETE RESTRICT,


    order_number VARCHAR(50)
        NOT NULL UNIQUE,


    total_amount DECIMAL(12,2)
        NOT NULL,


    tax_amount DECIMAL(10,2)
        DEFAULT 0.00,


    discount_amount DECIMAL(10,2)
        DEFAULT 0.00,


    shipping_cost DECIMAL(10,2)
        DEFAULT 0.00,


    status VARCHAR(50)
        DEFAULT 'PENDING',


    payment_status VARCHAR(50)
        DEFAULT 'UNPAID',


    shipping_address_id BIGINT
        REFERENCES addresses(id)
        ON DELETE SET NULL,


    coupon_id BIGINT
        REFERENCES coupons(id)
        ON DELETE SET NULL,


    notes TEXT,


    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT orders_total_positive
        CHECK(total_amount >= 0),


    CONSTRAINT orders_tax_positive
        CHECK(tax_amount >= 0),


    CONSTRAINT orders_discount_positive
        CHECK(discount_amount >=0),


    CONSTRAINT orders_shipping_positive
        CHECK(shipping_cost >=0)

);



CREATE INDEX IF NOT EXISTS idx_orders_user_id
ON orders(user_id);


CREATE INDEX IF NOT EXISTS idx_orders_order_number
ON orders(order_number);


CREATE INDEX IF NOT EXISTS idx_orders_status
ON orders(status);


CREATE INDEX IF NOT EXISTS idx_orders_payment_status
ON orders(payment_status);


CREATE INDEX IF NOT EXISTS idx_orders_created_at
ON orders(created_at);




CREATE TABLE IF NOT EXISTS order_items (

    id BIGSERIAL PRIMARY KEY,


    order_id BIGINT NOT NULL
        REFERENCES orders(id)
        ON DELETE CASCADE,


    product_id BIGINT NOT NULL
        REFERENCES products(id)
        ON DELETE RESTRICT,


    quantity BIGINT NOT NULL,


    price DECIMAL(10,2) NOT NULL,


    subtotal DECIMAL(12,2) NOT NULL,


    discount DECIMAL(10,2)
        DEFAULT 0.00,


    tax DECIMAL(10,2)
        DEFAULT 0.00,


    total DECIMAL(12,2)
        NOT NULL,


    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,



    CONSTRAINT order_item_quantity_positive
        CHECK(quantity > 0),


    CONSTRAINT order_item_price_positive
        CHECK(price >=0),


    CONSTRAINT order_item_total_check
        CHECK(total = subtotal - discount + tax)

);



CREATE INDEX IF NOT EXISTS idx_order_items_order_id
ON order_items(order_id);


CREATE INDEX IF NOT EXISTS idx_order_items_product_id
ON order_items(product_id);





COMMENT ON TABLE orders
IS 'Customer orders transaction records';


COMMENT ON TABLE order_items
IS 'Products inside customer orders';


COMMENT ON COLUMN order_items.price
IS 'Price snapshot at order creation time';


COMMENT ON COLUMN order_items.total
IS 'subtotal - discount + tax';