import { request } from './axiosClient';
import { User, Address, UserRole, UserStatus } from '../types';

export interface UserProfileResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserPermissionsResponse {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  permissions: { id: number; name: string; description: string }[];
}

export const userApi = {
  getUsers: () => request<User[]>('get', '/users'),
  getProfile: () => request<UserProfileResponse>('get', '/users/profile'),
  updateProfile: (data: { firstName: string; lastName: string }) =>
    request<UserProfileResponse>('put', '/users/profile', data),
  getUserPermissions: (userId: string | number) =>
    request<UserPermissionsResponse>('get', `/users/${userId}/permissions`),
  addUserPermission: (userId: string | number, permissionId: string | number) =>
    request<string>('post', `/users/${userId}/permissions/${permissionId}`),
  removeUserPermission: (userId: string | number, permissionId: string | number) =>
    request<string>('delete', `/users/${userId}/permissions/${permissionId}`),
  toggleUserStatus: (userId: string | number, status: UserStatus) =>
    request<User>('put', `/users/${userId}/status`, { status }),
  assignRoleToUser: (userId: string | number, role: UserRole) =>
    request<User>('put', `/users/${userId}/role`, { role }),
  getAddresses: () => request<Address[]>('get', '/addresses'),
  getDefaultAddress: () => request<Address>('get', '/addresses/default'),
  getAddressById: (addressId: string) => request<Address>('get', `/addresses/${addressId}`),
  addAddress: (address: Partial<Address>) => request<Address>('post', '/addresses', address),
  updateAddress: (id: string, address: Partial<Address>) => request<Address>('put', `/addresses/${id}`, address),
  deleteAddress: (id: string) => request<void>('delete', `/addresses/${id}`),
  setDefaultAddress: (id: string) => request<Address>('put', `/addresses/${id}/default`),
};

