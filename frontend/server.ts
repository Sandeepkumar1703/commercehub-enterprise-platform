import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// API Versioning Middleware: Normalize /api/v1/* calls to /api/*
app.use((req, res, next) => {
  if (req.url.startsWith('/api/v1/')) {
    req.url = req.url.replace('/api/v1/', '/api/');
  }
  next();
});

// Standard Spring Boot REST ApiResponse wrapper
const buildResponse = <T>(data: T, message = 'Success', success = true, errorCode?: string) => ({
  success,
  message,
  data,
  timestamp: new Date().toISOString(),
  ...(errorCode ? { errorCode } : {}),
});

// Seed Data
let mockUsers = [
  {
    id: 'usr_super',
    name: 'Super Admin',
    email: 'superadmin@commercehub.com',
    role: 'SUPER_ADMIN',
    permissions: [
      'PRODUCT_VIEW', 'PRODUCT_CREATE', 'PRODUCT_EDIT', 'PRODUCT_DELETE', 'PRODUCT_APPROVE',
      'ORDER_VIEW', 'ORDER_CREATE', 'ORDER_UPDATE', 'ORDER_CANCEL', 'ORDER_SHIP',
      'USER_VIEW', 'USER_MANAGE', 'USER_BLOCK', 'SELLER_VIEW', 'SELLER_APPROVE', 'SELLER_REJECT',
      'COUPON_MANAGE', 'ANALYTICS_VIEW', 'REPORT_VIEW', 'ROLE_MANAGE', 'PERMISSION_MANAGE',
      'SYSTEM_SETTINGS', 'AUDIT_LOGS', 'SYSTEM_BACKUP'
    ],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    status: 'ACTIVE',
    createdAt: '2025-01-10T08:00:00Z',
  },
  {
    id: 'usr_admin',
    name: 'Sarah Connor',
    email: 'admin@vynk.com',
    role: 'ADMIN',
    permissions: [
      'PRODUCT_VIEW', 'PRODUCT_CREATE', 'PRODUCT_EDIT', 'PRODUCT_DELETE', 'PRODUCT_APPROVE',
      'ORDER_VIEW', 'ORDER_UPDATE', 'USER_VIEW', 'USER_MANAGE', 'USER_BLOCK',
      'SELLER_VIEW', 'SELLER_APPROVE', 'SELLER_REJECT', 'COUPON_MANAGE', 'ANALYTICS_VIEW', 'REPORT_VIEW'
    ],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    status: 'ACTIVE',
    createdAt: '2025-02-01T10:00:00Z',
  },
  {
    id: 'usr_seller_1',
    name: 'Apex Tech Electronics',
    email: 'seller@apextech.com',
    role: 'SELLER',
    sellerId: 'sel_001',
    permissions: ['PRODUCT_VIEW', 'PRODUCT_CREATE', 'PRODUCT_EDIT', 'ORDER_VIEW', 'ORDER_UPDATE', 'ORDER_SHIP', 'ANALYTICS_VIEW'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    status: 'ACTIVE',
    createdAt: '2025-02-15T12:00:00Z',
  },
  {
    id: 'usr_customer_1',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    role: 'CUSTOMER',
    permissions: ['PRODUCT_VIEW', 'ORDER_VIEW', 'ORDER_CREATE', 'ORDER_CANCEL'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    status: 'ACTIVE',
    createdAt: '2025-03-01T14:30:00Z',
  }
];

let mockRoles = [
  {
    id: 'role_super',
    name: 'SUPER_ADMIN',
    description: 'Full system control and root permissions',
    permissions: [
      'PRODUCT_VIEW', 'PRODUCT_CREATE', 'PRODUCT_EDIT', 'PRODUCT_DELETE', 'PRODUCT_APPROVE',
      'ORDER_VIEW', 'ORDER_CREATE', 'ORDER_UPDATE', 'ORDER_CANCEL', 'ORDER_SHIP',
      'USER_VIEW', 'USER_MANAGE', 'USER_BLOCK', 'SELLER_VIEW', 'SELLER_APPROVE', 'SELLER_REJECT',
      'COUPON_MANAGE', 'ANALYTICS_VIEW', 'REPORT_VIEW', 'ROLE_MANAGE', 'PERMISSION_MANAGE'
    ],
    isSystem: true
  },
  {
    id: 'role_admin',
    name: 'ADMIN',
    description: 'Platform administration, approvals and catalog controls',
    permissions: [
      'PRODUCT_VIEW', 'PRODUCT_CREATE', 'PRODUCT_EDIT', 'PRODUCT_DELETE', 'PRODUCT_APPROVE',
      'ORDER_VIEW', 'ORDER_UPDATE', 'USER_VIEW', 'USER_MANAGE', 'USER_BLOCK',
      'SELLER_VIEW', 'SELLER_APPROVE', 'SELLER_REJECT', 'COUPON_MANAGE', 'ANALYTICS_VIEW', 'REPORT_VIEW'
    ],
    isSystem: true
  },
  {
    id: 'role_seller',
    name: 'SELLER',
    description: 'Merchant storefront, product listing and fulfillment',
    permissions: ['PRODUCT_VIEW', 'PRODUCT_CREATE', 'PRODUCT_EDIT', 'ORDER_VIEW', 'ORDER_UPDATE', 'ORDER_SHIP', 'ANALYTICS_VIEW'],
    isSystem: true
  },
  {
    id: 'role_customer',
    name: 'CUSTOMER',
    description: 'Shopper account with order history and checkout access',
    permissions: ['PRODUCT_VIEW', 'ORDER_VIEW', 'ORDER_CREATE', 'ORDER_CANCEL'],
    isSystem: true
  }
];

let mockPermissionsList = [
  { id: 'perm_1', code: 'PRODUCT_VIEW', name: 'View Catalog Products', category: 'PRODUCT' },
  { id: 'perm_2', code: 'PRODUCT_CREATE', name: 'Create Products', category: 'PRODUCT' },
  { id: 'perm_3', code: 'PRODUCT_EDIT', name: 'Edit Product Details', category: 'PRODUCT' },
  { id: 'perm_4', code: 'PRODUCT_DELETE', name: 'Delete Products', category: 'PRODUCT' },
  { id: 'perm_5', code: 'PRODUCT_APPROVE', name: 'Approve Merchant Products', category: 'PRODUCT' },
  { id: 'perm_6', code: 'ORDER_VIEW', name: 'View Orders', category: 'ORDER' },
  { id: 'perm_7', code: 'ORDER_CREATE', name: 'Place Orders', category: 'ORDER' },
  { id: 'perm_8', code: 'ORDER_UPDATE', name: 'Update Order Status', category: 'ORDER' },
  { id: 'perm_9', code: 'ORDER_CANCEL', name: 'Cancel Orders', category: 'ORDER' },
  { id: 'perm_10', code: 'ORDER_SHIP', name: 'Process Shipping', category: 'ORDER' },
  { id: 'perm_11', code: 'USER_VIEW', name: 'View Registered Users', category: 'USER' },
  { id: 'perm_12', code: 'USER_MANAGE', name: 'Modify User Profiles', category: 'USER' },
  { id: 'perm_13', code: 'ROLE_MANAGE', name: 'Manage System Roles', category: 'RBAC' },
  { id: 'perm_14', code: 'PERMISSION_MANAGE', name: 'Manage Role Permissions', category: 'RBAC' },
  { id: 'perm_15', code: 'ANALYTICS_VIEW', name: 'View Performance Analytics', category: 'ADMIN' },
];

let mockCategories = [
  { id: 'cat_1', name: 'Electronics', slug: 'electronics', description: 'High performance computing & audio gear', productCount: 28 },
  { id: 'cat_2', name: 'Furniture', slug: 'furniture', description: 'Ergonomic workspace and living solutions', productCount: 14 },
  { id: 'cat_3', name: 'Wearables', slug: 'wearables', description: 'Smartwatches and health tracking devices', productCount: 19 },
  { id: 'cat_4', name: 'Apparel', slug: 'apparel', description: 'Premium textiles and minimalist fashion', productCount: 32 }
];

let mockProducts = [
  {
    id: 'prod_101',
    title: 'UltraBook Pro X1 Carbon Laptop',
    sku: 'CH-LAP-001',
    description: '14-inch OLED touch display, Intel Core Ultra 7 processor, 32GB RAM, 1TB NVMe SSD with enterprise security chip.',
    price: 1499.99,
    comparePrice: 1699.99,
    category: 'Electronics',
    categoryId: 'cat_1',
    brand: 'ApexTech',
    stock: 45,
    sellerId: 'sel_001',
    sellerName: 'Apex Tech Electronics',
    rating: 4.9,
    reviewCount: 128,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800'
    ],
    status: 'APPROVED',
    createdAt: '2025-02-16T10:00:00Z',
  },
  {
    id: 'prod_102',
    title: 'Noise-Canceling Wireless Studio Headphones',
    sku: 'CH-AUD-002',
    description: 'Active Noise Cancellation, 40-hour battery life, high-res audio drivers, plush memory foam earcups.',
    price: 299.99,
    comparePrice: 349.99,
    category: 'Electronics',
    categoryId: 'cat_1',
    brand: 'SoundPulse',
    stock: 120,
    sellerId: 'sel_001',
    sellerName: 'Apex Tech Electronics',
    rating: 4.7,
    reviewCount: 84,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'
    ],
    status: 'APPROVED',
    createdAt: '2025-02-18T14:20:00Z',
  },
  {
    id: 'prod_103',
    title: 'Minimalist Ergonomic Executive Chair',
    sku: 'CH-FUR-003',
    description: 'Breathable mesh backrest, 4D adjustable armrests, lumbar support mechanism designed for 12+ hour comfort.',
    price: 449.00,
    comparePrice: 529.00,
    category: 'Furniture',
    categoryId: 'cat_2',
    brand: 'Luminary',
    stock: 18,
    sellerId: 'sel_002',
    sellerName: 'Luminary Home & Apparel',
    rating: 4.6,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1580481072645-022f9a6d1294?w=800'
    ],
    status: 'APPROVED',
    createdAt: '2025-03-01T11:00:00Z',
  },
  {
    id: 'prod_104',
    title: 'Smart Fitness GPS Watch Series 5',
    sku: 'CH-WCH-004',
    description: 'Continuous heart rate monitoring, SPO2 sensor, multi-sport tracking, titanium case, 7-day battery life.',
    price: 249.50,
    comparePrice: 299.00,
    category: 'Wearables',
    categoryId: 'cat_3',
    brand: 'ApexTech',
    stock: 60,
    sellerId: 'sel_001',
    sellerName: 'Apex Tech Electronics',
    rating: 4.8,
    reviewCount: 96,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'
    ],
    status: 'APPROVED',
    createdAt: '2025-03-05T09:30:00Z',
  },
  {
    id: 'prod_105',
    title: 'Mechanical RGB Keyboard - Hot Swappable',
    sku: 'CH-KEY-005',
    description: 'Custom gasket mounted layout, wireless 2.4GHz + Bluetooth 5.1, double-shot PBT keycaps.',
    price: 129.99,
    comparePrice: 159.99,
    category: 'Electronics',
    categoryId: 'cat_1',
    brand: 'ApexTech',
    stock: 4, // low stock example
    sellerId: 'sel_001',
    sellerName: 'Apex Tech Electronics',
    rating: 4.9,
    reviewCount: 65,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800'
    ],
    status: 'PENDING_APPROVAL',
    createdAt: '2025-03-12T16:00:00Z',
  }
];

let mockCart = [
  {
    id: 'cart_item_1',
    productId: 'prod_102',
    productTitle: 'Noise-Canceling Wireless Studio Headphones',
    price: 299.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    stock: 120,
  }
];

let mockWishlist = [
  {
    id: 'wish_1',
    productId: 'prod_101',
    productTitle: 'UltraBook Pro X1 Carbon Laptop',
    price: 1499.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
    addedAt: '2025-03-20T10:00:00Z'
  }
];

let mockOrders = [
  {
    id: 'ORD-98421',
    customerId: 'usr_customer_1',
    customerName: 'Alex Johnson',
    items: [
      {
        productId: 'prod_102',
        productTitle: 'Noise-Canceling Wireless Studio Headphones',
        productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
        price: 299.99,
        quantity: 1,
        sellerId: 'sel_001',
      }
    ],
    totalAmount: 323.99,
    shippingFee: 0,
    tax: 24.00,
    status: 'SHIPPED',
    shippingAddress: {
      id: 'addr_1',
      fullName: 'Alex Johnson',
      street: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      country: 'USA',
      phone: '+1 (555) 019-2834',
      isDefault: true,
    },
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK-9921820',
    createdAt: '2025-03-28T14:20:00Z',
  }
];

let mockAddresses = [
  {
    id: 'addr_1',
    fullName: 'Alex Johnson',
    street: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62701',
    country: 'USA',
    phone: '+1 (555) 019-2834',
    isDefault: true,
  }
];

let mockShipping = [
  {
    id: 'ship_1',
    orderId: 'ORD-98421',
    carrier: 'FedEx Express',
    trackingNumber: 'TRK-9921820',
    status: 'OUT_FOR_DELIVERY',
    estimatedDelivery: '2026-08-04T18:00:00Z',
    address: '742 Evergreen Terrace, Springfield, IL',
    updates: [
      { timestamp: '2026-08-01T08:00:00Z', location: 'Distribution Hub', status: 'SHIPPED' },
      { timestamp: '2026-08-02T06:30:00Z', location: 'Local Depot', status: 'OUT_FOR_DELIVERY' }
    ]
  }
];

let mockReviews = [
  {
    id: 'rev_1',
    productId: 'prod_101',
    userId: 'usr_customer_1',
    userName: 'Alex Johnson',
    rating: 5,
    title: 'Exceptional Performance for Enterprise Dev Work',
    comment: 'The OLED screen and battery efficiency make this laptop top-tier for professional multi-tasking.',
    createdAt: '2025-03-22T11:00:00Z',
    sellerResponse: 'Thank you Alex! We are glad the UltraBook X1 serves your development setup so well.'
  }
];

let mockLanguages = [
  { code: 'en', name: 'English', nativeName: 'English', enabled: true, direction: 'ltr' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', enabled: true, direction: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', enabled: true, direction: 'rtl' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', enabled: true, direction: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', enabled: true, direction: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', enabled: true, direction: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', enabled: true, direction: 'ltr' }
];

let mockTranslations: Record<string, Record<string, string>> = {
  en: {
    welcome: 'Welcome to Vynk — Seamlessly Connected Shopping',
    catalog: 'Product Catalog',
    cart: 'Shopping Cart',
    checkout: 'Checkout',
    orders: 'Order History',
    dashboard: 'Enterprise Dashboard',
    search_placeholder: 'Search products by title, SKU, or category...',
    add_to_cart: 'Add to Cart',
    buy_now: 'Buy Now',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    profile: 'User Profile',
    admin_panel: 'Admin Portal',
  },
  hi: {
    welcome: 'कॉमर्सहब एंटरप्राइज में आपका स्वागत है',
    catalog: 'उत्पाद कैटलॉग',
    cart: 'शॉपिंग कार्ट',
    checkout: 'चेकआउट',
    orders: 'ऑर्डर का इतिहास',
    dashboard: 'एंटरप्राइज डैशबोर्ड',
    search_placeholder: 'शीर्षक, SKU या श्रेणी के अनुसार उत्पाद खोजें...',
    add_to_cart: 'कार्ट में जोड़ें',
    buy_now: 'अभी खरीदें',
    login: 'लॉग इन करें',
    register: 'पंजीकरण करें',
    logout: 'लॉग आउट',
    profile: 'उपयोगकर्ता प्रोफ़ाइल',
    admin_panel: 'एडमिन पोर्टल',
  },
  ar: {
    welcome: 'مرحباً بكم في منصة Vynk المؤسسية',
    catalog: 'كتالوج المنتجات',
    cart: 'عربة التسوق',
    checkout: 'إتمام الشراء',
    orders: 'سجل الطلبات',
    dashboard: 'لوحة تحكم المؤسسة',
    search_placeholder: 'ابحث عن المنتجات بالاسم أو الفئة...',
    add_to_cart: 'إضافة إلى السلة',
    buy_now: 'اشتر الآن',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    profile: 'الملف الشخصي',
    admin_panel: 'بوابة الإدارة',
  },
  ru: {
    welcome: 'Добро пожаловать в Vynk Enterprise',
    catalog: 'Каталог товаров',
    cart: 'Корзина',
    checkout: 'Оформление заказа',
    orders: 'История заказов',
    dashboard: 'Панель управления',
    search_placeholder: 'Поиск товаров по названию или SKU...',
    add_to_cart: 'В корзину',
    buy_now: 'Купить сейчас',
    login: 'Войти',
    register: 'Регистрация',
    logout: 'Выйти',
    profile: 'Профиль пользователя',
    admin_panel: 'Панель администратора',
  },
  es: {
    welcome: 'Bienvenido a Vynk Enterprise',
    catalog: 'Catálogo de Productos',
    cart: 'Carrito de Compras',
    checkout: 'Pagar',
    orders: 'Historial de Pedidos',
    dashboard: 'Panel Empresarial',
    search_placeholder: 'Buscar productos por título, SKU o categoría...',
    add_to_cart: 'Añadir al Carrito',
    buy_now: 'Comprar Ahora',
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    logout: 'Cerrar Sesión',
    profile: 'Perfil de Usuario',
    admin_panel: 'Portal de Administración',
  },
  fr: {
    welcome: 'Bienvenue sur Vynk Enterprise',
    catalog: 'Catalogue de Produits',
    cart: 'Panier',
    checkout: 'Commander',
    orders: 'Historique des Commandes',
    dashboard: 'Tableau de Bord',
    search_placeholder: 'Rechercher par titre, UCK ou catégorie...',
    add_to_cart: 'Ajouter au Panier',
    buy_now: 'Acheter Maintenant',
    login: 'Connexion',
    register: 'S\'inscrire',
    logout: 'Déconnexion',
    profile: 'Profil Utilisateur',
    admin_panel: 'Portail d\'Administration',
  },
  de: {
    welcome: 'Willkommen bei Vynk Enterprise',
    catalog: 'Produktkatalog',
    cart: 'Warenkorb',
    checkout: 'Kasse',
    orders: 'Bestellverlauf',
    dashboard: 'Enterprise Dashboard',
    search_placeholder: 'Produkte nach Titel, SKU oder Kategorie suchen...',
    add_to_cart: 'In den Warenkorb',
    buy_now: 'Jetzt kaufen',
    login: 'Anmelden',
    register: 'Registrieren',
    logout: 'Abmelden',
    profile: 'Benutzerprofil',
    admin_panel: 'Admin-Portal',
  }
};

let mockMediaFiles = [
  { id: 'media_1', url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800', fileName: 'ultrabook_pro.jpg', sizeMb: 1.2, mimeType: 'image/jpeg', uploadedAt: '2025-02-16T10:00:00Z' },
  { id: 'media_2', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', fileName: 'headphones_studio.jpg', sizeMb: 0.9, mimeType: 'image/jpeg', uploadedAt: '2025-02-18T14:20:00Z' }
];

// ==========================================
// REST API ENDPOINTS
// ==========================================

// 1. Health Endpoint
app.get('/api/health', (req, res) => {
  res.json(buildResponse({ status: 'UP', service: 'CommerceHub-Spring-Boot-Core', version: '3.2.4', db: 'PostgreSQL-16' }));
});

// 2. Authentication API
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  let user = mockUsers.find(u => u.email.toLowerCase() === email?.toLowerCase());
  
  if (!user && email) {
    const rawName = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
    const formattedName = rawName.toLowerCase() === 'superadmin' ? 'Super Admin' : rawName;
    user = {
      id: `usr_${Date.now()}`,
      name: formattedName,
      email: email,
      role: (role || 'SUPER_ADMIN'),
      permissions: [
        'PRODUCT_VIEW', 'PRODUCT_CREATE', 'PRODUCT_EDIT', 'PRODUCT_DELETE', 'PRODUCT_APPROVE',
        'ORDER_VIEW', 'ORDER_CREATE', 'ORDER_UPDATE', 'ORDER_CANCEL', 'ORDER_SHIP',
        'USER_VIEW', 'USER_MANAGE', 'USER_BLOCK', 'SELLER_VIEW', 'SELLER_APPROVE', 'SELLER_REJECT',
        'COUPON_MANAGE', 'ANALYTICS_VIEW', 'REPORT_VIEW', 'ROLE_MANAGE', 'PERMISSION_MANAGE',
        'SYSTEM_SETTINGS', 'AUDIT_LOGS', 'SYSTEM_BACKUP'
      ],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };
    mockUsers.push(user);
  } else if (!user && role) {
    user = mockUsers.find(u => u.role === role);
  }
  if (!user) {
    user = mockUsers[0]; // fallback
  }

  const token = `jwt_access_token_${user.id}_${Date.now()}`;
  res.json(buildResponse({
    token,
    accessToken: token,
    refreshToken: `jwt_refresh_token_${user.id}_${Date.now()}`,
    user,
    expiresIn: 86400,
  }, 'User logged in successfully'));
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, role = 'CUSTOMER', password } = req.body;
  const newUser = {
    id: `usr_${Date.now()}`,
    name: name || 'New Platform User',
    email: email || `user_${Date.now()}@example.com`,
    role,
    permissions: role === 'SELLER' 
      ? ['PRODUCT_VIEW', 'PRODUCT_CREATE', 'PRODUCT_EDIT', 'ORDER_VIEW', 'ANALYTICS_VIEW'] 
      : ['PRODUCT_VIEW', 'ORDER_VIEW', 'ORDER_CREATE', 'ORDER_CANCEL'],
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  };
  mockUsers.push(newUser);

  const token = `jwt_access_token_${newUser.id}_${Date.now()}`;
  res.json(buildResponse({
    token,
    accessToken: token,
    refreshToken: `jwt_refresh_token_${newUser.id}_${Date.now()}`,
    user: newUser,
  }, 'Account registered successfully'));
});

app.post('/api/auth/logout', (req, res) => {
  res.json(buildResponse(null, 'User logged out successfully'));
});

app.put('/api/auth/change-password', (req, res) => {
  res.json(buildResponse(null, 'Password updated successfully'));
});

app.post('/api/auth/forgot-password', (req, res) => {
  res.json(buildResponse(null, 'Password reset link dispatched to your registered email'));
});

app.post('/api/auth/reset-password', (req, res) => {
  res.json(buildResponse(null, 'Password has been reset successfully'));
});

app.get('/api/auth/verify-email', (req, res) => {
  res.json(buildResponse({ verified: true }, 'Email address verified successfully'));
});

// 3. User & RBAC API
app.get('/api/users', (req, res) => {
  res.json(buildResponse(mockUsers));
});

app.get('/api/users/profile', (req, res) => {
  res.json(buildResponse(mockUsers[0]));
});

app.get('/api/user/profile', (req, res) => {
  res.json(buildResponse(mockUsers[0]));
});

app.put('/api/users/profile', (req, res) => {
  mockUsers[0] = { ...mockUsers[0], ...req.body };
  res.json(buildResponse(mockUsers[0], 'Profile updated successfully'));
});

app.put('/api/user/profile', (req, res) => {
  mockUsers[0] = { ...mockUsers[0], ...req.body };
  res.json(buildResponse(mockUsers[0], 'Profile updated successfully'));
});

app.get('/api/users/:userId/permissions', (req, res) => {
  const user = mockUsers.find(u => u.id === req.params.userId);
  if (!user) return res.status(404).json(buildResponse(null, 'User not found', false));
  res.json(buildResponse(user.permissions));
});

app.get('/api/roles', (req, res) => {
  res.json(buildResponse(mockRoles));
});

app.post('/api/roles', (req, res) => {
  const newRole = {
    id: `role_${Date.now()}`,
    name: req.body.name || 'NEW_ROLE',
    description: req.body.description || 'Custom role definition',
    permissions: req.body.permissions || ['PRODUCT_VIEW'],
    isSystem: false,
  };
  mockRoles.push(newRole);
  res.json(buildResponse(newRole, 'Role created successfully'));
});

app.put('/api/roles/:id', (req, res) => {
  const idx = mockRoles.findIndex(r => r.id === req.params.id);
  if (idx !== -1) {
    mockRoles[idx] = { ...mockRoles[idx], ...req.body };
  }
  res.json(buildResponse(mockRoles[idx], 'Role updated successfully'));
});

app.delete('/api/roles/:id', (req, res) => {
  mockRoles = mockRoles.filter(r => r.id !== req.params.id);
  res.json(buildResponse(null, 'Role deleted successfully'));
});

app.post('/api/roles/:roleId/permissions', (req, res) => {
  const roleObj = mockRoles.find(r => r.id === req.params.roleId || r.name === req.params.roleId);
  if (roleObj) {
    roleObj.permissions = req.body.permissions || [];
  }
  res.json(buildResponse(roleObj, 'Permissions updated for role'));
});

app.put('/api/users/:userId/status', (req, res) => {
  const user = mockUsers.find(u => u.id === req.params.userId);
  if (user) {
    user.status = req.body.status;
  }
  res.json(buildResponse(user, `User status updated to ${req.body.status}`));
});

app.put('/api/users/:userId/role', (req, res) => {
  const user = mockUsers.find(u => u.id === req.params.userId);
  if (user) {
    user.role = req.body.role;
    const roleObj = mockRoles.find(r => r.name === req.body.role);
    if (roleObj) {
      user.permissions = [...roleObj.permissions];
    }
  }
  res.json(buildResponse(user, `User role updated to ${req.body.role}`));
});

app.get('/api/permissions', (req, res) => {
  res.json(buildResponse(mockPermissionsList));
});

app.get('/api/permissions/categories', (req, res) => {
  res.json(buildResponse(['PRODUCT', 'ORDER', 'USER', 'SELLER', 'COUPON', 'ANALYTICS', 'REPORT', 'ROLE', 'PERMISSION']));
});

// User Addresses API
app.get('/api/user/addresses', (req, res) => {
  res.json(buildResponse(mockAddresses));
});

app.get('/api/addresses', (req, res) => {
  res.json(buildResponse(mockAddresses));
});

app.get('/api/addresses/default', (req, res) => {
  const def = mockAddresses.find(a => a.isDefault) || mockAddresses[0];
  res.json(buildResponse(def));
});

app.get('/api/addresses/:id', (req, res) => {
  const addr = mockAddresses.find(a => a.id === req.params.id) || mockAddresses[0];
  res.json(buildResponse(addr));
});

app.post('/api/user/addresses', (req, res) => {
  const newAddr = { id: `addr_${Date.now()}`, ...req.body, isDefault: mockAddresses.length === 0 };
  mockAddresses.push(newAddr);
  res.json(buildResponse(newAddr, 'Address added successfully'));
});

app.post('/api/addresses', (req, res) => {
  const newAddr = { id: `addr_${Date.now()}`, ...req.body, isDefault: mockAddresses.length === 0 };
  mockAddresses.push(newAddr);
  res.json(buildResponse(newAddr, 'Address created successfully'));
});

app.put('/api/user/addresses/:id', (req, res) => {
  const index = mockAddresses.findIndex(a => a.id === req.params.id);
  if (index !== -1) {
    mockAddresses[index] = { ...mockAddresses[index], ...req.body };
  }
  res.json(buildResponse(mockAddresses[index], 'Address updated successfully'));
});

app.put('/api/addresses/:id', (req, res) => {
  const index = mockAddresses.findIndex(a => a.id === req.params.id);
  if (index !== -1) {
    mockAddresses[index] = { ...mockAddresses[index], ...req.body };
  }
  res.json(buildResponse(mockAddresses[index], 'Address updated successfully'));
});

app.put('/api/addresses/:id/default', (req, res) => {
  mockAddresses.forEach(a => a.isDefault = (a.id === req.params.id));
  res.json(buildResponse(mockAddresses.find(a => a.id === req.params.id), 'Default address set'));
});

app.delete('/api/user/addresses/:id', (req, res) => {
  mockAddresses = mockAddresses.filter(a => a.id !== req.params.id);
  res.json(buildResponse(null, 'Address removed successfully'));
});

app.delete('/api/addresses/:id', (req, res) => {
  mockAddresses = mockAddresses.filter(a => a.id !== req.params.id);
  res.json(buildResponse(null, 'Address removed successfully'));
});

// User Permission & Role extra routes
app.post('/api/users/:userId/permissions/:permissionId', (req, res) => {
  const user = mockUsers.find(u => u.id === req.params.userId);
  if (user && !user.permissions.includes(req.params.permissionId)) {
    user.permissions.push(req.params.permissionId);
  }
  res.json(buildResponse(user, 'Permission granted to user'));
});

app.delete('/api/users/:userId/permissions/:permissionId', (req, res) => {
  const user = mockUsers.find(u => u.id === req.params.userId);
  if (user) {
    user.permissions = user.permissions.filter(p => p !== req.params.permissionId);
  }
  res.json(buildResponse(user, 'Permission revoked from user'));
});

app.post('/api/roles/:roleId/permissions/:permissionId', (req, res) => {
  const roleObj = mockRoles.find(r => r.id === req.params.roleId || r.name === req.params.roleId);
  if (roleObj && !roleObj.permissions.includes(req.params.permissionId)) {
    roleObj.permissions.push(req.params.permissionId);
  }
  res.json(buildResponse(roleObj, 'Permission added to role'));
});

app.delete('/api/roles/:roleId/permissions/:permissionId', (req, res) => {
  const roleObj = mockRoles.find(r => r.id === req.params.roleId || r.name === req.params.roleId);
  if (roleObj) {
    roleObj.permissions = roleObj.permissions.filter(p => p !== req.params.permissionId);
  }
  res.json(buildResponse(roleObj, 'Permission removed from role'));
});

app.post('/api/roles/assign', (req, res) => {
  const { userId, roleName } = req.body;
  const user = mockUsers.find(u => u.id === userId);
  if (user) user.role = roleName;
  res.json(buildResponse(user, `Role ${roleName} assigned`));
});

app.delete('/api/roles/remove', (req, res) => {
  const { userId, roleName } = req.body || req.query;
  const user = mockUsers.find(u => u.id === userId);
  if (user && user.role === roleName) user.role = 'CUSTOMER';
  res.json(buildResponse(user, `Role ${roleName} removed`));
});

// 4. Multilingual & Translation API
let mockTranslationKeys = [
  { id: 'key_1', key: 'welcome', category: 'GENERAL', description: 'Welcome banner greeting' },
  { id: 'key_2', key: 'catalog', category: 'NAV', description: 'Product catalog navigation' },
  { id: 'key_3', key: 'cart', category: 'NAV', description: 'Shopping cart link' },
  { id: 'key_4', key: 'checkout', category: 'CHECKOUT', description: 'Checkout button' },
  { id: 'key_5', key: 'login', category: 'AUTH', description: 'Login button' },
];

app.get('/api/languages', (req, res) => {
  res.json(buildResponse(mockLanguages));
});

app.get('/api/languages/enabled', (req, res) => {
  res.json(buildResponse(mockLanguages.filter(l => l.enabled)));
});

app.get('/api/languages/code/:code', (req, res) => {
  const lang = mockLanguages.find(l => l.code.toLowerCase() === req.params.code.toLowerCase());
  res.json(buildResponse(lang || mockLanguages[0]));
});

app.get('/api/languages/:id', (req, res) => {
  const lang = mockLanguages.find(l => l.code === req.params.id || (l as any).id === req.params.id);
  res.json(buildResponse(lang || mockLanguages[0]));
});

app.post('/api/languages', (req, res) => {
  const newLang = {
    code: req.body.code?.toLowerCase() || `lang_${Date.now()}`,
    name: req.body.name || 'New Language',
    nativeName: req.body.nativeName || req.body.name || 'New Language',
    enabled: req.body.enabled !== undefined ? req.body.enabled : true,
    direction: req.body.direction || 'ltr',
  };
  mockLanguages.push(newLang);
  res.json(buildResponse(newLang, 'Language created successfully'));
});

app.put('/api/languages/:id', (req, res) => {
  const idx = mockLanguages.findIndex(l => l.code === req.params.id);
  if (idx !== -1) {
    mockLanguages[idx] = { ...mockLanguages[idx], ...req.body };
  }
  res.json(buildResponse(mockLanguages[idx] || mockLanguages[0], 'Language updated successfully'));
});

app.delete('/api/languages/:id', (req, res) => {
  mockLanguages = mockLanguages.filter(l => l.code !== req.params.id);
  res.json(buildResponse(null, 'Language deleted successfully'));
});

app.patch('/api/languages/:id/enable', (req, res) => {
  const lang = mockLanguages.find(l => l.code === req.params.id);
  if (lang) lang.enabled = true;
  res.json(buildResponse(lang, 'Language enabled'));
});

app.patch('/api/languages/:id/disable', (req, res) => {
  const lang = mockLanguages.find(l => l.code === req.params.id);
  if (lang) lang.enabled = false;
  res.json(buildResponse(lang, 'Language disabled'));
});

app.patch('/api/languages/:id/default', (req, res) => {
  res.json(buildResponse(mockLanguages.find(l => l.code === req.params.id), 'Default language set'));
});

app.put('/api/languages/:code/toggle', (req, res) => {
  const lang = mockLanguages.find(l => l.code === req.params.code);
  if (lang) {
    lang.enabled = req.body.enabled !== undefined ? req.body.enabled : !lang.enabled;
  }
  res.json(buildResponse(lang, 'Language status updated'));
});

// Translation Keys Endpoints
app.get('/api/translations/keys', (req, res) => {
  res.json(buildResponse(mockTranslationKeys));
});

app.get('/api/translations/keys/:id', (req, res) => {
  const k = mockTranslationKeys.find(item => item.id === req.params.id || item.key === req.params.id);
  res.json(buildResponse(k || mockTranslationKeys[0]));
});

app.post('/api/translations/keys', (req, res) => {
  const newKey = { id: `key_${Date.now()}`, key: req.body.key, category: req.body.category || 'GENERAL', description: req.body.description || '' };
  mockTranslationKeys.push(newKey);
  res.json(buildResponse(newKey, 'Translation key created'));
});

app.put('/api/translations/keys/:id', (req, res) => {
  const idx = mockTranslationKeys.findIndex(k => k.id === req.params.id || k.key === req.params.id);
  if (idx !== -1) mockTranslationKeys[idx] = { ...mockTranslationKeys[idx], ...req.body };
  res.json(buildResponse(mockTranslationKeys[idx], 'Translation key updated'));
});

app.delete('/api/translations/keys/:id', (req, res) => {
  mockTranslationKeys = mockTranslationKeys.filter(k => k.id !== req.params.id && k.key !== req.params.id);
  res.json(buildResponse(null, 'Translation key deleted'));
});

// Translation Values Endpoints
app.get('/api/translations/values', (req, res) => {
  const list: Array<{ id: string; languageCode: string; key: string; value: string }> = [];
  Object.entries(mockTranslations).forEach(([lang, map]) => {
    Object.entries(map).forEach(([k, v]) => {
      list.push({ id: `val_${lang}_${k}`, languageCode: lang, key: k, value: v });
    });
  });
  res.json(buildResponse(list));
});

app.get('/api/translations/values/:id', (req, res) => {
  const keyName = req.params.id;
  const list = Object.entries(mockTranslations).map(([lang, map]) => ({
    id: `val_${lang}_${keyName}`,
    languageCode: lang,
    key: keyName,
    value: map[keyName] || ''
  }));
  res.json(buildResponse(list[0] || { id: req.params.id, languageCode: 'en', key: keyName, value: '' }));
});

app.post('/api/translations/values', (req, res) => {
  const { languageCode, key, value } = req.body;
  if (languageCode && key) {
    if (!mockTranslations[languageCode]) mockTranslations[languageCode] = {};
    mockTranslations[languageCode][key] = value;
  }
  res.json(buildResponse({ id: `val_${languageCode}_${key}`, languageCode, key, value }, 'Translation value saved'));
});

app.put('/api/translations/values/:id', (req, res) => {
  const { languageCode, key, value } = req.body;
  if (languageCode && key) {
    if (!mockTranslations[languageCode]) mockTranslations[languageCode] = {};
    mockTranslations[languageCode][key] = value;
  }
  res.json(buildResponse({ id: req.params.id, languageCode, key, value }, 'Translation value updated'));
});

app.delete('/api/translations/values/:id', (req, res) => {
  const keyToDelete = req.params.id;
  Object.keys(mockTranslations).forEach(lang => {
    delete mockTranslations[lang][keyToDelete];
  });
  res.json(buildResponse(null, 'Translation value deleted'));
});

app.get('/api/translations/map/:languageCode', (req, res) => {
  const code = req.params.languageCode.toLowerCase();
  const translations = mockTranslations[code] || mockTranslations['en'];
  res.json(buildResponse(translations));
});

app.get('/api/translations/language/:languageCode', (req, res) => {
  const lang = req.params.languageCode.toLowerCase();
  const map = mockTranslations[lang] || mockTranslations['en'];
  const list = Object.entries(map).map(([k, v]) => ({ id: `val_${lang}_${k}`, languageCode: lang, key: k, value: v }));
  res.json(buildResponse(list));
});

app.put('/api/translations', (req, res) => {
  const { languageCode, key, value } = req.body;
  if (languageCode && key) {
    if (!mockTranslations[languageCode]) {
      mockTranslations[languageCode] = {};
    }
    mockTranslations[languageCode][key] = value;
  }
  res.json(buildResponse(null, 'Translation updated'));
});

// 5. Product API & Filters
app.get('/api/products/search', (req, res) => {
  const q = (req.query.q as string || '').toLowerCase();
  const results = mockProducts.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  res.json(buildResponse(results));
});

app.get('/api/products/filter/price', (req, res) => {
  const min = Number(req.query.min || 0);
  const max = Number(req.query.max || 10000);
  const filtered = mockProducts.filter(p => p.price >= min && p.price <= max);
  res.json(buildResponse(filtered));
});

app.get('/api/products/filter/category/:categoryId', (req, res) => {
  const filtered = mockProducts.filter(p => p.categoryId === req.params.categoryId || p.category.toLowerCase() === req.params.categoryId.toLowerCase());
  res.json(buildResponse(filtered));
});

app.get('/api/products/filter/in-stock', (req, res) => {
  res.json(buildResponse(mockProducts.filter(p => p.stock > 0)));
});

app.get('/api/products/filter/out-of-stock', (req, res) => {
  res.json(buildResponse(mockProducts.filter(p => p.stock <= 0)));
});

app.get('/api/products/low-stock', (req, res) => {
  res.json(buildResponse(mockProducts.filter(p => p.stock <= 5)));
});

app.get('/api/products', (req, res) => {
  res.json(buildResponse(mockProducts));
});

app.get('/api/products/:id', (req, res) => {
  const p = mockProducts.find(item => item.id === req.params.id);
  if (!p) return res.status(404).json(buildResponse(null, 'Product not found', false));
  res.json(buildResponse(p));
});

app.put('/api/products/:id/approve', (req, res) => {
  const p = mockProducts.find(item => item.id === req.params.id);
  if (p) {
    p.status = req.body.isApproved ? 'APPROVED' : 'PENDING_APPROVAL';
  }
  res.json(buildResponse(p, 'Product approval status updated'));
});

app.post('/api/products', (req, res) => {
  const newProd = {
    id: `prod_${Date.now()}`,
    rating: 5.0,
    reviewCount: 0,
    status: 'APPROVED',
    createdAt: new Date().toISOString(),
    ...req.body
  };
  mockProducts.unshift(newProd);
  res.json(buildResponse(newProd, 'Product created successfully'));
});

app.put('/api/products/:id', (req, res) => {
  const idx = mockProducts.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json(buildResponse(null, 'Product not found', false));
  mockProducts[idx] = { ...mockProducts[idx], ...req.body };
  res.json(buildResponse(mockProducts[idx], 'Product updated successfully'));
});

app.delete('/api/products/:id', (req, res) => {
  mockProducts = mockProducts.filter(p => p.id !== req.params.id);
  res.json(buildResponse(null, 'Product deleted successfully'));
});

app.post('/api/products/:productId/image', (req, res) => {
  const p = mockProducts.find(item => item.id === req.params.productId);
  if (p) {
    p.images = p.images || [];
    p.images.push(req.body.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800');
  }
  res.json(buildResponse(p, 'Image attached to product'));
});

// Category API
app.get('/api/categories', (req, res) => {
  res.json(buildResponse(mockCategories));
});

app.post('/api/categories', (req, res) => {
  const newCat = { id: `cat_${Date.now()}`, productCount: 0, ...req.body };
  mockCategories.push(newCat);
  res.json(buildResponse(newCat, 'Category created successfully'));
});

// 6. Cart API
app.get('/api/cart', (req, res) => {
  res.json(buildResponse(mockCart));
});

app.post('/api/cart/items', (req, res) => {
  const productId = req.body.productId;
  const product = mockProducts.find(p => p.id === productId);
  if (!product) return res.status(404).json(buildResponse(null, 'Product not found', false));

  const existing = mockCart.find(i => i.productId === product.id);
  if (existing) {
    existing.quantity += (req.body.quantity || 1);
  } else {
    mockCart.push({
      id: `cart_${Date.now()}`,
      productId: product.id,
      productTitle: product.title,
      price: product.price,
      quantity: req.body.quantity || 1,
      image: product.images[0],
      stock: product.stock
    });
  }
  res.json(buildResponse(mockCart, 'Product added to cart'));
});

app.post('/api/cart/:productId', (req, res) => {
  const product = mockProducts.find(p => p.id === req.params.productId);
  if (!product) return res.status(404).json(buildResponse(null, 'Product not found', false));

  const existing = mockCart.find(i => i.productId === product.id);
  if (existing) {
    existing.quantity += (req.body.quantity || 1);
  } else {
    mockCart.push({
      id: `cart_${Date.now()}`,
      productId: product.id,
      productTitle: product.title,
      price: product.price,
      quantity: req.body.quantity || 1,
      image: product.images[0],
      stock: product.stock
    });
  }
  res.json(buildResponse(mockCart, 'Product added to cart'));
});

app.put('/api/cart/items/:cartItemId', (req, res) => {
  const item = mockCart.find(i => i.id === req.params.cartItemId);
  if (item) {
    item.quantity = req.body.quantity;
  }
  res.json(buildResponse(mockCart, 'Cart quantity updated'));
});

app.delete('/api/cart/items/:cartItemId', (req, res) => {
  mockCart = mockCart.filter(i => i.id !== req.params.cartItemId);
  res.json(buildResponse(mockCart, 'Item removed from cart'));
});

app.delete('/api/cart', (req, res) => {
  mockCart = [];
  res.json(buildResponse([], 'Cart cleared'));
});

// 7. Wishlist API
app.get('/api/wishlist', (req, res) => {
  res.json(buildResponse(mockWishlist));
});

app.post('/api/wishlist/:productId', (req, res) => {
  const p = mockProducts.find(item => item.id === req.params.productId);
  if (!p) return res.status(404).json(buildResponse(null, 'Product not found', false));
  if (!mockWishlist.some(w => w.productId === p.id)) {
    mockWishlist.push({
      id: `wish_${Date.now()}`,
      productId: p.id,
      productTitle: p.title,
      price: p.price,
      image: p.images[0],
      addedAt: new Date().toISOString()
    });
  }
  res.json(buildResponse(mockWishlist, 'Product saved to wishlist'));
});

app.delete('/api/wishlist/:productId', (req, res) => {
  mockWishlist = mockWishlist.filter(w => w.productId !== req.params.productId && w.id !== req.params.productId);
  res.json(buildResponse(mockWishlist, 'Removed from wishlist'));
});

// 8. Order API
app.get('/api/orders/my-orders', (req, res) => {
  res.json(buildResponse(mockOrders));
});

app.get('/api/orders', (req, res) => {
  res.json(buildResponse(mockOrders));
});

app.get('/api/orders/:id', (req, res) => {
  const order = mockOrders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json(buildResponse(null, 'Order not found', false));
  res.json(buildResponse(order));
});

app.post('/api/orders', (req, res) => {
  const newOrder = {
    id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    customerId: 'usr_customer_1',
    customerName: 'Alex Johnson',
    items: req.body.items || [...mockCart],
    totalAmount: req.body.totalAmount || 323.99,
    shippingFee: 0,
    tax: 24.0,
    status: 'PLACED',
    shippingAddress: req.body.shippingAddress || mockAddresses[0],
    paymentMethod: req.body.paymentMethod || 'Credit Card',
    trackingNumber: `TRK-${Math.floor(1000000 + Math.random() * 9000000)}`,
    createdAt: new Date().toISOString()
  };
  mockOrders.unshift(newOrder);
  mockCart = []; // empty cart upon order creation
  res.json(buildResponse(newOrder, 'Order created successfully'));
});

app.put('/api/orders/:id/status', (req, res) => {
  const order = mockOrders.find(o => o.id === req.params.id);
  if (order) order.status = req.body.status;
  res.json(buildResponse(order, 'Order status updated successfully'));
});

app.put('/api/orders/:id/cancel', (req, res) => {
  const order = mockOrders.find(o => o.id === req.params.id);
  if (order) order.status = 'CANCELLED';
  res.json(buildResponse(order, 'Order cancelled successfully'));
});

// Coupons API
app.get('/api/coupons', (req, res) => {
  res.json(buildResponse([
    { code: 'SAVE10', discountPercent: 10, validUntil: '2026-12-31', isActive: true },
    { code: 'ENTERPRISE20', discountPercent: 20, validUntil: '2026-12-31', isActive: true }
  ]));
});

app.post('/api/coupons/apply', (req, res) => {
  const code = (req.body.code || '').toUpperCase();
  if (code === 'SAVE10' || code === 'ENTERPRISE20') {
    res.json(buildResponse({ code, discountPercent: code === 'SAVE10' ? 10 : 20, validUntil: '2026-12-31', isActive: true }, 'Coupon applied'));
  } else {
    res.status(400).json(buildResponse(null, 'Invalid or expired coupon code', false));
  }
});

app.post('/api/coupons', (req, res) => {
  res.json(buildResponse({ code: req.body.code || 'NEWCOUPON', discountPercent: req.body.discountPercent || 15, validUntil: '2026-12-31', isActive: true }, 'Coupon created'));
});

// 9. Payment API
let mockPaymentsList = [
  {
    paymentId: 'pay_1001',
    orderId: 'ORD-98421',
    amount: 323.99,
    status: 'SUCCESS',
    gateway: 'Stripe / Credit Card',
    transactionRef: 'tx_ref_998124',
    timestamp: '2026-02-18T14:20:00Z'
  },
  {
    paymentId: 'pay_1002',
    orderId: 'ORD-98422',
    amount: 149.50,
    status: 'SUCCESS',
    gateway: 'PayPal Express',
    transactionRef: 'tx_ref_882190',
    timestamp: '2026-02-19T09:12:00Z'
  },
  {
    paymentId: 'pay_1003',
    orderId: 'ORD-98423',
    amount: 89.00,
    status: 'PENDING',
    gateway: 'Stripe / Credit Card',
    transactionRef: 'tx_ref_771023',
    timestamp: '2026-02-20T11:45:00Z'
  },
  {
    paymentId: 'pay_1004',
    orderId: 'ORD-98424',
    amount: 450.00,
    status: 'REFUNDED',
    gateway: 'Stripe / Credit Card',
    transactionRef: 'tx_ref_661088',
    timestamp: '2026-02-21T16:30:00Z'
  }
];

app.get('/api/payments', (req, res) => {
  res.json(buildResponse(mockPaymentsList));
});

app.post('/api/payments', (req, res) => {
  const payment = {
    paymentId: `pay_${Date.now()}`,
    orderId: req.body.orderId || 'ORD-98421',
    amount: req.body.amount || 323.99,
    status: (req.body.status || 'SUCCESS') as any,
    gateway: req.body.gateway || 'Stripe / Credit Card',
    transactionRef: `tx_ref_${Math.random().toString(36).substring(7)}`,
    timestamp: new Date().toISOString()
  };
  mockPaymentsList.unshift(payment);
  res.json(buildResponse(payment, 'Payment processed successfully'));
});

app.get('/api/payments/:paymentId', (req, res) => {
  const found = mockPaymentsList.find(p => p.paymentId === req.params.paymentId);
  res.json(buildResponse(found || mockPaymentsList[0]));
});

app.put('/api/payments/:paymentId/status', (req, res) => {
  const { status } = req.body;
  const found = mockPaymentsList.find(p => p.paymentId === req.params.paymentId);
  if (found) found.status = status;
  res.json(buildResponse(found || { paymentId: req.params.paymentId, status }, `Payment status updated to ${status}`));
});

app.post('/api/payments/:paymentId/refund', (req, res) => {
  const found = mockPaymentsList.find(p => p.paymentId === req.params.paymentId);
  if (found) found.status = 'REFUNDED';
  res.json(buildResponse(found || { paymentId: req.params.paymentId, status: 'REFUNDED' }, 'Refund processed successfully'));
});

// 10. Shipping API
app.get('/api/shipping', (req, res) => {
  res.json(buildResponse(mockShipping));
});

app.get('/api/shipping/order/:orderId', (req, res) => {
  const ship = mockShipping.find(s => s.orderId === req.params.orderId) || mockShipping[0];
  res.json(buildResponse(ship));
});

app.post('/api/shipping', (req, res) => {
  const newShip = {
    id: `ship_${Date.now()}`,
    status: 'SHIPPED',
    trackingNumber: `TRK-${Math.floor(1000000 + Math.random() * 9000000)}`,
    updates: [{ timestamp: new Date().toISOString(), location: 'Warehouse', status: 'SHIPPED' }],
    ...req.body
  };
  mockShipping.push(newShip);
  res.json(buildResponse(newShip, 'Shipping shipment created'));
});

app.put('/api/shipping/:id/status', (req, res) => {
  const ship = mockShipping.find(s => s.id === req.params.id);
  if (ship) {
    ship.status = req.body.status;
    ship.updates = ship.updates || [];
    ship.updates.push({ timestamp: new Date().toISOString(), location: 'In Transit', status: req.body.status });
  }
  res.json(buildResponse(ship, `Shipping status updated to ${req.body.status}`));
});

// 11. Review API
app.get('/api/reviews/product/:productId', (req, res) => {
  res.json(buildResponse(mockReviews.filter(r => r.productId === req.params.productId)));
});

app.post('/api/reviews', (req, res) => {
  const review = {
    id: `rev_${Date.now()}`,
    userName: 'Alex Johnson',
    createdAt: new Date().toISOString(),
    ...req.body
  };
  mockReviews.unshift(review);
  res.json(buildResponse(review, 'Review submitted successfully'));
});

app.put('/api/reviews/:id', (req, res) => {
  const idx = mockReviews.findIndex(r => r.id === req.params.id);
  if (idx !== -1) mockReviews[idx] = { ...mockReviews[idx], ...req.body };
  res.json(buildResponse(mockReviews[idx], 'Review updated'));
});

app.delete('/api/reviews/:id', (req, res) => {
  mockReviews = mockReviews.filter(r => r.id !== req.params.id);
  res.json(buildResponse(null, 'Review deleted'));
});

app.post('/api/reviews/:id/respond', (req, res) => {
  const rev = mockReviews.find(r => r.id === req.params.id);
  if (rev) rev.sellerResponse = req.body.response;
  res.json(buildResponse(rev, 'Response saved'));
});

// 12. Admin Dashboard & Analytics API
app.get('/api/admin/dashboard', (req, res) => {
  res.json(buildResponse({
    totalRevenue: 329500.0,
    totalOrders: mockOrders.length,
    totalProducts: mockProducts.length,
    totalCustomers: mockUsers.filter(u => u.role === 'CUSTOMER').length,
    lowStockCount: mockProducts.filter(p => p.stock <= 5).length,
    pendingApprovals: mockProducts.filter(p => p.status === 'PENDING_APPROVAL').length,
  }));
});

app.get('/api/admin/dashboard/top-products', (req, res) => {
  res.json(buildResponse(mockProducts.slice(0, 4)));
});

app.get('/api/admin/dashboard/sales', (req, res) => {
  res.json(buildResponse([
    { month: 'Jan', sales: 45000 },
    { month: 'Feb', sales: 52000 },
    { month: 'Mar', sales: 61000 },
    { month: 'Apr', sales: 74000 },
    { month: 'May', sales: 82000 },
    { month: 'Jun', sales: 95500 },
  ]));
});

app.get('/api/admin/dashboard/revenue', (req, res) => {
  res.json(buildResponse({ totalRevenue: 329500, growth: 18.4, monthlyTrend: [40000, 48000, 56000, 62000, 71000, 80500] }));
});

app.get('/api/admin/dashboard/recent-orders', (req, res) => {
  res.json(buildResponse(mockOrders));
});

app.get('/api/admin/dashboard/products', (req, res) => {
  res.json(buildResponse(mockProducts));
});

app.get('/api/admin/dashboard/orders', (req, res) => {
  res.json(buildResponse(mockOrders));
});

app.get('/api/admin/dashboard/low-stock', (req, res) => {
  res.json(buildResponse(mockProducts.filter(p => p.stock <= 10)));
});

app.get('/api/admin/dashboard/customers', (req, res) => {
  res.json(buildResponse(mockUsers.filter(u => u.role === 'CUSTOMER')));
});

// Analytics Endpoints
app.get('/api/analytics/dashboard', (req, res) => {
  res.json(buildResponse({
    totalRevenue: 329500.0,
    totalOrders: mockOrders.length,
    pendingOrders: mockOrders.filter(o => o.status === 'PENDING' || o.status === 'PLACED').length,
    activeProducts: mockProducts.filter(p => p.status === 'APPROVED').length,
    lowStockCount: mockProducts.filter(p => p.stock <= 5).length,
    totalCustomers: mockUsers.filter(u => u.role === 'CUSTOMER').length,
    growthRate: 14.8,
  }));
});

app.get('/api/analytics/yearly', (req, res) => {
  res.json(buildResponse([
    { year: '2023', revenue: 1800000, orders: 12400 },
    { year: '2024', revenue: 2900000, orders: 19800 },
    { year: '2025', revenue: 3950000, orders: 27500 }
  ]));
});

app.get('/api/analytics/monthly', (req, res) => {
  res.json(buildResponse([
    { month: 'Jan', revenue: 240000, orders: 1800 },
    { month: 'Feb', revenue: 290000, orders: 2100 },
    { month: 'Mar', revenue: 329500, orders: 2450 }
  ]));
});

app.get('/api/analytics/sales', (req, res) => {
  res.json(buildResponse({
    totalSalesUnits: 4890,
    growthPercentage: 14.2,
    topProducts: [
      { productId: 'prod_101', title: 'UltraBook Pro X1 Carbon Laptop', unitsSold: 142, totalSales: 212998.58 },
      { productId: 'prod_102', title: 'Noise-Canceling Wireless Studio Headphones', unitsSold: 98, totalSales: 29399.02 },
      { productId: 'prod_104', title: 'Smart Fitness GPS Watch Series 5', unitsSold: 64, totalSales: 15968.00 },
    ],
    categorySales: [
      { category: 'Electronics', sales: 242397.60, percentage: 65 },
      { category: 'Furniture', sales: 55876.00, percentage: 20 },
      { category: 'Wearables', sales: 31226.40, percentage: 15 }
    ]
  }));
});

app.get('/api/analytics/revenue', (req, res) => {
  res.json(buildResponse({
    grossRevenue: 329500.0,
    netProfit: 185200.0,
    averageOrderValue: 245.50,
    refundsTotal: 3400.0,
    netRevenue: 329500,
    taxAmount: 26360,
    shippingCollected: 14200
  }));
});

app.get('/api/analytics/products', (req, res) => {
  res.json(buildResponse([
    { category: 'Electronics', share: 45 },
    { category: 'Furniture', share: 20 },
    { category: 'Wearables', share: 25 },
    { category: 'Apparel', share: 10 }
  ]));
});

app.get('/api/analytics/orders', (req, res) => {
  res.json(buildResponse({ completed: 1420, processing: 85, cancelled: 32 }));
});

app.get('/api/analytics/customers', (req, res) => {
  res.json(buildResponse({ total: 4890, repeatPurchaseRate: '68%', avgOrderValue: 211.20 }));
});

app.get('/api/analytics/categories', (req, res) => {
  res.json(buildResponse(mockCategories));
});

// 13. Media API
app.post('/api/media/upload', (req, res) => {
  const media = {
    id: `media_${Date.now()}`,
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    fileName: req.body.fileName || 'asset_upload.jpg',
    sizeMb: 1.1,
    mimeType: 'image/jpeg',
    uploadedAt: new Date().toISOString()
  };
  mockMediaFiles.unshift(media);
  res.json(buildResponse(media, 'Media uploaded successfully'));
});

app.get('/api/media', (req, res) => {
  res.json(buildResponse(mockMediaFiles));
});

app.get('/api/media/:id', (req, res) => {
  const file = mockMediaFiles.find(m => m.id === req.params.id);
  res.json(buildResponse(file || mockMediaFiles[0]));
});

app.delete('/api/media/:id', (req, res) => {
  mockMediaFiles = mockMediaFiles.filter(m => m.id !== req.params.id);
  res.json(buildResponse(null, 'Media file deleted'));
});

// 14. Inventory API
app.get('/api/inventory', (req, res) => {
  res.json(buildResponse(mockProducts.map(p => ({
    productId: p.id,
    title: p.title,
    sku: p.sku,
    stock: p.stock,
    status: p.stock > 10 ? 'HEALTHY' : p.stock > 0 ? 'LOW_STOCK' : 'OUT_OF_STOCK'
  }))));
});

app.get('/api/inventory/:productId', (req, res) => {
  const p = mockProducts.find(item => item.id === req.params.productId);
  if (!p) {
    return res.status(404).json(buildResponse(null, 'Product inventory record not found', false, 'INVENTORY_NOT_FOUND'));
  }
  res.json(buildResponse({
    productId: p.id,
    title: p.title,
    sku: p.sku,
    stock: p.stock,
    status: p.stock > 10 ? 'HEALTHY' : p.stock > 0 ? 'LOW_STOCK' : 'OUT_OF_STOCK'
  }));
});

app.put('/api/inventory/:productId', (req, res) => {
  const p = mockProducts.find(item => item.id === req.params.productId);
  if (p) p.stock = req.body.stock;
  res.json(buildResponse(p, 'Inventory stock updated'));
});

// Start Express + Vite
async function startServer() {
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
    console.log(`Vynk Enterprise Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
