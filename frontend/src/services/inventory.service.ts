import apiClient from '../core/api/axios';
import { API_ENDPOINTS } from '../core/api/apiEndpoints';

export const inventoryService = {
  getInventoryByProduct: (productId: string) =>
    apiClient.get(API_ENDPOINTS.INVENTORY.BY_PRODUCT(productId)),
};
