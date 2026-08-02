-- ============================================================
-- Migration: V3
-- Description:
-- Create user_permissions table
--
-- Purpose:
-- Allows assigning direct permissions to individual users.
--
-- RBAC Structure:
--
-- users
--    |
--    | user_permissions
--    |
-- permissions
--
--
-- Example:
--
-- User:
--   seller1@commercehub.com
--
-- Direct Permission:
--   INVENTORY_DELETE
--
-- ============================================================


CREATE TABLE user_permissions
(
    -- User reference
    user_id BIGINT NOT NULL,


    -- Permission reference
    permission_id BIGINT NOT NULL,


    -- Timestamp when permission was assigned
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    -- Composite Primary Key
    -- One user cannot have duplicate same permission
    PRIMARY KEY(user_id, permission_id),



    -- Foreign Key:
    -- user_permissions.user_id
    --          |
    --          users.id
    CONSTRAINT fk_user_permission_user

    FOREIGN KEY(user_id)

    REFERENCES users(id)

    ON DELETE CASCADE,



    -- Foreign Key:
    -- user_permissions.permission_id
    --          |
    --          permissions.id
    CONSTRAINT fk_user_permission_permission

    FOREIGN KEY(permission_id)

    REFERENCES permissions(id)

    ON DELETE CASCADE

);