import { axiosInstance } from '../../core/api/axiosInstance';
import { Address } from '../../types';

export const addressApi = {
  getAddresses: async () => {
    const { data } = await axiosInstance.get<Address[]>('/api/addresses');
    return data;
  },

  getAddressById: async (id: string) => {
    const { data } = await axiosInstance.get<Address>(`/api/addresses/${id}`);
    return data;
  },

  createAddress: async (addressData: Omit<Address, 'id' | 'userId' | 'createdAt'>) => {
    const { data } = await axiosInstance.post<Address>('/api/addresses', addressData);
    return data;
  },

  updateAddress: async (id: string, addressData: Partial<Address>) => {
    const { data } = await axiosInstance.put<Address>(`/api/addresses/${id}`, addressData);
    return data;
  },

  deleteAddress: async (id: string) => {
    const { data } = await axiosInstance.delete<{ message: string }>(`/api/addresses/${id}`);
    return data;
  },
};
