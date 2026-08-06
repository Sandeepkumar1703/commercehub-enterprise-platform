import { request } from './axiosClient';
import { Review } from '../types';

export interface ProductReviewSummary {
  productId: number | string;
  averageRating: number;
  ratingCount: number;
  ratingDistribution: {
    fiveStar: number;
    fourStar: number;
    threeStar: number;
    twoStar: number;
    oneStar: number;
  };
  reviews: Review[];
}

export const reviewApi = {
  getReviewsByProductId: (productId: string | number, page = 0, size = 10) =>
    request<ProductReviewSummary>('get', `/reviews/product/${productId}`, undefined, { page, size }),
  createReview: (review: { productId: number | string; rating: number; title: string; comment: string }) =>
    request<Review>('post', '/reviews', review),
  updateReview: (id: string | number, review: { rating: number; title: string; comment: string }) =>
    request<Review>('put', `/reviews/${id}`, review),
  deleteReview: (id: string | number) =>
    request<void>('delete', `/reviews/${id}`),
  respondToReview: (id: string | number, reply: string) =>
    request<Review>('post', `/reviews/${id}/respond`, { reply }),
};

