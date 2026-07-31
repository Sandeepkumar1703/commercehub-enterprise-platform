import { axiosInstance } from '../../core/api/axiosInstance';
import { WishlistItem } from '../../types';

export const wishlistApi = {
  getWishlist: async () => {
    const { data } = await axiosInstance.get<any>('/api/wishlist');
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
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
