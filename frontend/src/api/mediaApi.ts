import { request, axiosClient } from './axiosClient';
import { MediaFile, ApiResponse } from '../types';

export const mediaApi = {
  uploadMedia: async (file: File | string, userId?: number | string): Promise<ApiResponse<MediaFile>> => {
    if (typeof file === 'string') {
      return request<MediaFile>('post', '/media/upload', { fileName: file }, userId ? { userId } : undefined);
    }
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosClient.post<ApiResponse<MediaFile>>('/media/upload', formData, {
      params: userId ? { userId } : undefined,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  getMediaList: () => request<MediaFile[]>('get', '/media'),
  getMediaById: (id: string | number) => request<MediaFile>('get', `/media/${id}`),
  deleteMedia: (id: string | number) => request<void>('delete', `/media/${id}`),
  getUserMedia: (userId: number | string) => request<MediaFile[]>('get', `/media/user/${userId}`),
};

