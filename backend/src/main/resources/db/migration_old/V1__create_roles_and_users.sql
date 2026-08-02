-- Flyway Migration V1
-- Create Roles and Users tables
-- Created: July 22, 2026

-- ===================================================================
-- CREATE ROLES TABLE
-- ===================================================================
-- Purpose: Define application roles for authorization
-- Enum-like table storing role definitions

CREATE TABLE IF NOT EXISTS roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT roles_name_not_empty CHECK (name IS NOT NULL AND name != '')
);

-- Insert default roles
INSERT INTO roles (name, description) VALUES 
    ('ROLE_ADMIN', 'Administrator with full access'),
    ('ROLE_USER', 'Regular user with standard access'),
    ('ROLE_VENDOR', 'Vendor user for selling'),
    ('ROLE_MODERATOR', 'Moderator with review and content management')
ON CONFLICT (name) DO NOTHING;

-- Create index for role lookups
CREATE INDEX IF NOT EXISTS idx_roles_name ON roles(name);


-- ===================================================================
-- CREATE USERS TABLE
-- ===================================================================
-- Purpose: Store user account information
-- Central identity table with authentication details

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true NOT NULL,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT users_email_not_empty CHECK (email IS NOT NULL AND email != ''),
    CONSTRAINT users_password_not_empty CHECK (password IS NOT NULL AND password != '')
);

-- Create indexes for user queries
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);


-- ===================================================================
-- CREATE USER_ROLES JUNCTION TABLE
-- ===================================================================
-- Purpose: Many-to-many relationship between Users and Roles
-- Allows a user to have multiple roles

CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (user_id, role_id),
    UNIQUE(user_id, role_id)
);

-- Create indexes for role queries
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role_id ON user_roles(role_id);


-- ===================================================================
-- COMMENTS FOR DOCUMENTATION
-- ===================================================================

COMMENT ON TABLE roles IS 'Application roles for authorization and access control';
COMMENT ON COLUMN roles.id IS 'Unique role identifier';
COMMENT ON COLUMN roles.name IS 'Role name - ROLE_ADMIN, ROLE_USER, etc.';
COMMENT ON COLUMN roles.description IS 'Human-readable role description';

COMMENT ON TABLE users IS 'User account information and authentication details';
COMMENT ON COLUMN users.id IS 'Unique user identifier (Primary Key)';
COMMENT ON COLUMN users.email IS 'Unique email address - used for login';
COMMENT ON COLUMN users.password IS 'Encrypted password (bcrypt hash)';
COMMENT ON COLUMN users.is_active IS 'Account status - soft delete flag';
COMMENT ON COLUMN users.last_login IS 'Timestamp of last successful login';

COMMENT ON TABLE user_roles IS 'Junction table for many-to-many User-Role relationship';
COMMENT ON COLUMN user_roles.user_id IS 'Foreign key to users table';
COMMENT ON COLUMN user_roles.role_id IS 'Foreign key to roles table';
