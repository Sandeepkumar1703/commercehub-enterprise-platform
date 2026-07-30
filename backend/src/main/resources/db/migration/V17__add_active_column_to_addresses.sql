-- =====================================================
-- Migration: Add soft delete support for addresses
-- =====================================================

ALTER TABLE addresses
ADD COLUMN active BOOLEAN NOT NULL DEFAULT TRUE;