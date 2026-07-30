import { axiosInstance } from '../../core/api/axiosInstance';
import { Cart } from '../../types';

export const cartApi = {
  getCart: async () => {
    const { data } = await axiosInstance.get<Cart>('/api/cart');
    return data;
  },

  addItem: async (productId: string, quantity = 1) => {
    const { data } = await axiosInstance.post<Cart>('/api/cart/items', { productId, quantity });
    return data;
  },

  updateItemQuantity: async (itemId: string, quantity: number) => {
    const { data } = await axiosInstance.put<Cart>(`/api/cart/items/${itemId}`, { quantity });
    return data;
  },

  removeItem: async (itemId: string) => {
    const { data } = await axiosInstance.delete<Cart>(`/api/cart/items/${itemId}`);
    return data;
  },

  clearCart: async () => {
    const { data } = await axiosInstance.delete<Cart>('/api/cart');
    return data;
  },
};
