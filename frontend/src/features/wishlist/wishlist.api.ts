import { axiosInstance } from '../../core/api/axiosInstance';
import { WishlistItem } from '../../types';

export const wishlistApi = {
  getWishlist: async () => {
    const { data } = await axiosInstance.get<WishlistItem[]>('/api/wishlist');
    return data;
  },

  addToWishlist: async (productId: string) => {
    const { data } = await axiosInstance.post<WishlistItem[]>(`/api/wishlist/${productId}`);
    return data;
  },

  removeFromWishlist: async (productId: string) => {
    const { data } = await axiosInstance.delete<WishlistItem[]>(`/api/wishlist/${productId}`);
    return data;
  },
};
