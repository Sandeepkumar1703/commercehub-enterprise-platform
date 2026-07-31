import apiClient from '../core/api/axios';
import { API_ENDPOINTS } from '../core/api/apiEndpoints';

export const addressService = {
  getAddresses: () => apiClient.get(API_ENDPOINTS.ADDRESSES.BASE),

  createAddress: (payload: Record<string, any>) =>
    apiClient.post(API_ENDPOINTS.ADDRESSES.BASE, payload),

  getAddressById: (addressId: string) =>
    apiClient.get(API_ENDPOINTS.ADDRESSES.BY_ID(addressId)),

  updateAddress: (addressId: string, payload: Record<string, any>) =>
    apiClient.put(API_ENDPOINTS.ADDRESSES.BY_ID(addressId), payload),

  deleteAddress: (addressId: string) =>
    apiClient.delete(API_ENDPOINTS.ADDRESSES.BY_ID(addressId)),

  getDefaultAddress: () => apiClient.get(API_ENDPOINTS.ADDRESSES.DEFAULT),

  setDefaultAddress: (addressId: string) =>
    apiClient.put(API_ENDPOINTS.ADDRESSES.SET_DEFAULT(addressId)),
};
