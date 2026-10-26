import { apiClient } from './apiClient';

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface RegisterPayload {
  organization: string;
  fullName: string;
  workEmail: string;
  role: string;
  authorityTier: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    authorityLimitInr: number;
    organization: string;
  };
}

const DEFAULT_USER: AuthResponse = {
  token: 'mock-jwt-token-sarah-jenkins',
  user: {
    id: 'usr-1',
    fullName: 'Sarah Jenkins',
    email: 'sarah.jenkins@petrails.insure',
    role: 'Senior Underwriting Officer',
    authorityLimitInr: 500000,
    organization: 'Tata AIG General Insurance'
  }
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/login', credentials, DEFAULT_USER);
    if (res.token) {
      localStorage.setItem('petrails_auth_token', res.token);
    }
    return res;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/register', payload, DEFAULT_USER);
    if (res.token) {
      localStorage.setItem('petrails_auth_token', res.token);
    }
    return res;
  },

  async getCurrentUser(): Promise<AuthResponse['user']> {
    return apiClient.get<AuthResponse['user']>('/auth/me', DEFAULT_USER.user);
  },

  logout(): void {
    localStorage.removeItem('petrails_auth_token');
  }
};
