import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem, Product } from '../../types';

interface CartState {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  isOpen: false,
  isLoading: false,
  error: null,
};

const recalculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.price || item.product?.price || 0) * item.quantity, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart | null>) => {
      state.cart = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    toggleCartDrawer: (state, action?: PayloadAction<boolean>) => {
      state.isOpen = action?.payload !== undefined ? action.payload : !state.isOpen;
    },
    setCartLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCartError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    optimisticAddItem: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      if (!state.cart) {
        const newItem: CartItem = {
          id: `opt-${Date.now()}`,
          cartId: `opt-cart-${Date.now()}`,
          productId: action.payload.product.id,
          product: action.payload.product,
          quantity: action.payload.quantity,
          price: action.payload.product.price,
        };
        const subtotal = newItem.price * newItem.quantity;
        state.cart = {
          id: newItem.cartId,
          userId: 'me',
          items: [newItem],
          subtotal,
          discount: 0,
          tax: subtotal * 0.08,
          shippingFee: 0,
          total: subtotal * 1.08,
          createdAt: new Date().toISOString(),
        };
        return;
      }

      const existingIndex = state.cart.items.findIndex((i) => i.productId === action.payload.product.id);
      if (existingIndex >= 0) {
        state.cart.items[existingIndex].quantity += action.payload.quantity;
      } else {
        const newItem: CartItem = {
          id: `opt-${Date.now()}`,
          cartId: state.cart.id,
          productId: action.payload.product.id,
          product: action.payload.product,
          quantity: action.payload.quantity,
          price: action.payload.product.price,
        };
        state.cart.items.push(newItem);
      }

      state.cart.subtotal = recalculateSubtotal(state.cart.items);
      state.cart.tax = state.cart.subtotal * 0.08;
      state.cart.total = state.cart.subtotal + state.cart.tax + (state.cart.shippingFee || 0) - (state.cart.discount || 0);
    },
    optimisticUpdateQuantity: (state, action: PayloadAction<{ itemId: string; quantity: number }>) => {
      if (!state.cart) return;
      if (action.payload.quantity <= 0) {
        state.cart.items = state.cart.items.filter((i) => i.id !== action.payload.itemId);
      } else {
        const item = state.cart.items.find((i) => i.id === action.payload.itemId);
        if (item) {
          item.quantity = action.payload.quantity;
        }
      }
      state.cart.subtotal = recalculateSubtotal(state.cart.items);
      state.cart.tax = state.cart.subtotal * 0.08;
      state.cart.total = state.cart.subtotal + state.cart.tax + (state.cart.shippingFee || 0) - (state.cart.discount || 0);
    },
  },
});

export const {
  setCart,
  toggleCartDrawer,
  setCartLoading,
  setCartError,
  optimisticAddItem,
  optimisticUpdateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;


