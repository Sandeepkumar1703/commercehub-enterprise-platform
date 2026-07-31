import { axiosInstance } from '../../core/api/axiosInstance';
import { User } from '../../types';

export const userApi = {
  getProfile: async () => {
    const { data } = await axiosInstance.get<any>('/api/users/profile');
    return data?.data || data;
  },

  updateProfile: async (userData: Partial<User>) => {
    const { data } = await axiosInstance.put<any>('/api/users/profile', userData);
    return data?.data || data;
  },

  deleteAccount: async () => {
    const { data } = await axiosInstance.delete<{ message: string }>('/api/users/account');
    return data;
  },
};
