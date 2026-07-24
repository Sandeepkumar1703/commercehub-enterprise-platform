import { tokenStorage } from '../auth/tokenStorage';

// Base URL for Spring Boot Backend
const BASE_URL = 'http://localhost:8080';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = tokenStorage.getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${cleanEndpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      mode: 'cors'
    });

    // Handle 401 Unauthorized
    if (response.status === 401) {
      console.warn('Unauthorized! Clearing tokens.');
      tokenStorage.clearTokens();
      if (endpoint.includes('products')) return [] as unknown as T;
      throw new Error('Session expired. Please login again.');
    }

    // Handle 403 Forbidden
    if (response.status === 403) {
      throw new Error('Access Forbidden (403). Check Backend CORS configuration.');
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown Error');
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    if (response.status === 204) return {} as T;

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return (await response.text()) as unknown as T;
  } catch (err: any) {
    console.error(`Fetch error at ${endpoint}:`, err.message);
    throw err;
  }
}

// --- Interfaces ---
export interface AuthLoginRequest { email: string; password: string; }
export interface AuthRegisterRequest { firstName: string; lastName: string; email: string; password: string; }
export interface AuthTokenResponse { accessToken: string; refreshToken: string; tokenType: string; expiresIn: number; }

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  timestamp: string;
}

export interface ProductApiDTO { 
  id?: number; 
  name: string; 
  description: string; 
  price: number; 
  sku: string; 
  stockQuantity: number; 
  imageUrl: string; 
  categoryId?: number; 
  categoryName?: string; 
}

// --- API Object ---
export const api = {
  baseUrl: BASE_URL,

  // Auth Controller
  auth: {
    login: async (data: AuthLoginRequest): Promise<AuthTokenResponse> => {
      const res = await request<AuthTokenResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      if (res.accessToken) {
        tokenStorage.setTokens(res.accessToken, res.refreshToken);
      }
      return res;
    },
    register: async (data: AuthRegisterRequest): Promise<AuthTokenResponse> => {
      const res = await request<AuthTokenResponse>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      if (res.accessToken) {
        tokenStorage.setTokens(res.accessToken, res.refreshToken);
      }
      return res;
    }
  },

  // User Controller (This was missing!)
  users: {
    getProfile: async (): Promise<UserProfileResponse> => {
      return request<UserProfileResponse>('/api/users/profile', { method: 'GET' });
    },
    updateProfile: async (data: { firstName: string; lastName: string }): Promise<UserProfileResponse> => {
      return request<UserProfileResponse>('/api/users/profile', {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    }
  },

  // Product Controller
  products: {
    getAll: async (): Promise<ProductApiDTO[]> => {
      try {
        return await request<ProductApiDTO[]>('/api/products', { method: 'GET' });
      } catch (e) {
        return []; 
      }
    },
    getById: (id: number | string) => 
      request<ProductApiDTO>(`/api/products/${id}`, { method: 'GET' }),
    create: (data: any) => 
      request<ProductApiDTO>('/api/products', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number | string, data: any) => 
      request<ProductApiDTO>(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number | string) => 
      request<void>(`/api/products/${id}`, { method: 'DELETE' })
  }
};