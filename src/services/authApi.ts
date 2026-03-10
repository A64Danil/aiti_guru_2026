import type { LoginCredentials, AuthResponse } from '../types';
import { BASE_URL, API_ENDPOINTS } from '../constants';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${BASE_URL}${API_ENDPOINTS.AUTH_LOGIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Invalid credentials');
  }

  return response.json();
};
