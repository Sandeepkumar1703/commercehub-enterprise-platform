import apiClient from '../core/api/axios';
import { API_ENDPOINTS } from '../core/api/apiEndpoints';

export const mediaService = {
  uploadMedia: (formData: FormData) =>
    apiClient.post(API_ENDPOINTS.MEDIA.UPLOAD, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  getAllMedia: () => apiClient.get(API_ENDPOINTS.MEDIA.BASE),

  getMediaById: (id: string) => apiClient.get(API_ENDPOINTS.MEDIA.BY_ID(id)),

  getMediaByUser: (userId: string) => apiClient.get(API_ENDPOINTS.MEDIA.BY_USER(userId)),

  deleteMedia: (id: string) => apiClient.delete(API_ENDPOINTS.MEDIA.BY_ID(id)),
};
