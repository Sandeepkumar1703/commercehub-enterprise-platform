-- Flyway Migration V4
-- Create Coupons Table
-- Created: July 22, 2026


CREATE TABLE IF NOT EXISTS coupons (

    id BIGSERIAL PRIMARY KEY,

    code VARCHAR(50) NOT NULL UNIQUE,

    description TEXT,

    discount_type VARCHAR(50) NOT NULL,
    -- PERCENTAGE, FIXED_AMOUNT

    discount_value DECIMAL(10,2) NOT NULL,

    max_uses BIGINT,

    current_uses BIGINT DEFAULT 0,

    min_amount DECIMAL(10,2) DEFAULT 0.00,

    max_discount DECIMAL(10,2),

    valid_from TIMESTAMP NOT NULL,

    valid_until TIMESTAMP NOT NULL,

    active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT coupons_code_not_empty
        CHECK(code <> ''),

    CONSTRAINT coupons_discount_value_positive
        CHECK(discount_value > 0),

    CONSTRAINT coupons_current_uses_non_negative
        CHECK(current_uses >= 0),

    CONSTRAINT coupons_max_uses_positive
        CHECK(max_uses IS NULL OR max_uses > 0),

    CONSTRAINT coupons_usage_limit_check
        CHECK(max_uses IS NULL OR current_uses <= max_uses),

    CONSTRAINT coupons_valid_date_check
        CHECK(valid_until > valid_from),

    CONSTRAINT coupons_min_amount_non_negative
        CHECK(min_amount >= 0)
);



CREATE INDEX IF NOT EXISTS idx_coupons_code
ON coupons(code);


CREATE INDEX IF NOT EXISTS idx_coupons_active
ON coupons(active);


CREATE INDEX IF NOT EXISTS idx_coupons_valid_from
ON coupons(valid_from);


CREATE INDEX IF NOT EXISTS idx_coupons_valid_until
ON coupons(valid_until);



COMMENT ON TABLE coupons 
IS 'Promotional coupons and discount codes';


COMMENT ON COLUMN coupons.code
IS 'Coupon code entered by customer';


COMMENT ON COLUMN coupons.discount_type
IS 'PERCENTAGE or FIXED_AMOUNT';


COMMENT ON COLUMN coupons.max_uses
IS 'NULL means unlimited usage';


COMMENT ON COLUMN coupons.valid_from
IS 'Coupon activation timestamp';


COMMENT ON COLUMN coupons.valid_until
IS 'Coupon expiration timestamp';