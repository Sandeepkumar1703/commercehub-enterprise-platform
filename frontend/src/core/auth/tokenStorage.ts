import { User, Product, Order, Seller, AuditLog, CartItem } from '../../shared/types';
import { INITIAL_USERS, MOCK_PRODUCTS, MOCK_ORDERS, MOCK_SELLERS, MOCK_AUDIT_LOGS } from './mockData';

const STORAGE_KEYS = {
  CURRENT_USER: 'ch_current_user',
  USERS: 'ch_users',
  TOKEN: 'ch_auth_token',
  REFRESH_TOKEN: 'ch_refresh_token',
  PRODUCTS: 'ch_products',
  ORDERS: 'ch_orders',
  SELLERS: 'ch_sellers',
  AUDIT_LOGS: 'ch_audit_logs',
  CART: 'ch_cart',
  WISHLIST: 'ch_wishlist',
  THEME: 'ch_theme'
};

export const tokenStorage = {
  getAuthToken: (): string | null => localStorage.getItem(STORAGE_KEYS.TOKEN),
  setAuthToken: (token: string) => localStorage.setItem(STORAGE_KEYS.TOKEN, token),
  
  // This fixes the 'clearTokens' error
  clearTokens: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
    });
},

  removeAuthToken: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  setTokens: (accessToken: string, refreshToken?: string) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, accessToken);
    if (refreshToken) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }
  },

  getRefreshToken: (): string | null => localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),

  getCurrentUser: (): User | null => {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);

  if (data) {
    try {
      return JSON.parse(data);
    } catch {}
  }

  return null;
},

  setCurrentUser: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },

  getUsers: (): User[] => {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    if (data) {
      try { return JSON.parse(data); } catch { }
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
  },

  getProducts: (): Product[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (data) {
      try { return JSON.parse(data); } catch { }
    }
    return MOCK_PRODUCTS;
  },

  saveProducts: (products: Product[]) => {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
},

getOrders: (): Order[] => {
  const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {}
  }

  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(MOCK_ORDERS));
  return MOCK_ORDERS;
},

saveOrders: (orders: Order[]) => {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
},

saveUsers: (users: User[]) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
},

getSellers: (): Seller[] => {
  const data = localStorage.getItem(STORAGE_KEYS.SELLERS);

  if (data) {
    try {
      return JSON.parse(data);
    } catch {}
  }

  localStorage.setItem(STORAGE_KEYS.SELLERS, JSON.stringify(MOCK_SELLERS));
  return MOCK_SELLERS;
},

getAuditLogs: (): AuditLog[] => {
  const data = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);

  if (data) {
    try {
      return JSON.parse(data);
    } catch {}
  }

  localStorage.setItem(
    STORAGE_KEYS.AUDIT_LOGS,
    JSON.stringify(MOCK_AUDIT_LOGS)
  );

  return MOCK_AUDIT_LOGS;
},

saveAuditLogs: (logs: AuditLog[]) => {
  localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs));
},

getWishlist: (): string[] => {
  const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);

  if (data) {
    try {
      return JSON.parse(data);
    } catch {}
  }

  return [];
},

saveWishlist: (wishlist: string[]) => {
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
},

  getCart: (): CartItem[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CART);
    if (data) {
      try { return JSON.parse(data); } catch { }
    }
    return [];
  },

  saveCart: (cart: CartItem[]) => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  },

  getTheme: (): 'light' | 'dark' => {
    return (localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark') || 'light';
  },

  setTheme: (theme: 'light' | 'dark') => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }
};