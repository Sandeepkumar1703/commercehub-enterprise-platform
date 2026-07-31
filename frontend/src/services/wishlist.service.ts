import apiClient from '../core/api/axios';
import { API_ENDPOINTS } from '../core/api/apiEndpoints';

export const wishlistService = {
  getWishlist: () => apiClient.get(API_ENDPOINTS.WISHLIST.BASE),

  addToWishlist: (productId: string) =>
    apiClient.post(API_ENDPOINTS.WISHLIST.ITEM(productId)),

  removeFromWishlist: (productId: string) =>
    apiClient.delete(API_ENDPOINTS.WISHLIST.ITEM(productId)),
};
