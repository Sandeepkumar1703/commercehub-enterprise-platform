import apiClient from '../core/api/axios';
import { API_ENDPOINTS } from '../core/api/apiEndpoints';

export const cartService = {
  getCart: () => apiClient.get(API_ENDPOINTS.CART.BASE),

  addToCart: (productId: string, quantity: number = 1) =>
    apiClient.post(API_ENDPOINTS.CART.ADD(productId), { quantity }),

  updateCartItem: (cartItemId: string, quantity: number) =>
    apiClient.put(API_ENDPOINTS.CART.ITEM(cartItemId), { quantity }),

  removeCartItem: (cartItemId: string) =>
    apiClient.delete(API_ENDPOINTS.CART.ITEM(cartItemId)),

  clearCart: () => apiClient.delete(API_ENDPOINTS.CART.BASE),
};
