-- =====================================================
-- Migration: Update addresses table to enterprise schema
-- Description:
-- Adds missing address fields required for ecommerce
-- checkout, shipping, billing and future GPS integration
-- =====================================================


-- Add recipient information
ALTER TABLE addresses
ADD COLUMN full_name VARCHAR(150) NOT NULL DEFAULT '';

ALTER TABLE addresses
ADD COLUMN phone_number VARCHAR(20) NOT NULL DEFAULT '';


-- Add additional address details
ALTER TABLE addresses
ADD COLUMN address_line2 VARCHAR(255);

ALTER TABLE addresses
ADD COLUMN landmark VARCHAR(255);


-- Add geo-location support for future delivery tracking
ALTER TABLE addresses
ADD COLUMN latitude DECIMAL(10,7);

ALTER TABLE addresses
ADD COLUMN longitude DECIMAL(10,7);


-- Rename existing columns to enterprise naming convention

ALTER TABLE addresses
RENAME COLUMN street TO address_line1;


ALTER TABLE addresses
RENAME COLUMN zip_code TO postal_code;


ALTER TABLE addresses
RENAME COLUMN type TO address_type;