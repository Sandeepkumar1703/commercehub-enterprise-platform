export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/product', // Usage: /product/:id
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_EMAIL: '/verify-email',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // Customer Protected Portal
  CUSTOMER_DASHBOARD: '/customer/dashboard',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_SUCCESS: '/order-success', // Usage: /order-success/:id
  ORDER_TRACKING: '/order-tracking', // Usage: /order-tracking/:id
  ACCOUNT: '/account',
  ORDERS: '/orders',
  WISHLIST: '/wishlist',
  CHANGE_PASSWORD: '/change-password',

  // Admin Enterprise Portal
  ADMIN_DASHBOARD: '/admin',

  // Developer & Architecture Tools
  API_DOCS: '/api-docs',
  DESIGN_SYSTEM: '/design-system',
} as const;

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];
