-- Insert default permissions

INSERT INTO permissions(name, description)
VALUES
('ANALYTICS_VIEW', 'View analytics dashboard'),
('USER_MANAGE', 'Manage users'),
('PRODUCT_CREATE', 'Create products'),
('PRODUCT_UPDATE', 'Update products'),
('PRODUCT_DELETE', 'Delete products')
ON CONFLICT (name) DO NOTHING;



-- Assign analytics permission to admin

INSERT INTO role_permissions(role_id, permission_id)

SELECT
    r.id,
    p.id

FROM roles r,
     permissions p

WHERE r.name='ROLE_ADMIN'
AND p.name='ANALYTICS_VIEW'

ON CONFLICT DO NOTHING;



-- Assign analytics permission to vendor

INSERT INTO role_permissions(role_id, permission_id)

SELECT
    r.id,
    p.id

FROM roles r,
     permissions p

WHERE r.name='ROLE_VENDOR'
AND p.name='ANALYTICS_VIEW'

ON CONFLICT DO NOTHING;