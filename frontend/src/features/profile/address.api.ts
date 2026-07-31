import { axiosInstance } from '../../core/api/axiosInstance';
import { Address } from '../../types';

export const addressApi = {
  getAddresses: async () => {
    const { data } = await axiosInstance.get<any>('/api/addresses');
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  },

  getAddressById: async (id: string) => {
    const { data } = await axiosInstance.get<any>(`/api/addresses/${id}`);
    return data?.data || data;
  },

  createAddress: async (addressData: Omit<Address, 'id' | 'userId' | 'createdAt'>) => {
    const { data } = await axiosInstance.post<any>('/api/addresses', addressData);
    return data?.data || data;
  },

  updateAddress: async (id: string, addressData: Partial<Address>) => {
    const { data } = await axiosInstance.put<any>(`/api/addresses/${id}`, addressData);
    return data?.data || data;
  },

  deleteAddress: async (id: string) => {
    const { data } = await axiosInstance.delete<{ message: string }>(`/api/addresses/${id}`);
    return data;
  },
};
