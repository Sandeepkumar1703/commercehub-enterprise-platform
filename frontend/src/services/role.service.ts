import apiClient from '../core/api/axios';
import { API_ENDPOINTS } from '../core/api/apiEndpoints';

export const roleService = {
  getRoles: () => apiClient.get(API_ENDPOINTS.ROLES.BASE),

  createRole: (payload: Record<string, any>) =>
    apiClient.post(API_ENDPOINTS.ROLES.BASE, payload),

  assignRole: (userId: string, roleName: string) =>
    apiClient.post(API_ENDPOINTS.ROLES.ASSIGN, { userId, roleName }),

  removeRole: (userId: string, roleName: string) =>
    apiClient.delete(API_ENDPOINTS.ROLES.REMOVE, { data: { userId, roleName } }),
};
