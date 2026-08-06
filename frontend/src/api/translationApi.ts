import { request } from './axiosClient';
import { ApiResponse } from '../types';

export interface TranslationKey {
  id?: number;
  keyName: string;
  languageId?: number;
  languageCode?: string;
  languageName?: string;
  value?: string;
  category?: string;
  description?: string;
}

export interface TranslationValue {
  id?: number;
  translationKeyId?: number;
  keyName?: string;
  languageId?: number;
  languageCode?: string;
  languageName?: string;
  value: string;
}

export const translationApi = {
  getTranslationMap: (languageCode: string): Promise<ApiResponse<Record<string, string>> | Record<string, string>> =>
    request<Record<string, string>>('get', `/translations/map/${languageCode}`),

  getTranslationsByLanguage: (languageCode: string): Promise<ApiResponse<TranslationValue[]> | TranslationValue[]> =>
    request<TranslationValue[]>('get', `/translations/language/${languageCode}`),

  // Translation Keys
  getKeys: (): Promise<ApiResponse<TranslationKey[]> | TranslationKey[]> =>
    request<TranslationKey[]>('get', '/translations/keys'),

  getKeyById: (id: string | number): Promise<ApiResponse<TranslationKey> | TranslationKey> =>
    request<TranslationKey>('get', `/translations/keys/${id}`),

  createKey: (data: { keyName: string; value?: string; languageId?: number }): Promise<ApiResponse<TranslationKey> | TranslationKey> =>
    request<TranslationKey>('post', '/translations/keys', data),

  updateKey: (id: string | number, data: { value: string }): Promise<ApiResponse<TranslationKey> | TranslationKey> =>
    request<TranslationKey>('put', `/translations/keys/${id}`, data),

  deleteKey: (id: string | number): Promise<ApiResponse<void>> =>
    request<void>('delete', `/translations/keys/${id}`),

  // Translation Values
  getValues: (): Promise<ApiResponse<TranslationValue[]> | TranslationValue[]> =>
    request<TranslationValue[]>('get', '/translations/values'),

  getValueById: (id: string | number): Promise<ApiResponse<TranslationValue> | TranslationValue> =>
    request<TranslationValue>('get', `/translations/values/${id}`),

  createValue: (data: { translationKeyId?: number; languageId?: number; languageCode?: string; key?: string; value: string }): Promise<ApiResponse<TranslationValue> | TranslationValue> =>
    request<TranslationValue>('post', '/translations/values', data),

  updateValue: (id: string | number, data: { value: string }): Promise<ApiResponse<TranslationValue> | TranslationValue> =>
    request<TranslationValue>('put', `/translations/values/${id}`, data),

  deleteValue: (id: string | number): Promise<ApiResponse<void>> =>
    request<void>('delete', `/translations/values/${id}`),
};
