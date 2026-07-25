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

export class ApiClient {
  private static getHeaders(): Record<string, string> {
    const token = localStorage.getItem('auth_access_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  public static async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const text = await response.text();
      return text ? JSON.parse(text) : ({} as T);
    } catch (error) {
      console.warn(`[ApiClient] GET ${endpoint} failed or unreachable. Falling back to local state handling.`, error);
      throw error;
    }
  }

  public static async post<T>(endpoint: string, body?: unknown): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const text = await response.text();
      return text ? JSON.parse(text) : ({} as T);
    } catch (error) {
      console.warn(`[ApiClient] POST ${endpoint} failed or unreachable. Falling back to local state handling.`, error);
      throw error;
    }
  }

  public static async put<T>(endpoint: string, body?: unknown): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const text = await response.text();
      return text ? JSON.parse(text) : ({} as T);
    } catch (error) {
      console.warn(`[ApiClient] PUT ${endpoint} failed or unreachable. Falling back to local state handling.`, error);
      throw error;
    }
  }

  public static async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const text = await response.text();
      return text ? JSON.parse(text) : ({} as T);
    } catch (error) {
      console.warn(`[ApiClient] DELETE ${endpoint} failed or unreachable. Falling back to local state handling.`, error);
      throw error;
    }
  }
}
