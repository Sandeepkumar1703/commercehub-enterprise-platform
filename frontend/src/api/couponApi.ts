import { axiosClient } from './axiosClient';
import { ApiResponse, Coupon } from '../types';

export const couponApi = {
  applyCoupon: async (code: string): Promise<ApiResponse<Coupon>> => {
    const response = await axiosClient.post('/coupons/apply', { code });
    return response.data;
  },

  getCoupons: async (): Promise<ApiResponse<Coupon[]>> => {
    const response = await axiosClient.get('/coupons');
    return response.data;
  },

  createCoupon: async (data: Partial<Coupon>): Promise<ApiResponse<Coupon>> => {
    const response = await axiosClient.post('/coupons', data);
    return response.data;
  },
};
