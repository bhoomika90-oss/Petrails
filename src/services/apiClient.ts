// PETRAILS API Client
// Handles HTTP requests, JWT authorization headers, and error normalization

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const USE_MOCK_FALLBACK = import.meta.env.VITE_USE_MOCK_FALLBACK !== 'false';

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  fallbackData?: T
): Promise<T> {
  const url = `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
  
  const token = localStorage.getItem('petrails_auth_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorData: any = null;
      try {
        errorData = await response.json();
      } catch {
        errorData = await response.text();
      }
      throw new ApiError(
        response.status,
        errorData?.message || `Request failed with status ${response.status}`,
        errorData
      );
    }

    // If 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (err: any) {
    // If mock fallback is enabled and we have fallback data provided or network failed
    if (USE_MOCK_FALLBACK && fallbackData !== undefined) {
      console.warn(`[PETRAILS API] Network call to ${endpoint} failed. Using fallback data.`, err);
      return fallbackData;
    }
    throw err;
  }
}

export const apiClient = {
  get: <T>(endpoint: string, fallbackData?: T, options?: RequestInit) =>
    request<T>(endpoint, { method: 'GET', ...options }, fallbackData),

  post: <T>(endpoint: string, body?: any, fallbackData?: T, options?: RequestInit) =>
    request<T>(
      endpoint,
      {
        method: 'POST',
        body: body ? JSON.stringify(body) : undefined,
        ...options,
      },
      fallbackData
    ),

  put: <T>(endpoint: string, body?: any, fallbackData?: T, options?: RequestInit) =>
    request<T>(
      endpoint,
      {
        method: 'PUT',
        body: body ? JSON.stringify(body) : undefined,
        ...options,
      },
      fallbackData
    ),

  patch: <T>(endpoint: string, body?: any, fallbackData?: T, options?: RequestInit) =>
    request<T>(
      endpoint,
      {
        method: 'PATCH',
        body: body ? JSON.stringify(body) : undefined,
        ...options,
      },
      fallbackData
    ),

  delete: <T>(endpoint: string, fallbackData?: T, options?: RequestInit) =>
    request<T>(endpoint, { method: 'DELETE', ...options }, fallbackData),
};
