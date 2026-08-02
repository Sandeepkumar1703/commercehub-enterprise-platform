INSERT INTO roles (name, description)
VALUES (
    'ROLE_SUPER_ADMIN',
    'Super Administrator with unrestricted access'
)
ON CONFLICT (name) DO NOTHING;