import apiClient from '../core/api/axios';
import { API_ENDPOINTS } from '../core/api/apiEndpoints';

export const userService = {
  getProfile: () => apiClient.get(API_ENDPOINTS.USERS.PROFILE),

  updateProfile: (payload: Record<string, any>) =>
    apiClient.put(API_ENDPOINTS.USERS.PROFILE, payload),
};
