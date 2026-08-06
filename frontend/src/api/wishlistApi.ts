import { request } from './axiosClient';
import { WishlistItem } from '../types';

export const wishlistApi = {
  getWishlist: () => request<WishlistItem[]>('get', '/wishlist'),
  addToWishlist: (productId: string | number) => request<WishlistItem>('post', `/wishlist/${productId}`),
  removeFromWishlist: (productId: string | number) => request<void>('delete', `/wishlist/${productId}`),
};
