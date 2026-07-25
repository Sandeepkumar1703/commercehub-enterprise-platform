import { ApiClient } from './apiClient';

export interface RoleItem {
  id: number;
  name: string;
  description: string;
}

export interface CreateRoleRequest {
  name: string;
  description: string;
}

export interface AssignRoleRequest {
  userId: number;
  roleId: number;
}

export const roleService = {
  // GET /api/roles
  async getAllRoles(): Promise<RoleItem[]> {
    return await ApiClient.get<RoleItem[]>('/api/roles');
  },

  // POST /api/roles
  async createRole(data: CreateRoleRequest): Promise<RoleItem> {
    return await ApiClient.post<RoleItem>('/api/roles', data);
  },

  // POST /api/roles/assign
  async assignRole(data: AssignRoleRequest): Promise<string> {
    return await ApiClient.post<string>('/api/roles/assign', data);
  },

  // DELETE /api/roles/remove?userId={userId}&roleId={roleId}
  async removeRole(userId: number, roleId: number): Promise<string> {
    return await ApiClient.delete<string>(`/api/roles/remove?userId=${userId}&roleId=${roleId}`);
  },
};
