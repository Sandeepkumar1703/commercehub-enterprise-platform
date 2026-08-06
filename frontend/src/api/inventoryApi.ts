import { request } from './axiosClient';
import { InventoryRecord, Product } from '../types';

export const inventoryApi = {
  getInventory: () => request<InventoryRecord[]>('get', '/inventory'),
  getInventoryByProductId: (productId: string | number) => request<InventoryRecord>('get', `/inventory/${productId}`),
  updateStock: (productId: string | number, stock: number) => request<Product>('put', `/inventory/${productId}`, { stock }),
};
