import { axiosInstance } from '../../core/api/axiosInstance';
import { Review } from '../../types';

export const reviewApi = {
  getProductReviews: async (productId: string) => {
    const { data } = await axiosInstance.get<Review[]>(`/api/reviews/product/${productId}`);
    return data;
  },

  createReview: async (reviewData: { productId: string; rating: number; comment: string }) => {
    const { data } = await axiosInstance.post<Review>('/api/reviews', reviewData);
    return data;
  },

  updateReview: async (id: string, reviewData: Partial<Review>) => {
    const { data } = await axiosInstance.put<Review>(`/api/reviews/${id}`, reviewData);
    return data;
  },

  deleteReview: async (id: string) => {
    const { data } = await axiosInstance.delete<{ message: string }>(`/api/reviews/${id}`);
    return data;
  },
};
