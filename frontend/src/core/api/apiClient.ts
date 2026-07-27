const BASE_URL = 'http://localhost:8080';

export interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data?: T;
  timestamp?: string;
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
}

/* ===========================
   Product Interfaces
=========================== */

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  sku: string;
  imageUrl: string;
  categoryId: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  sku: string;
  imageUrl: string;
  categoryId: number;
}

export class ApiClient {
  private static getHeaders(): Record<string, string> {
    const token = localStorage.getItem("auth_access_token");

    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  private static async request<T>(
    endpoint: string,
    method: string,
    body?: unknown
  ): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        errorText || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    const text = await response.text();

    return text ? JSON.parse(text) : ({} as T);
  }

  /* ===========================
        Generic HTTP Methods
     =========================== */

  static get<T>(endpoint: string) {
    return this.request<T>(endpoint, "GET");
  }

  static post<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, "POST", body);
  }

  static put<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, "PUT", body);
  }

  static patch<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, "PATCH", body);
  }

  static delete<T>(endpoint: string) {
    return this.request<T>(endpoint, "DELETE");
  }

  /* ===========================
          Product APIs
     =========================== */

  static getProducts() {
    return this.get<ApiResponse<Product[]>>("/products");
  }

  static getProduct(id: number) {
    return this.get<ApiResponse<Product>>(`/products/${id}`);
  }

  static createProduct(payload: CreateProductRequest) {
    return this.post<ApiResponse<Product>>("/products", payload);
  }

  static updateProduct(id: number, payload: Partial<CreateProductRequest>) {
    return this.put<ApiResponse<Product>>(`/products/${id}`, payload);
  }

  static deleteProduct(id: number) {
    return this.delete<ApiResponse<void>>(`/products/${id}`);
  }
}