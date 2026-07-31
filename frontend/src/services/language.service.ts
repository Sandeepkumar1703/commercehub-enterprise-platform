import apiClient from '../core/api/axios';
import { API_ENDPOINTS } from '../core/api/apiEndpoints';

export const languageService = {
  getLanguages: () => apiClient.get(API_ENDPOINTS.LANGUAGES.BASE),

  createLanguage: (payload: Record<string, any>) =>
    apiClient.post(API_ENDPOINTS.LANGUAGES.BASE, payload),

  getLanguageById: (id: string) => apiClient.get(API_ENDPOINTS.LANGUAGES.BY_ID(id)),

  updateLanguage: (id: string, payload: Record<string, any>) =>
    apiClient.put(API_ENDPOINTS.LANGUAGES.BY_ID(id), payload),

  deleteLanguage: (id: string) => apiClient.delete(API_ENDPOINTS.LANGUAGES.BY_ID(id)),

  enableLanguage: (id: string) => apiClient.patch(API_ENDPOINTS.LANGUAGES.ENABLE(id)),

  disableLanguage: (id: string) => apiClient.patch(API_ENDPOINTS.LANGUAGES.DISABLE(id)),

  setDefaultLanguage: (id: string) => apiClient.patch(API_ENDPOINTS.LANGUAGES.DEFAULT(id)),

  getEnabledLanguages: () => apiClient.get(API_ENDPOINTS.LANGUAGES.ENABLED),

  getLanguageByCode: (code: string) => apiClient.get(API_ENDPOINTS.LANGUAGES.BY_CODE(code)),
};
