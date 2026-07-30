import { axiosInstance } from '../../core/api/axiosInstance';
import { Coupon } from '../../types';

export const couponApi = {
  getCoupons: async () => {
    const { data } = await axiosInstance.get<Coupon[]>('/api/coupons');
    return data;
  },

  validateCoupon: async (code: string, cartSubtotal: number) => {
    const { data } = await axiosInstance.post<{ valid: boolean; coupon?: Coupon; message: string }>('/api/coupons/validate', {
      code,
      cartSubtotal,
    });
    return data;
  },

  createCoupon: async (couponData: Partial<Coupon>) => {
    const { data } = await axiosInstance.post<Coupon>('/api/coupons', couponData);
    return data;
  },

  updateCoupon: async (id: string, couponData: Partial<Coupon>) => {
    const { data } = await axiosInstance.put<Coupon>(`/api/coupons/${id}`, couponData);
    return data;
  },

  deleteCoupon: async (id: string) => {
    const { data } = await axiosInstance.delete<{ message: string }>(`/api/coupons/${id}`);
    return data;
  },
};
