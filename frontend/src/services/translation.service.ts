import apiClient from '../core/api/axios';
import { API_ENDPOINTS } from '../core/api/apiEndpoints';

export const translationService = {
  getKeys: () => apiClient.get(API_ENDPOINTS.TRANSLATIONS.KEYS),

  createKey: (payload: Record<string, any>) =>
    apiClient.post(API_ENDPOINTS.TRANSLATIONS.KEYS, payload),

  getKeyById: (id: string) => apiClient.get(API_ENDPOINTS.TRANSLATIONS.KEY_BY_ID(id)),

  updateKey: (id: string, payload: Record<string, any>) =>
    apiClient.put(API_ENDPOINTS.TRANSLATIONS.KEY_BY_ID(id), payload),

  deleteKey: (id: string) => apiClient.delete(API_ENDPOINTS.TRANSLATIONS.KEY_BY_ID(id)),

  getValues: () => apiClient.get(API_ENDPOINTS.TRANSLATIONS.VALUES),

  createValue: (payload: Record<string, any>) =>
    apiClient.post(API_ENDPOINTS.TRANSLATIONS.VALUES, payload),

  getValueById: (id: string) => apiClient.get(API_ENDPOINTS.TRANSLATIONS.VALUE_BY_ID(id)),

  updateValue: (id: string, payload: Record<string, any>) =>
    apiClient.put(API_ENDPOINTS.TRANSLATIONS.VALUE_BY_ID(id), payload),

  deleteValue: (id: string) => apiClient.delete(API_ENDPOINTS.TRANSLATIONS.VALUE_BY_ID(id)),

  getTranslationMap: (languageCode: string) =>
    apiClient.get(API_ENDPOINTS.TRANSLATIONS.MAP(languageCode)),

  getByLanguage: (languageCode: string) =>
    apiClient.get(API_ENDPOINTS.TRANSLATIONS.BY_LANGUAGE(languageCode)),
};
