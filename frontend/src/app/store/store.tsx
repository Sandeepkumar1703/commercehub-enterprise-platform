import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Product, Order, CartItem, Seller, AuditLog } from '../../shared/types';
import { tokenStorage } from '../../core/auth/tokenStorage';
import { api } from '../../core/api/apiClient';
import { authService } from "../../features/auth/services/authService";

export type PortalType = 'marketing' | 'customer' | 'seller' | 'admin' | 'auth' | 'system';
export type AuthView = 'login' | 'register' | 'forgot' | 'reset' | 'otp' | 'verify-email';
export type CustomerView = 'plp' | 'pdp' | 'account' | 'tracking';
export type SellerView = 'dashboard' | 'add-product' | 'inventory' | 'wallet';
export type AdminView = 'dashboard' | 'users' | 'audit';
export type SystemView = '404' | '403' | '500' | 'invoice';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}

interface AppContextType {
  portal: PortalType;
  setPortal: (p: PortalType) => void;
  authView: AuthView;
  setAuthView: (v: AuthView) => void;
  customerView: CustomerView;
  setCustomerView: (v: CustomerView) => void;
  sellerView: SellerView;
  setSellerView: (v: SellerView) => void;
  adminView: AdminView;
  setAdminView: (v: AdminView) => void;
  systemView: SystemView;
  setSystemView: (v: SystemView) => void;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  selectedOrderId: string;
  setSelectedOrderId: (id: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currentUser: User;
  setCurrentUser: (u: User) => void;
  logout: () => Promise<void>;
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  products: Product[];
  refreshProducts: () => Promise<void>;
  addProduct: (newProd: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount'>) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  deleteProduct: (productId: string) => void;
  orders: Order[];
  placeOrder: (shippingInfo: any, paymentMethod: string) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  auditLogs: AuditLog[];
  addAuditLog: (action: AuditLog['actionType'], entity: string, targetId: string, before?: any, after?: any) => void;
  sellers: Seller[];
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portal, setPortal] = useState<PortalType>('auth');
  const [authView, setAuthView] = useState<AuthView>('login');
  const [customerView, setCustomerView] = useState<CustomerView>('plp');
  const [sellerView, setSellerView] = useState<SellerView>('dashboard');
  const [adminView, setAdminView] = useState<AdminView>('dashboard');
  const [systemView, setSystemView] = useState<SystemView>('404');
  const [selectedProductId, setSelectedProductId] = useState<string>('PRD-8021');
  const [selectedOrderId, setSelectedOrderId] = useState<string>('ORD-9482');

  const [theme, setThemeState] = useState<'light' | 'dark'>(() => tokenStorage.getTheme());
  const [currentUser, setCurrentUserState] = useState<User | null>(() => tokenStorage.getCurrentUser());
  const [products, setProducts] = useState<Product[]>(() => tokenStorage.getProducts());
  const [orders, setOrders] = useState<Order[]>(() => tokenStorage.getOrders());
  const [sellers] = useState<Seller[]>(() => tokenStorage.getSellers());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => tokenStorage.getAuditLogs());
  const [users, setUsersState] = useState<User[]>(() => tokenStorage.getUsers());
  const [cart, setCart] = useState<CartItem[]>(() => tokenStorage.getCart());
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(() => tokenStorage.getWishlist());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const setUsers: React.Dispatch<React.SetStateAction<User[]>> = (action) => {
    setUsersState(prev => {
      const updated = typeof action === 'function' ? action(prev) : action;
      tokenStorage.saveUsers(updated);
      return updated;
    });
  };

  useEffect(() => {
    const root = document.documentElement;
    theme === 'dark' ? root.classList.add('dark') : root.classList.remove('dark');
    tokenStorage.setTheme(theme);
  }, [theme]);

  const refreshProducts = useCallback(async () => {
    try {
      const res = await api.products.getAll();
      if (res && res.length > 0) {
        const formatted: Product[] = res.map((p: any) => ({
          id: String(p.id).startsWith('PRD-') ? p.id : `PRD-${p.id}`,
          title: p.name || 'Untitled',
          subtitle: p.description?.substring(0, 50) || 'Product',
          description: p.description || '',
          price: p.price || 0,
          originalPrice: p.price ? Math.round(p.price * 1.2) : 0,
          brand: p.brand || 'CommerceHub',
          category: p.categoryName || 'General',
          rating: 4.5,
          reviewCount: 10,
          stockQuantity: p.stockQuantity || 0,
          inStock: (p.stockQuantity || 0) > 0,
          status: (p.stockQuantity || 0) > 5 ? 'published' : 'low_stock',
          createdAt: new Date().toISOString(),
          sku: p.sku || `SKU-${p.id}`,
          images: [p.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'],
          specs: { 'Source': 'API' },
          materials: ['Premium'],
          sellerId: 'SLR-101',
          sellerName: 'Official Store',
          attributes: [],
          tags: []
        }));
        setProducts(formatted);
        tokenStorage.saveProducts(formatted);
      }
    } catch (err) {
      console.error("API Error:", err);
    }
  }, []);

  const toggleTheme = () => setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  const setCurrentUser = (user: User) => {
    setCurrentUserState(user);
    tokenStorage.setCurrentUser(user);
  };

  const logout = async () => {
  try {
    await authService.logout();
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    tokenStorage.clearTokens();
    setCurrentUserState(tokenStorage.getCurrentUser());

    setPortal("auth");
    setAuthView("login");

    window.location.hash = "login";
  }
};

  const showToast = (title: string, message?: string, type: ToastMessage['type'] = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const dismissToast = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.product.id === product.id && i.selectedColor === color && i.selectedSize === size);
      let updated;
      if (idx > -1) {
        updated = [...prev];
        updated[idx].quantity += quantity;
      } else {
        updated = [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
      }
      tokenStorage.saveCart(updated);
      return updated;
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const updated = prev.filter(i => i.product.id !== productId);
      tokenStorage.saveCart(updated);
      return updated;
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prev => {
      const updated = prev.map(item => (item.product.id === productId ? { ...item, quantity } : item));
      tokenStorage.saveCart(updated);
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    tokenStorage.saveCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const updated = prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId];
      tokenStorage.saveWishlist(updated);
      return updated;
    });
  };

  const addAuditLog = (action: AuditLog['actionType'], entity: string, targetId: string, before?: any, after?: any) => {
    const newLog: AuditLog = {
      id: 'LOG-' + Date.now(),
      timestamp: new Date().toISOString(),
      actorId: currentUser.id,
      actorName: currentUser.name,
      actorRole: currentUser.role,
      ipAddress: '127.0.0.1',
      geoLocation: 'Local',
      actionType: action,
      targetEntity: entity,
      targetId,
      beforeState: before,
      afterState: after
    };
    setAuditLogs(prev => {
      const updated = [newLog, ...prev];
      tokenStorage.saveAuditLogs(updated);
      return updated;
    });
  };

  const addProduct = (newProd: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount'>) => {
    const created: Product = { ...newProd, id: 'PRD-' + Math.floor(Math.random() * 10000), createdAt: new Date().toISOString(), rating: 5, reviewCount: 0 };
    setProducts(prev => {
      const updated = [created, ...prev];
      tokenStorage.saveProducts(updated);
      return updated;
    });
    api.products.create({ name: created.title, description: created.description, price: created.price, stockQuantity: created.stockQuantity, imageUrl: created.images[0], sku: created.sku }).catch(() => {});
  };

  const updateProductStock = (productId: string, newStock: number) => {
    setProducts(prev => {
      const updated = prev.map(p => (p.id === productId ? { ...p, stockQuantity: newStock, inStock: newStock > 0 } : p));
      tokenStorage.saveProducts(updated);
      return updated;
    });
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => {
      const updated = prev.filter(p => p.id !== productId);
      tokenStorage.saveProducts(updated);
      return updated;
    });
    api.products.delete(productId.replace('PRD-', '')).catch(() => {});
  };

  const placeOrder = (shippingInfo: any, paymentMethod: string): Order => {
    const newOrder: Order = {
      id: 'ORD-' + Date.now(),
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      shippingAddress: shippingInfo,
      items: cart.map(i => ({ productId: i.product.id, title: i.product.title, price: i.product.price, image: i.product.images[0], quantity: i.quantity })),
      totalAmount: cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0),
      taxAmount: 0,
      shippingFee: 0,
      paymentMethod,
      paymentStatus: 'paid',
      status: 'processing',
      createdAt: new Date().toISOString(),
      estimatedDelivery: '3 Days'
    };
    setOrders(prev => {
      const updated = [newOrder, ...prev];
      tokenStorage.saveOrders(updated);
      return updated;
    });
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => {
      const updated = prev.map(o => (o.id === orderId ? { ...o, status } : o));
      tokenStorage.saveOrders(updated);
      return updated;
    });
  };

  return (
    <AppContext.Provider value={{
      portal, setPortal, authView, setAuthView, customerView, setCustomerView,
      sellerView, setSellerView, adminView, setAdminView, systemView, setSystemView,
      selectedProductId, setSelectedProductId, selectedOrderId, setSelectedOrderId,
      theme, toggleTheme, currentUser, setCurrentUser, logout,
      cart, cartOpen, setCartOpen, addToCart, removeFromCart, updateCartQuantity, clearCart,
      wishlist, toggleWishlist, products, refreshProducts, addProduct, updateProductStock, deleteProduct,
      orders, placeOrder, updateOrderStatus, auditLogs, addAuditLog, sellers, users, setUsers,
      toasts, showToast, dismissToast, commandPaletteOpen, setCommandPaletteOpen, searchQuery, setSearchQuery
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};