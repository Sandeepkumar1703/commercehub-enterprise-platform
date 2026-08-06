import { request } from './axiosClient';
import { Cart } from '../types';

export const cartApi = {
  getCart: () => request<Cart>('get', '/cart'),
  addToCart: (productId: string | number, _quantity = 1) => request<Cart>('post', `/cart/${productId}`),
  updateCartItem: (cartItemId: string | number, quantity: number) =>
    request<Cart>('put', `/cart/items/${cartItemId}`, { quantity }),
  removeFromCart: (cartItemId: string | number) => request<void>('delete', `/cart/items/${cartItemId}`),
  clearCart: () => request<void>('delete', '/cart'),
};
