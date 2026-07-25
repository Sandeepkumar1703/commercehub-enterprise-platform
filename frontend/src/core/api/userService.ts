import { ApiClient } from './apiClient';

export interface UserProfileData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles?: string[];
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: UserProfileData;
  timestamp: string;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
}

export const userService = {
  // GET /api/users/profile
  async getProfile(): Promise<UserProfileResponse> {
    return await ApiClient.get<UserProfileResponse>('/api/users/profile');
  },

  // PUT /api/users/profile
  async updateProfile(data: UpdateProfileRequest): Promise<UserProfileResponse> {
    return await ApiClient.put<UserProfileResponse>('/api/users/profile', data);
  },
};
