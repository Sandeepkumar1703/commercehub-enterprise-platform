import api from "@/src/core/api/axios";


export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  sku: string;
  imageUrl: string;
  categoryId: number;
}

export const createProductApi = async (
  payload: CreateProductRequest
) => {
  const response = await api.post("/products", payload);
  return response.data;
};