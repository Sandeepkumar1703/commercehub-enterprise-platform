import { request } from './axiosClient';
import { ApiResponse, Language } from '../types';

export const languageApi = {
  getAllLanguages: (): Promise<ApiResponse<Language[]>> =>
    request<Language[]>('get', '/languages'),

  getEnabledLanguages: (): Promise<ApiResponse<Language[]>> =>
    request<Language[]>('get', '/languages/enabled'),

  getLanguageById: (id: string | number): Promise<ApiResponse<Language>> =>
    request<Language>('get', `/languages/${id}`),

  getLanguageByCode: (code: string): Promise<ApiResponse<Language>> =>
    request<Language>('get', `/languages/code/${code}`),

  createLanguage: (data: Partial<Language>): Promise<ApiResponse<Language>> =>
    request<Language>('post', '/languages', data),

  updateLanguage: (id: string | number, data: Partial<Language>): Promise<ApiResponse<Language>> =>
    request<Language>('put', `/languages/${id}`, data),

  deleteLanguage: (id: string | number): Promise<ApiResponse<void>> =>
    request<void>('delete', `/languages/${id}`),

  enableLanguage: (id: string | number): Promise<ApiResponse<void>> =>
    request<void>('patch', `/languages/${id}/enable`),

  disableLanguage: (id: string | number): Promise<ApiResponse<void>> =>
    request<void>('patch', `/languages/${id}/disable`),

  setDefaultLanguage: (id: string | number): Promise<ApiResponse<void>> =>
    request<void>('patch', `/languages/${id}/default`),

  toggleLanguage: (id: string | number, enabled: boolean): Promise<ApiResponse<void>> => {
    if (enabled) {
      return request<void>('patch', `/languages/${id}/enable`);
    } else {
      return request<void>('patch', `/languages/${id}/disable`);
    }
  },
};
