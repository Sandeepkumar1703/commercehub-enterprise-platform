import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductItem } from '../data/products';

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface OrderRecord {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

interface CartContextType {
  cart: CartItem[];
  wishlist: ProductItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: ProductItem, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: ProductItem) => void;
  isInWishlist: (productId: number) => boolean;
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  taxAmount: number;
  promoDiscount: number;
  appliedPromoCode: string;
  applyPromoCode: (code: string) => boolean;
  totalAmount: number;
  orders: OrderRecord[];
  placeOrder: (shippingAddress: OrderRecord['shippingAddress'], paymentMethod: string) => OrderRecord;
  updateOrderStatus: (
    orderId: string,
    newStatus: OrderRecord['status'],
    trackingNumber?: string,
    carrier?: string
  ) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('commerce_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<ProductItem[]>(() => {
    const saved = localStorage.getItem('commerce_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    const saved = localStorage.getItem('commerce_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'ORD-98421',
        date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0],
        items: [],
        subtotal: 299.99,
        shipping: 0,
        tax: 30.00,
        total: 329.99,
        status: 'SHIPPED',
        trackingNumber: 'TRK-9902188214',
        carrier: 'FedEx Express',
        estimatedDelivery: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        shippingAddress: {
          name: 'Sandeep Prasad',
          street: '123 Enterprise Blvd, Suite 400',
          city: 'San Francisco',
          state: 'CA',
          zip: '94105',
        },
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);

  useEffect(() => {
    localStorage.setItem('commerce_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('commerce_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('commerce_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product: ProductItem, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromoCode('');
    setPromoDiscount(0);
  };

  const toggleWishlist = (product: ProductItem) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some((p) => p.id === productId);
  };

  const applyPromoCode = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'COMMERCE10') {
      setAppliedPromoCode('COMMERCE10');
      setPromoDiscount(0.10); // 10% off
      return true;
    }
    if (trimmed === 'WELCOME20') {
      setAppliedPromoCode('WELCOME20');
      setPromoDiscount(0.20); // 20% off
      return true;
    }
    return false;
  };

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * promoDiscount;
  const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);
  const shippingFee = subtotalAfterDiscount > 200 || cart.length === 0 ? 0 : 15.00;
  const taxAmount = subtotalAfterDiscount * 0.10;
  const totalAmount = subtotalAfterDiscount + shippingFee + taxAmount;

  const updateOrderStatus = (
    orderId: string,
    newStatus: OrderRecord['status'],
    trackingNumber?: string,
    carrier?: string
  ) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            status: newStatus,
            trackingNumber: trackingNumber || order.trackingNumber || `TRK-${Math.floor(100000000 + Math.random() * 900000000)}`,
            carrier: carrier || order.carrier || 'Express Courier',
            estimatedDelivery: order.estimatedDelivery || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
          };
        }
        return order;
      })
    );
  };

  const placeOrder = (shippingAddress: OrderRecord['shippingAddress']) => {
    const newOrder: OrderRecord = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      subtotal,
      shipping: shippingFee,
      tax: taxAmount,
      total: totalAmount,
      status: 'PENDING',
      shippingAddress,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        itemCount,
        subtotal,
        shippingFee,
        taxAmount,
        promoDiscount,
        appliedPromoCode,
        applyPromoCode,
        totalAmount,
        orders,
        placeOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
