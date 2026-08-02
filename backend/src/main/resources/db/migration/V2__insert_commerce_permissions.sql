INSERT INTO permissions
(name, description)
VALUES

('PRODUCT_VIEW','View products'),

('ORDER_CREATE','Create orders'),

('ORDER_CANCEL','Cancel orders'),

('CART_VIEW','View carts'),

('CART_CREATE','Create cart items'),

('CART_UPDATE','Update cart items'),

('CART_DELETE','Delete cart items'),

('INVENTORY_VIEW','View inventory'),

('INVENTORY_CREATE','Create inventory'),

('INVENTORY_UPDATE','Update inventory'),

('INVENTORY_DELETE','Delete inventory'),

('REVIEW_VIEW','View reviews'),

('REVIEW_CREATE','Create reviews'),

('REVIEW_UPDATE','Update reviews'),

('REVIEW_DELETE','Delete reviews'),

('REVIEW_MODERATE','Moderate reviews')

ON CONFLICT DO NOTHING;