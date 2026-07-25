import { ApiClient } from './apiClient';

export const testService = {
  // GET /api/test/public
  async getPublicTest(): Promise<string> {
    return await ApiClient.get<string>('/api/test/public');
  },

  // GET /api/test/private
  async getPrivateTest(): Promise<string> {
    return await ApiClient.get<string>('/api/test/private');
  },
};
