import { request } from './axiosClient';
import { Address } from '../types';

export const addressApi = {
  getAddresses: () => request<Address[]>('get', '/addresses'),
  getDefaultAddress: () => request<Address>('get', '/addresses/default'),
  getAddressById: (addressId: string | number) => request<Address>('get', `/addresses/${addressId}`),
  addAddress: (address: Partial<Address>) => request<Address>('post', '/addresses', address),
  createAddress: (address: Partial<Address>) => request<Address>('post', '/addresses', address),
  updateAddress: (addressId: string | number, address: Partial<Address>) =>
    request<Address>('put', `/addresses/${addressId}`, address),
  deleteAddress: (addressId: string | number) => request<void>('delete', `/addresses/${addressId}`),
  setDefaultAddress: (addressId: string | number) =>
    request<Address>('put', `/addresses/${addressId}/default`),
};
