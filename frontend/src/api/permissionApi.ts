import { request } from './axiosClient';

export interface BackendPermission {
  id: number;
  name: string;
  description: string;
}

export const permissionApi = {
  getAllPermissions: () =>
    request<BackendPermission[]>('get', '/permissions'),

  getPermissionById: (id: number | string) =>
    request<BackendPermission>('get', `/permissions/${id}`),

  createPermission: (data: { name: string; description: string }) =>
    request<BackendPermission>('post', '/permissions', data),

  updatePermission: (id: number | string, data: { name: string; description: string }) =>
    request<BackendPermission>('put', `/permissions/${id}`, data),

  deletePermission: (id: number | string) =>
    request<void>('delete', `/permissions/${id}`),
};

