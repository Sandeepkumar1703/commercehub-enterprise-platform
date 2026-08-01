INSERT INTO permissions(name, description)
VALUES

('ANALYTICS_VIEW','View analytics dashboard'),

('USER_VIEW','View users'),
('USER_CREATE','Create users'),
('USER_UPDATE','Update users'),
('USER_DELETE','Delete users'),

('PRODUCT_CREATE','Create products'),
('PRODUCT_UPDATE','Update products'),
('PRODUCT_DELETE','Delete products'),

('ORDER_VIEW','View orders'),
('ORDER_UPDATE','Update orders'),

('ROLE_MANAGE','Manage roles'),
('PERMISSION_MANAGE','Manage permissions')

ON CONFLICT(name) DO NOTHING;