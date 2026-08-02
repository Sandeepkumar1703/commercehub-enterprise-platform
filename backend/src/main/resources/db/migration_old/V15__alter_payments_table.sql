ALTER TABLE payments
ADD COLUMN gateway_name VARCHAR(50);

ALTER TABLE payments
ADD COLUMN gateway_response TEXT;

ALTER TABLE payments
ADD COLUMN refunded_at TIMESTAMP;

ALTER TABLE payments
ADD COLUMN cancelled_at TIMESTAMP;