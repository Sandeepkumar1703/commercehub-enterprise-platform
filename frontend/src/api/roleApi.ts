import { request } from './axiosClient';

export interface BackendRole {
  id: number;
  name: string;
  description: string;
}

export interface RolePermissionsResponse {
  roleId: number;
  roleName: string;
  permissions: {
    id: number;
    name: string;
    description: string;
  }[];
}

export const roleApi = {
  getRoles: () => request<BackendRole[]>('get', '/roles'),

  createRole: (roleData: { name: string; description: string }) =>
    request<BackendRole>('post', '/roles', roleData),

  addPermissionToRole: (roleId: number | string, permissionId: number | string) =>
    request<string>('post', `/roles/${roleId}/permissions/${permissionId}`),

  removePermissionFromRole: (roleId: number | string, permissionId: number | string) =>
    request<string>('delete', `/roles/${roleId}/permissions/${permissionId}`),

  assignRoleToUser: (userId: number | string, roleId: number | string) =>
    request<string>('post', '/roles/assign', { userId: Number(userId), roleId: Number(roleId) }),

  getRolePermissions: (roleId: number | string) =>
    request<RolePermissionsResponse>('get', `/roles/${roleId}/permissions`),

  removeRoleFromUser: (userId: number | string, roleId: number | string) =>
    request<string>('delete', '/roles/remove', undefined, { userId, roleId }),
};

