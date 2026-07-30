import { axiosInstance } from '../../core/api/axiosInstance';
import { User } from '../../types';

export const userApi = {
  getProfile: async () => {
    const { data } = await axiosInstance.get<User>('/api/users/profile');
    return data;
  },

  updateProfile: async (userData: Partial<User>) => {
    const { data } = await axiosInstance.put<User>('/api/users/profile', userData);
    return data;
  },

  deleteAccount: async () => {
    const { data } = await axiosInstance.delete<{ message: string }>('/api/users/account');
    return data;
  },
};
