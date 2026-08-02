-- =========================================================
-- V14__alter_cart_item_quantity_type.sql
-- Change cart item quantity from INTEGER to BIGINT
-- =========================================================

ALTER TABLE cart_items
ALTER COLUMN quantity TYPE BIGINT;