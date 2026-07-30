import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
app.use(express.json());

// In-Memory Database Engine for CommerceHub Enterprise Platform
let users = [
  {
    id: 'usr_admin',
    firstName: 'System',
    lastName: 'Admin',
    email: 'admin@commercehub.com',
    phone: '+1 (555) 019-2831',
    enabled: true,
    roles: [{ id: 'r_admin', name: 'ROLE_ADMIN' as const }, { id: 'r_user', name: 'ROLE_USER' as const }],
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'usr_customer',
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 234-5678',
    enabled: true,
    roles: [{ id: 'r_user', name: 'ROLE_USER' as const }],
    createdAt: '2026-02-01T14:30:00Z',
    updatedAt: '2026-02-01T14:30:00Z',
  },
];

let addresses = [
  {
    id: 'addr_1',
    userId: 'usr_customer',
    street: '742 Evergreen Terrace',
    city: 'San Francisco',
    state: 'CA',
    country: 'United States',
    zipCode: '94107',
    isDefaultLanguage: true,
    createdAt: '2026-02-01T14:35:00Z',
  },
  {
    id: 'addr_2',
    userId: 'usr_customer',
    street: '100 Market St, Suite 400',
    city: 'San Francisco',
    state: 'CA',
    country: 'United States',
    zipCode: '94105',
    isDefaultLanguage: false,
    createdAt: '2026-03-10T09:15:00Z',
  },
];

let categories = [
  {
    id: 'cat_electronics',
    name: 'Electronics & Gadgets',
    description: 'High-performance audio, computing, and smart devices.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    itemCount: 8,
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'cat_apparel',
    name: 'Apparel & Fashion',
    description: 'Premium organic cotton wear and weather-resistant jackets.',
    imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=80',
    itemCount: 6,
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'cat_home',
    name: 'Home & Ergonomics',
    description: 'Workspace furniture, lighting, and artisanal ceramics.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80',
    itemCount: 5,
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'cat_fitness',
    name: 'Fitness & Outdoors',
    description: 'Smart trackers, recovery gear, and lightweight hydration bottles.',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    itemCount: 5,
    createdAt: '2026-01-01T00:00:00Z',
  },
];

let products: any[] = [
  {
    id: 'prod_1',
    categoryId: 'cat_electronics',
    categoryName: 'Electronics & Gadgets',
    name: 'AcoustiPro Wireless ANC Headphones',
    description: 'Adaptive active noise cancellation with 40-hour battery life, spatial audio drivers, and memory foam earcups.',
    price: 299.99,
    originalPrice: 349.99,
    stockQuantity: 45,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    ],
    rating: 4.8,
    reviewCount: 124,
    active: true,
    isFeatured: true,
    isFlashSale: true,
    specifications: {
      'Bluetooth Version': '5.3',
      'Battery Life': '40 Hours',
      'Noise Cancellation': 'Active (45dB drop)',
      'Weight': '250g',
    },
    createdAt: '2026-01-05T00:00:00Z',
    updatedAt: '2026-01-05T00:00:00Z',
  },
  {
    id: 'prod_2',
    categoryId: 'cat_electronics',
    categoryName: 'Electronics & Gadgets',
    name: 'PulseWatch Pro Smart Fitness Tracker',
    description: 'Always-on AMOLED retina display with ECG monitoring, dual-band GPS, and 100m water resistance.',
    price: 199.50,
    originalPrice: 229.00,
    stockQuantity: 28,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
    ],
    rating: 4.6,
    reviewCount: 89,
    active: true,
    isFeatured: true,
    isFlashSale: false,
    specifications: {
      Display: '1.4 inch AMOLED',
      Sensors: 'ECG, SpO2, Heart Rate, GPS',
      Waterproofing: '10 ATM',
    },
    createdAt: '2026-01-06T00:00:00Z',
    updatedAt: '2026-01-06T00:00:00Z',
  },
  {
    id: 'prod_3',
    categoryId: 'cat_home',
    categoryName: 'Home & Ergonomics',
    name: 'ErgoMotion Executive Mesh Chair',
    description: 'Dynamic lumbar support, 4D adjustable armrests, breathable Italian mesh, and polished aluminum base.',
    price: 549.00,
    originalPrice: 649.00,
    stockQuantity: 12,
    imageUrl: 'https://images.unsplash.com/photo-1580481072645-022f9a6d1270?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 56,
    active: true,
    isFeatured: true,
    isFlashSale: false,
    specifications: {
      Material: 'Breathable Italian Mesh',
      Recline: '135 Degrees',
      WeightCapacity: '300 lbs',
    },
    createdAt: '2026-01-10T00:00:00Z',
    updatedAt: '2026-01-10T00:00:00Z',
  },
  {
    id: 'prod_4',
    categoryId: 'cat_apparel',
    categoryName: 'Apparel & Fashion',
    name: 'Merino Tech All-Weather Jacket',
    description: 'Waterproof 3-layer breathable membrane with recycled Merino wool lining and magnet-closure pockets.',
    price: 180.00,
    originalPrice: 220.00,
    stockQuantity: 35,
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewCount: 42,
    active: true,
    isFeatured: false,
    isFlashSale: true,
    specifications: {
      Waterproofing: '20,000mm',
      Lining: '100% Merino Wool',
    },
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-01-15T00:00:00Z',
  },
  {
    id: 'prod_5',
    categoryId: 'cat_fitness',
    categoryName: 'Fitness & Outdoors',
    name: 'ThermaGrip Insulated Stainless Bottle (1L)',
    description: 'Vacuum insulated double-wall stainless steel keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 39.99,
    originalPrice: 49.99,
    stockQuantity: 90,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 210,
    active: true,
    isFeatured: true,
    isFlashSale: false,
    specifications: {
      Capacity: '1000 ml',
      Material: '18/8 Food-grade Stainless Steel',
    },
    createdAt: '2026-01-18T00:00:00Z',
    updatedAt: '2026-01-18T00:00:00Z',
  },
  {
    id: 'prod_6',
    categoryId: 'cat_electronics',
    categoryName: 'Electronics & Gadgets',
    name: 'OmniPad Ultra Wireless Keyboard & Trackpad',
    description: 'Low-profile mechanical switches, customizable RGB backlighting, and multi-device Bluetooth switching.',
    price: 149.99,
    originalPrice: 179.99,
    stockQuantity: 4, // Low stock for admin warning
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviewCount: 38,
    active: true,
    isFeatured: false,
    isFlashSale: false,
    specifications: {
      SwitchType: 'Linear Low Profile',
      Connectivity: 'Bluetooth 5.2 / USB-C',
    },
    createdAt: '2026-01-20T00:00:00Z',
    updatedAt: '2026-01-20T00:00:00Z',
  },
];

let carts: Record<string, any[]> = {
  usr_customer: [
    {
      id: 'ci_1',
      cartId: 'cart_customer',
      productId: 'prod_1',
      product: products[0],
      quantity: 1,
      price: 299.99,
    },
  ],
};

let wishlists: Record<string, any[]> = {
  usr_customer: [
    {
      id: 'wl_1',
      userId: 'usr_customer',
      productId: 'prod_2',
      product: products[1],
      createdAt: '2026-02-05T10:00:00Z',
    },
  ],
};

let coupons = [
  {
    id: 'coup_welcome10',
    code: 'WELCOME10',
    discountType: 'PERCENTAGE' as const,
    discountValue: 10,
    minOrderValue: 50,
    maxDiscount: 50,
    expiryDate: '2026-12-31T23:59:59Z',
    active: true,
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'coup_save25',
    code: 'SAVE25',
    discountType: 'FIXED' as const,
    discountValue: 25,
    minOrderValue: 150,
    expiryDate: '2026-12-31T23:59:59Z',
    active: true,
    createdAt: '2026-01-01T00:00:00Z',
  },
];

let orders: any[] = [
  {
    id: 'ORD-2026-8841',
    userId: 'usr_customer',
    addressId: 'addr_1',
    address: addresses[0],
    orderStatus: 'DELIVERED' as const,
    items: [
      {
        id: 'oi_1',
        orderId: 'ORD-2026-8841',
        productId: 'prod_2',
        productName: 'PulseWatch Pro Smart Fitness Tracker',
        productImage: products[1].imageUrl,
        quantity: 1,
        price: 199.50,
      },
    ],
    subtotal: 199.50,
    discount: 10.00,
    tax: 15.96,
    shippingFee: 0.00,
    totalAmount: 205.46,
    paymentMethod: 'CARD' as const,
    paymentStatus: 'SUCCESS' as const,
    trackingNumber: 'TRK-99201481',
    createdAt: '2026-07-20T14:20:00Z',
    updatedAt: '2026-07-22T16:00:00Z',
  },
  {
    id: 'ORD-2026-9012',
    userId: 'usr_customer',
    addressId: 'addr_1',
    address: addresses[0],
    orderStatus: 'SHIPPED' as const,
    items: [
      {
        id: 'oi_2',
        orderId: 'ORD-2026-9012',
        productId: 'prod_1',
        productName: 'AcoustiPro Wireless ANC Headphones',
        productImage: products[0].imageUrl,
        quantity: 1,
        price: 299.99,
      },
    ],
    subtotal: 299.99,
    discount: 25.00,
    tax: 24.00,
    shippingFee: 0.00,
    totalAmount: 298.99,
    paymentMethod: 'CARD' as const,
    paymentStatus: 'SUCCESS' as const,
    trackingNumber: 'TRK-99482012',
    createdAt: '2026-07-26T11:10:00Z',
    updatedAt: '2026-07-27T08:30:00Z',
  },
];

let shippings: Record<string, any> = {
  'ORD-2026-8841': {
    id: 'shp_1',
    orderId: 'ORD-2026-8841',
    trackingNumber: 'TRK-99201481',
    carrier: 'FedEx Express',
    shippingStatus: 'DELIVERED',
    shippedDate: '2026-07-21T09:00:00Z',
    deliveredDate: '2026-07-22T16:00:00Z',
    estimatedDelivery: '2026-07-22',
    activities: [
      { status: 'Order Placed', location: 'CommerceHub Fulfillment', timestamp: '2026-07-20 14:20', completed: true },
      { status: 'Packed & Labeled', location: 'San Francisco Hub', timestamp: '2026-07-20 18:45', completed: true },
      { status: 'In Transit', location: 'Oakland Sorting Center', timestamp: '2026-07-21 09:00', completed: true },
      { status: 'Out for Delivery', location: 'San Francisco CA', timestamp: '2026-07-22 08:30', completed: true },
      { status: 'Delivered', location: 'Front Porch', timestamp: '2026-07-22 16:00', completed: true },
    ],
  },
  'ORD-2026-9012': {
    id: 'shp_2',
    orderId: 'ORD-2026-9012',
    trackingNumber: 'TRK-99482012',
    carrier: 'UPS Ground',
    shippingStatus: 'SHIPPED',
    shippedDate: '2026-07-27T08:30:00Z',
    estimatedDelivery: '2026-07-29',
    activities: [
      { status: 'Order Placed', location: 'CommerceHub Fulfillment', timestamp: '2026-07-26 11:10', completed: true },
      { status: 'Packed & Labeled', location: 'San Francisco Hub', timestamp: '2026-07-26 16:20', completed: true },
      { status: 'In Transit', location: 'Sacramento Depot', timestamp: '2026-07-27 08:30', completed: true },
      { status: 'Out for Delivery', location: 'Destination City', timestamp: 'Pending', completed: false },
      { status: 'Delivered', location: 'Customer Address', timestamp: 'Pending', completed: false },
    ],
  },
};

let reviews = [
  {
    id: 'rev_1',
    userId: 'usr_customer',
    userName: 'Alex Morgan',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    productId: 'prod_1',
    rating: 5,
    comment: 'Exceptional active noise cancellation! Took it on a long flight and could barely hear any cabin noise. Audio clarity is top notch.',
    createdAt: '2026-07-23T10:15:00Z',
  },
  {
    id: 'rev_2',
    userId: 'usr_customer',
    userName: 'David Miller',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    productId: 'prod_1',
    rating: 4,
    comment: 'Great build quality and very comfortable memory foam cushions. Battery life easily lasts 35-40 hours.',
    createdAt: '2026-07-24T18:30:00Z',
  },
];

let payments = [
  {
    id: 'pay_1',
    orderId: 'ORD-2026-8841',
    paymentMethod: 'CARD' as const,
    paymentStatus: 'SUCCESS' as const,
    transactionId: 'TXN-99820148',
    amount: 205.46,
    createdAt: '2026-07-20T14:21:00Z',
  },
  {
    id: 'pay_2',
    orderId: 'ORD-2026-9012',
    paymentMethod: 'CARD' as const,
    paymentStatus: 'SUCCESS' as const,
    transactionId: 'TXN-99930219',
    amount: 298.99,
    createdAt: '2026-07-26T11:11:00Z',
  },
];

// Auth middleware helper
const getAuthUser = (req: express.Request) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return users[1]; // Default to Alex Morgan for smooth demo testing if token unparsed
  }
  const token = authHeader.substring(7);
  if (token.includes('admin')) {
    return users[0];
  }
  return users[1];
};

/* =========================================================================
   1. AUTH ENDPOINTS
   ========================================================================= */
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email.toLowerCase() === (email || '').toLowerCase());
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials. User not found.' });
  }

  const tokenPrefix = user.roles.some((r) => r.name === 'ROLE_ADMIN') ? 'admin' : 'customer';
  const accessToken = `jwt_access_${tokenPrefix}_${Date.now()}`;
  const refreshToken = `jwt_refresh_${tokenPrefix}_${Date.now()}`;

  res.json({
    accessToken,
    refreshToken,
    user,
  });
});

app.post('/api/auth/register', (req, res) => {
  const { firstName, lastName, email, phone } = req.body;
  if (users.some((u) => u.email === email)) {
    return res.status(400).json({ message: 'Email address is already registered.' });
  }
  const newUser = {
    id: `usr_${Date.now()}`,
    firstName: firstName || 'New',
    lastName: lastName || 'User',
    email,
    phone: phone || '',
    enabled: true,
    roles: [{ id: 'r_user', name: 'ROLE_USER' as const }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  users.push(newUser);
  res.status(201).json({
    accessToken: `jwt_access_customer_${Date.now()}`,
    refreshToken: `jwt_refresh_customer_${Date.now()}`,
    user: newUser,
  });
});

app.post('/api/auth/refresh-token', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token is required.' });
  }
  res.json({
    accessToken: `jwt_access_refreshed_${Date.now()}`,
    refreshToken: `jwt_refresh_refreshed_${Date.now()}`,
  });
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

app.get('/api/auth/verify-email', (req, res) => {
  res.json({ message: 'Email verified successfully.' });
});

app.post('/api/auth/resend-verification', (req, res) => {
  res.json({ message: 'Verification email resent.' });
});

app.post('/api/auth/forgot-password', (req, res) => {
  res.json({ message: 'Password reset instructions sent to your email.' });
});

app.post('/api/auth/reset-password', (req, res) => {
  res.json({ message: 'Password reset successful.' });
});

app.put('/api/auth/change-password', (req, res) => {
  res.json({ message: 'Password updated successfully.' });
});

/* =========================================================================
   2. USER ENDPOINTS
   ========================================================================= */
app.get('/api/users/profile', (req, res) => {
  const user = getAuthUser(req);
  res.json(user);
});

app.put('/api/users/profile', (req, res) => {
  const user = getAuthUser(req);
  const { firstName, lastName, phone } = req.body;
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (phone) user.phone = phone;
  user.updatedAt = new Date().toISOString();
  res.json(user);
});

app.delete('/api/users/account', (req, res) => {
  res.json({ message: 'Account closed successfully.' });
});

app.get('/api/users', (req, res) => {
  res.json({
    content: users,
    page: 0,
    size: 10,
    totalElements: users.length,
    totalPages: 1,
    last: true,
  });
});

/* =========================================================================
   3. ADDRESS ENDPOINTS
   ========================================================================= */
app.get('/api/addresses/default', (req, res) => {
  const user = getAuthUser(req);
  const userAddrs = addresses.filter((a) => a.userId === user.id);
  const def = userAddrs.find((a) => a.isDefaultLanguage) || userAddrs[0];
  if (!def) return res.status(404).json({ message: 'No default address found' });
  res.json(def);
});

app.get('/api/addresses', (req, res) => {
  const user = getAuthUser(req);
  const userAddrs = addresses.filter((a) => a.userId === user.id);
  res.json(userAddrs);
});

app.post('/api/addresses', (req, res) => {
  const user = getAuthUser(req);
  const { street, city, state, country, zipCode, isDefaultLanguage } = req.body;
  if (isDefaultLanguage) {
    addresses.forEach((a) => {
      if (a.userId === user.id) a.isDefaultLanguage = false;
    });
  }
  const newAddr = {
    id: `addr_${Date.now()}`,
    userId: user.id,
    street,
    city,
    state,
    country: country || 'United States',
    zipCode,
    isDefaultLanguage: !!isDefaultLanguage || addresses.filter((a) => a.userId === user.id).length === 0,
    createdAt: new Date().toISOString(),
  };
  addresses.push(newAddr);
  res.status(201).json(newAddr);
});

app.get('/api/addresses/:id', (req, res) => {
  const addr = addresses.find((a) => a.id === req.params.id);
  if (!addr) return res.status(404).json({ message: 'Address not found' });
  res.json(addr);
});

app.put('/api/addresses/:addressId/default', (req, res) => {
  const user = getAuthUser(req);
  const addr = addresses.find((a) => a.id === req.params.addressId);
  if (!addr) return res.status(404).json({ message: 'Address not found' });
  addresses.forEach((a) => {
    if (a.userId === user.id) a.isDefaultLanguage = false;
  });
  addr.isDefaultLanguage = true;
  res.json(addr);
});

app.put('/api/addresses/:id', (req, res) => {
  const addr = addresses.find((a) => a.id === req.params.id);
  if (!addr) return res.status(404).json({ message: 'Address not found' });
  const { street, city, state, country, zipCode, isDefaultLanguage } = req.body;
  if (isDefaultLanguage) {
    addresses.forEach((a) => {
      if (a.userId === addr.userId) a.isDefaultLanguage = false;
    });
  }
  if (street) addr.street = street;
  if (city) addr.city = city;
  if (state) addr.state = state;
  if (country) addr.country = country;
  if (zipCode) addr.zipCode = zipCode;
  if (isDefaultLanguage !== undefined) addr.isDefaultLanguage = isDefaultLanguage;
  res.json(addr);
});

app.delete('/api/addresses/:id', (req, res) => {
  addresses = addresses.filter((a) => a.id !== req.params.id);
  res.json({ message: 'Address deleted' });
});

/* =========================================================================
   4. PRODUCT & CATEGORY ENDPOINTS
   ========================================================================= */
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.get('/api/categories/:id', (req, res) => {
  const cat = categories.find((c) => c.id === req.params.id);
  if (!cat) return res.status(404).json({ message: 'Category not found' });
  res.json(cat);
});

app.post('/api/categories', (req, res) => {
  const { name, description, imageUrl } = req.body;
  const newCat = {
    id: `cat_${Date.now()}`,
    name,
    description: description || '',
    imageUrl,
    itemCount: 0,
    createdAt: new Date().toISOString(),
  };
  categories.push(newCat);
  res.status(201).json(newCat);
});

app.put('/api/categories/:id', (req, res) => {
  const cat = categories.find((c) => c.id === req.params.id);
  if (!cat) return res.status(404).json({ message: 'Category not found' });
  Object.assign(cat, req.body);
  res.json(cat);
});

app.delete('/api/categories/:id', (req, res) => {
  categories = categories.filter((c) => c.id !== req.params.id);
  res.json({ message: 'Category deleted' });
});

app.get('/api/products/search', (req, res) => {
  const keyword = ((req.query.keyword as string) || '').toLowerCase();
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(keyword) ||
      p.description.toLowerCase().includes(keyword) ||
      p.categoryName?.toLowerCase().includes(keyword)
  );
  res.json(filtered);
});

app.get('/api/products/filter/price', (req, res) => {
  const { min, max } = req.query;
  const minVal = min ? parseFloat(min as string) : 0;
  const maxVal = max ? parseFloat(max as string) : Infinity;
  const filtered = products.filter((p) => p.price >= minVal && p.price <= maxVal);
  res.json(filtered);
});

app.get('/api/products/filter/out-of-stock', (req, res) => {
  const filtered = products.filter((p) => p.stockQuantity === 0);
  res.json(filtered);
});

app.get('/api/products/filter/in-stock', (req, res) => {
  const filtered = products.filter((p) => p.stockQuantity > 0);
  res.json(filtered);
});

app.get('/api/products/filter/category/:categoryId', (req, res) => {
  const filtered = products.filter((p) => p.categoryId === req.params.categoryId);
  res.json(filtered);
});

app.post('/api/products/bulk', (req, res) => {
  const newItems = Array.isArray(req.body) ? req.body : [];
  const created: any[] = [];
  newItems.forEach((item: any) => {
    const category = categories.find((c) => c.id === item.categoryId);
    const newProd = {
      id: `prod_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      categoryId: item.categoryId || 'cat_electronics',
      categoryName: category?.name || 'General',
      name: item.name || 'Bulk Item',
      description: item.description || '',
      price: parseFloat(item.price || 0),
      originalPrice: parseFloat(item.price || 0),
      stockQuantity: parseInt(item.stockQuantity || 10, 10),
      imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      rating: 5.0,
      reviewCount: 0,
      active: true,
      isFeatured: false,
      isFlashSale: false,
      specifications: item.specifications || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    products.unshift(newProd);
    created.push(newProd);
  });
  res.status(201).json(created);
});

app.post('/api/products/:productId/image', (req, res) => {
  const prod = products.find((p) => p.id === req.params.productId);
  if (!prod) return res.status(404).json({ message: 'Product not found' });
  const { imageUrl } = req.body;
  if (imageUrl) {
    prod.imageUrl = imageUrl;
    prod.updatedAt = new Date().toISOString();
  }
  res.json(prod);
});

app.get('/api/products', (req, res) => {
  const { page = '0', size = '12', categoryId, sort, minPrice, maxPrice, minRating, inStock } = req.query;
  let list = [...products];

  if (categoryId) {
    list = list.filter((p) => p.categoryId === categoryId);
  }
  if (minPrice) {
    list = list.filter((p) => p.price >= parseFloat(minPrice as string));
  }
  if (maxPrice) {
    list = list.filter((p) => p.price <= parseFloat(maxPrice as string));
  }
  if (minRating) {
    list = list.filter((p) => p.rating >= parseFloat(minRating as string));
  }
  if (inStock === 'true') {
    list = list.filter((p) => p.stockQuantity > 0);
  }

  if (sort === 'price_asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'newest') {
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  const pageNum = parseInt(page as string, 10);
  const sizeNum = parseInt(size as string, 10);
  const start = pageNum * sizeNum;
  const paginated = list.slice(start, start + sizeNum);
  const totalPages = Math.ceil(list.length / sizeNum) || 1;

  res.json({
    content: paginated,
    page: pageNum,
    size: sizeNum,
    totalElements: list.length,
    totalPages,
    last: pageNum >= totalPages - 1,
  });
});

app.get('/api/products/:id', (req, res) => {
  const prod = products.find((p) => p.id === req.params.id);
  if (!prod) return res.status(404).json({ message: 'Product not found' });
  res.json(prod);
});

app.post('/api/products', (req, res) => {
  const { categoryId, name, description, price, stockQuantity, imageUrl, specifications } = req.body;
  const category = categories.find((c) => c.id === categoryId);
  const newProd = {
    id: `prod_${Date.now()}`,
    categoryId,
    categoryName: category?.name || 'General',
    name,
    description: description || '',
    price: parseFloat(price),
    originalPrice: parseFloat(price),
    stockQuantity: parseInt(stockQuantity, 10),
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewCount: 0,
    active: true,
    isFeatured: false,
    isFlashSale: false,
    specifications: specifications || {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  products.unshift(newProd);
  res.status(201).json(newProd);
});

app.put('/api/products/:id', (req, res) => {
  const prod = products.find((p) => p.id === req.params.id);
  if (!prod) return res.status(404).json({ message: 'Product not found' });
  Object.assign(prod, req.body, { updatedAt: new Date().toISOString() });
  res.json(prod);
});

app.delete('/api/products/:id', (req, res) => {
  products = products.filter((p) => p.id !== req.params.id);
  res.json({ message: 'Product deleted' });
});

/* =========================================================================
   5. INVENTORY ENDPOINTS
   ========================================================================= */
app.get('/api/inventory/product/:productId', (req, res) => {
  const prod = products.find((p) => p.id === req.params.productId);
  if (!prod) return res.status(404).json({ message: 'Product not found' });
  res.json({
    id: `inv_${prod.id}`,
    productId: prod.id,
    quantity: prod.stockQuantity,
    reservedQuantity: 2,
    updatedAt: prod.updatedAt,
  });
});

app.get('/api/inventory/:productId', (req, res) => {
  const prod = products.find((p) => p.id === req.params.productId);
  if (!prod) return res.status(404).json({ message: 'Product not found' });
  res.json({
    id: `inv_${prod.id}`,
    productId: prod.id,
    quantity: prod.stockQuantity,
    reservedQuantity: 2,
    updatedAt: prod.updatedAt,
  });
});

app.put('/api/inventory/product/:productId', (req, res) => {
  const prod = products.find((p) => p.id === req.params.productId);
  if (!prod) return res.status(404).json({ message: 'Product not found' });
  const { quantity } = req.body;
  prod.stockQuantity = parseInt(quantity, 10);
  prod.updatedAt = new Date().toISOString();
  res.json({
    id: `inv_${prod.id}`,
    productId: prod.id,
    quantity: prod.stockQuantity,
    reservedQuantity: 0,
    updatedAt: prod.updatedAt,
  });
});

/* =========================================================================
   6. CART ENDPOINTS
   ========================================================================= */
const calculateCart = (userId: string, couponCode?: string) => {
  const items = carts[userId] || [];
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discount = 0;
  if (couponCode) {
    const coupon = coupons.find((c) => c.code === couponCode && c.active);
    if (coupon && subtotal >= coupon.minOrderValue) {
      if (coupon.discountType === 'PERCENTAGE') {
        discount = (subtotal * coupon.discountValue) / 100;
        if (coupon.maxDiscount && discount > coupon.maxDiscount) {
          discount = coupon.maxDiscount;
        }
      } else {
        discount = coupon.discountValue;
      }
    }
  }

  const tax = (subtotal - discount) * 0.08;
  const shippingFee = subtotal > 100 || subtotal === 0 ? 0 : 15.00;
  const total = Math.max(0, subtotal - discount + tax + shippingFee);

  return {
    id: `cart_${userId}`,
    userId,
    items,
    subtotal,
    discount,
    tax,
    shippingFee,
    couponCode,
    total,
    createdAt: new Date().toISOString(),
  };
};

app.get('/api/cart', (req, res) => {
  const user = getAuthUser(req);
  const cart = calculateCart(user.id);
  res.json(cart);
});

app.post('/api/cart/items', (req, res) => {
  const user = getAuthUser(req);
  const { productId, quantity = 1 } = req.body;
  const product = products.find((p) => p.id === productId);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  if (!carts[user.id]) carts[user.id] = [];

  const existing = carts[user.id].find((item) => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    carts[user.id].push({
      id: `ci_${Date.now()}`,
      cartId: `cart_${user.id}`,
      productId,
      product,
      quantity,
      price: product.price,
    });
  }

  res.json(calculateCart(user.id));
});

app.post('/api/cart/:productId', (req, res) => {
  const user = getAuthUser(req);
  const productId = req.params.productId;
  const quantity = req.body?.quantity || 1;
  const product = products.find((p) => p.id === productId);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  if (!carts[user.id]) carts[user.id] = [];

  const existing = carts[user.id].find((item) => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    carts[user.id].push({
      id: `ci_${Date.now()}`,
      cartId: `cart_${user.id}`,
      productId,
      product,
      quantity,
      price: product.price,
    });
  }

  res.json(calculateCart(user.id));
});

app.put('/api/cart/items/:itemId', (req, res) => {
  const user = getAuthUser(req);
  const { quantity } = req.body;
  const userCart = carts[user.id] || [];
  const item = userCart.find((i) => i.id === req.params.itemId);

  if (item) {
    if (quantity <= 0) {
      carts[user.id] = userCart.filter((i) => i.id !== req.params.itemId);
    } else {
      item.quantity = quantity;
    }
  }

  res.json(calculateCart(user.id));
});

app.delete('/api/cart/items/:itemId', (req, res) => {
  const user = getAuthUser(req);
  if (carts[user.id]) {
    carts[user.id] = carts[user.id].filter((i) => i.id !== req.params.itemId);
  }
  res.json(calculateCart(user.id));
});

app.delete('/api/cart', (req, res) => {
  const user = getAuthUser(req);
  carts[user.id] = [];
  res.json(calculateCart(user.id));
});

/* =========================================================================
   7. WISHLIST ENDPOINTS
   ========================================================================= */
app.get('/api/wishlist', (req, res) => {
  const user = getAuthUser(req);
  res.json(wishlists[user.id] || []);
});

app.post('/api/wishlist/:productId', (req, res) => {
  const user = getAuthUser(req);
  const prod = products.find((p) => p.id === req.params.productId);
  if (!prod) return res.status(404).json({ message: 'Product not found' });

  if (!wishlists[user.id]) wishlists[user.id] = [];
  if (!wishlists[user.id].some((w) => w.productId === req.params.productId)) {
    wishlists[user.id].push({
      id: `wl_${Date.now()}`,
      userId: user.id,
      productId: prod.id,
      product: prod,
      createdAt: new Date().toISOString(),
    });
  }
  res.json(wishlists[user.id]);
});

app.delete('/api/wishlist/:productId', (req, res) => {
  const user = getAuthUser(req);
  if (wishlists[user.id]) {
    wishlists[user.id] = wishlists[user.id].filter((w) => w.productId !== req.params.productId);
  }
  res.json(wishlists[user.id] || []);
});

/* =========================================================================
   8. COUPON ENDPOINTS
   ========================================================================= */
app.get('/api/coupons', (req, res) => {
  res.json(coupons);
});

app.post('/api/coupons/validate', (req, res) => {
  const { code, cartSubtotal = 0 } = req.body;
  const coupon = coupons.find((c) => c.code.toUpperCase() === (code || '').toUpperCase() && c.active);

  if (!coupon) {
    return res.status(400).json({ valid: false, message: 'Invalid or expired coupon code.' });
  }

  if (cartSubtotal < coupon.minOrderValue) {
    return res.status(400).json({
      valid: false,
      message: `Minimum order value of $${coupon.minOrderValue} required for coupon ${coupon.code}.`,
    });
  }

  res.json({
    valid: true,
    coupon,
    message: 'Coupon code applied successfully!',
  });
});

app.post('/api/coupons', (req, res) => {
  const { code, discountType, discountValue, minOrderValue, maxDiscount, expiryDate } = req.body;
  const newCoupon = {
    id: `coup_${Date.now()}`,
    code: code.toUpperCase(),
    discountType,
    discountValue: parseFloat(discountValue),
    minOrderValue: parseFloat(minOrderValue || '0'),
    maxDiscount: maxDiscount ? parseFloat(maxDiscount) : undefined,
    expiryDate: expiryDate || '2026-12-31T23:59:59Z',
    active: true,
    createdAt: new Date().toISOString(),
  };
  coupons.unshift(newCoupon);
  res.status(201).json(newCoupon);
});

app.put('/api/coupons/:id', (req, res) => {
  const coupon = coupons.find((c) => c.id === req.params.id);
  if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
  Object.assign(coupon, req.body);
  res.json(coupon);
});

app.delete('/api/coupons/:id', (req, res) => {
  coupons = coupons.filter((c) => c.id !== req.params.id);
  res.json({ message: 'Coupon deleted' });
});

/* =========================================================================
   9. ORDER & PAYMENT & SHIPPING ENDPOINTS
   ========================================================================= */
app.post('/api/orders', (req, res) => {
  const user = getAuthUser(req);
  const { addressId, paymentMethod, couponCode } = req.body;
  const userCart = carts[user.id] || [];

  if (userCart.length === 0) {
    return res.status(400).json({ message: 'Cart is empty.' });
  }

  const selectedAddr = addresses.find((a) => a.id === addressId) || addresses[0];
  const calculated = calculateCart(user.id, couponCode);

  const newOrder = {
    id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    userId: user.id,
    addressId: selectedAddr.id,
    address: selectedAddr,
    orderStatus: 'PLACED' as const,
    items: userCart.map((ci) => ({
      id: `oi_${Date.now()}_${ci.productId}`,
      orderId: '',
      productId: ci.productId,
      productName: ci.product.name,
      productImage: ci.product.imageUrl,
      quantity: ci.quantity,
      price: ci.price,
    })),
    subtotal: calculated.subtotal,
    discount: calculated.discount,
    tax: calculated.tax,
    shippingFee: calculated.shippingFee,
    totalAmount: calculated.total,
    paymentMethod: paymentMethod || 'CARD',
    paymentStatus: paymentMethod === 'COD' ? ('PENDING' as const) : ('SUCCESS' as const),
    trackingNumber: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  newOrder.items.forEach((item) => (item.orderId = newOrder.id));
  orders.unshift(newOrder);

  // Clear cart
  carts[user.id] = [];

  // Setup initial shipping entry
  shippings[newOrder.id] = {
    id: `shp_${newOrder.id}`,
    orderId: newOrder.id,
    trackingNumber: newOrder.trackingNumber,
    carrier: 'CommerceHub Express Logistics',
    shippingStatus: 'PLACED',
    shippedDate: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    activities: [
      { status: 'Order Placed', location: 'CommerceHub Platform', timestamp: new Date().toLocaleString(), completed: true },
      { status: 'Packed & Labeled', location: 'Fulfillment Center', timestamp: 'Pending', completed: false },
      { status: 'In Transit', location: 'Regional Hub', timestamp: 'Pending', completed: false },
      { status: 'Out for Delivery', location: 'Local Depot', timestamp: 'Pending', completed: false },
      { status: 'Delivered', location: 'Customer Address', timestamp: 'Pending', completed: false },
    ],
  };

  res.status(201).json(newOrder);
});

app.get('/api/orders/my-orders', (req, res) => {
  const user = getAuthUser(req);
  const myOrders = orders.filter((o) => o.userId === user.id);
  res.json(myOrders);
});

app.get('/api/orders/:orderId', (req, res) => {
  const order = orders.find((o) => o.id === req.params.orderId);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

app.put('/api/orders/:orderId/cancel', (req, res) => {
  const order = orders.find((o) => o.id === req.params.orderId);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.orderStatus = 'CANCELLED';
  order.updatedAt = new Date().toISOString();
  res.json(order);
});

app.put('/api/orders/:orderId/status', (req, res) => {
  const order = orders.find((o) => o.id === req.params.orderId);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  const { status } = req.body;
  order.orderStatus = status;
  order.updatedAt = new Date().toISOString();

  if (shippings[order.id]) {
    shippings[order.id].shippingStatus = status;
  }
  res.json(order);
});

app.get('/api/shipping/:orderId', (req, res) => {
  const ship = shippings[req.params.orderId];
  if (!ship) {
    return res.json({
      id: `shp_default`,
      orderId: req.params.orderId,
      trackingNumber: 'TRK-IN_PROGRESS',
      carrier: 'Standard Courier',
      shippingStatus: 'PROCESSING',
      estimatedDelivery: '3-5 Business Days',
      activities: [
        { status: 'Order Placed', location: 'CommerceHub Hub', timestamp: new Date().toLocaleString(), completed: true },
      ],
    });
  }
  res.json(ship);
});

app.put('/api/shipping/:orderId', (req, res) => {
  const ship = shippings[req.params.orderId];
  if (!ship) return res.status(404).json({ message: 'Shipping info not found' });
  Object.assign(ship, req.body);
  res.json(ship);
});

app.post('/api/payments', (req, res) => {
  const { orderId, paymentMethod, amount } = req.body;
  const newPay = {
    id: `pay_${Date.now()}`,
    orderId,
    paymentMethod,
    paymentStatus: 'SUCCESS' as const,
    transactionId: `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
    amount,
    createdAt: new Date().toISOString(),
  };
  payments.push(newPay);
  res.status(201).json(newPay);
});

app.post('/api/payments/verify', (req, res) => {
  res.json({ verified: true, message: 'Payment verified successfully.' });
});

app.get('/api/payments', (req, res) => {
  res.json(payments);
});

app.get('/api/payments/history', (req, res) => {
  res.json(payments);
});

app.get('/api/payments/transaction/:transactionId', (req, res) => {
  const pay = payments.find((p) => p.transactionId === req.params.transactionId);
  if (!pay) return res.status(404).json({ message: 'Payment transaction not found' });
  res.json(pay);
});

app.get('/api/payments/status/:status', (req, res) => {
  const filtered = payments.filter((p) => p.paymentStatus.toUpperCase() === req.params.status.toUpperCase());
  res.json(filtered);
});

app.get('/api/payments/order/:orderId', (req, res) => {
  const pay = payments.find((p) => p.orderId === req.params.orderId);
  if (!pay) return res.status(404).json({ message: 'Payment for order not found' });
  res.json(pay);
});

app.get('/api/payments/:paymentId', (req, res) => {
  const pay = payments.find((p) => p.id === req.params.paymentId);
  if (!pay) return res.status(404).json({ message: 'Payment not found' });
  res.json(pay);
});

app.put('/api/payments/:paymentId/success', (req, res) => {
  const pay = payments.find((p) => p.id === req.params.paymentId);
  if (!pay) return res.status(404).json({ message: 'Payment not found' });
  (pay as any).paymentStatus = 'SUCCESS';
  res.json(pay);
});

app.put('/api/payments/:paymentId/retry', (req, res) => {
  const pay = payments.find((p) => p.id === req.params.paymentId);
  if (!pay) return res.status(404).json({ message: 'Payment not found' });
  (pay as any).paymentStatus = 'SUCCESS';
  res.json(pay);
});

app.put('/api/payments/:paymentId/refund', (req, res) => {
  const pay = payments.find((p) => p.id === req.params.paymentId);
  if (!pay) return res.status(404).json({ message: 'Payment not found' });
  (pay as any).paymentStatus = 'REFUNDED';
  res.json(pay);
});

app.put('/api/payments/:paymentId/failed', (req, res) => {
  const pay = payments.find((p) => p.id === req.params.paymentId);
  if (!pay) return res.status(404).json({ message: 'Payment not found' });
  (pay as any).paymentStatus = 'FAILED';
  res.json(pay);
});

app.put('/api/payments/:paymentId/cancel', (req, res) => {
  const pay = payments.find((p) => p.id === req.params.paymentId);
  if (!pay) return res.status(404).json({ message: 'Payment not found' });
  (pay as any).paymentStatus = 'CANCELLED';
  res.json(pay);
});

/* =========================================================================
   ROLE ENDPOINTS
   ========================================================================= */
let roles = [
  { id: 'r_admin', name: 'ROLE_ADMIN', description: 'Full administrative permissions' },
  { id: 'r_user', name: 'ROLE_USER', description: 'Standard registered customer permissions' },
];

app.get('/api/roles', (req, res) => {
  res.json(roles);
});

app.post('/api/roles', (req, res) => {
  const { name, description } = req.body;
  const newRole = {
    id: `r_${Date.now()}`,
    name: name || 'ROLE_CUSTOM',
    description: description || '',
  };
  roles.push(newRole);
  res.status(201).json(newRole);
});

app.post('/api/roles/assign', (req, res) => {
  const { userId, roleName } = req.body;
  const user = users.find((u) => u.id === userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (!user.roles.some((r) => r.name === roleName)) {
    user.roles.push({ id: `r_${Date.now()}`, name: roleName });
  }
  res.json(user);
});

app.delete('/api/roles/remove', (req, res) => {
  const { userId, roleName } = req.body;
  const user = users.find((u) => u.id === userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.roles = user.roles.filter((r) => r.name !== roleName);
  res.json(user);
});

/* =========================================================================
   10. REVIEW ENDPOINTS
   ========================================================================= */
app.get('/api/reviews/product/:productId', (req, res) => {
  const prodReviews = reviews.filter((r) => r.productId === req.params.productId);
  res.json(prodReviews);
});

app.post('/api/reviews', (req, res) => {
  const user = getAuthUser(req);
  const { productId, rating, comment } = req.body;
  const newRev = {
    id: `rev_${Date.now()}`,
    userId: user.id,
    userName: `${user.firstName} ${user.lastName}`,
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    productId,
    rating: parseInt(rating, 10),
    comment,
    createdAt: new Date().toISOString(),
  };
  reviews.unshift(newRev);

  // Update product rating summary
  const prod = products.find((p) => p.id === productId);
  if (prod) {
    const pRevs = reviews.filter((r) => r.productId === productId);
    const avg = pRevs.reduce((acc, r) => acc + r.rating, 0) / pRevs.length;
    prod.rating = parseFloat(avg.toFixed(1));
    prod.reviewCount = pRevs.length;
  }

  res.status(201).json(newRev);
});

app.put('/api/reviews/:id', (req, res) => {
  const rev = reviews.find((r) => r.id === req.params.id);
  if (!rev) return res.status(404).json({ message: 'Review not found' });
  Object.assign(rev, req.body);
  res.json(rev);
});

app.delete('/api/reviews/:id', (req, res) => {
  reviews = reviews.filter((r) => r.id !== req.params.id);
  res.json({ message: 'Review deleted' });
});

/* =========================================================================
   11. ADMIN & ANALYTICS ENDPOINTS
   ========================================================================= */
app.get('/api/admin/dashboard', (req, res) => {
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const lowStockItemsCount = products.filter((p) => p.stockQuantity < 10).length;

  res.json({
    totalRevenue,
    revenueChangePercent: 18.4,
    totalOrders: orders.length,
    ordersChangePercent: 12.1,
    totalCustomers: users.length,
    customersChangePercent: 8.5,
    lowStockItemsCount,
    recentOrders: orders.slice(0, 5),
    topSellingProducts: products.slice(0, 3).map((p) => ({
      product: p,
      soldQuantity: 142,
      revenue: p.price * 142,
    })),
  });
});

app.get('/api/admin/users', (req, res) => {
  res.json({
    content: users,
    page: 0,
    size: 10,
    totalElements: users.length,
    totalPages: 1,
    last: true,
  });
});

app.get('/api/admin/orders', (req, res) => {
  res.json({
    content: orders,
    page: 0,
    size: 10,
    totalElements: orders.length,
    totalPages: 1,
    last: true,
  });
});

app.get('/api/admin/reviews', (req, res) => {
  res.json({
    content: reviews,
    page: 0,
    size: 50,
    totalElements: reviews.length,
    totalPages: 1,
    last: true,
  });
});

app.put('/api/admin/reviews/:id/moderate', (req, res) => {
  const rev = reviews.find((r) => r.id === req.params.id);
  if (!rev) return res.status(404).json({ message: 'Review not found' });
  const { status } = req.body;
  (rev as any).status = status;
  res.json(rev);
});

app.put('/api/admin/users/:id/toggle-status', (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.enabled = !user.enabled;
  res.json(user);
});

app.get('/api/analytics/sales', (req, res) => {
  res.json([
    { period: 'Mon', sales: 120, orders: 15 },
    { period: 'Tue', sales: 210, orders: 24 },
    { period: 'Wed', sales: 340, orders: 38 },
    { period: 'Thu', sales: 280, orders: 31 },
    { period: 'Fri', sales: 450, orders: 52 },
    { period: 'Sat', sales: 590, orders: 68 },
    { period: 'Sun', sales: 420, orders: 49 },
  ]);
});

app.get('/api/analytics/revenue', (req, res) => {
  res.json([
    { month: 'Jan', revenue: 14200, target: 12000 },
    { month: 'Feb', revenue: 18500, target: 15000 },
    { month: 'Mar', revenue: 22100, target: 20000 },
    { month: 'Apr', revenue: 26800, target: 24000 },
    { month: 'May', revenue: 31000, target: 28000 },
    { month: 'Jun', revenue: 38400, target: 35000 },
  ]);
});

app.get('/api/analytics/products', (req, res) => {
  res.json(products.slice(0, 5));
});

app.get('/api/analytics/users', (req, res) => {
  res.json({ total: users.length, activeThisMonth: users.length, newThisWeek: 2 });
});

app.get('/api/analytics/inventory', (req, res) => {
  res.json({
    inStock: products.filter((p) => p.stockQuantity >= 10).length,
    lowStock: products.filter((p) => p.stockQuantity > 0 && p.stockQuantity < 10).length,
    outOfStock: products.filter((p) => p.stockQuantity === 0).length,
  });
});

/* =========================================================================
   SERVER & VITE INTEGRATION
   ========================================================================= */
async function startServer() {
  const PORT = 3000;

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CommerceHub backend server running at http://localhost:${PORT}`);
  });
}

startServer();
