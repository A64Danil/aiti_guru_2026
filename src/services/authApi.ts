import { BASE_URL, API_ENDPOINTS } from '../constants';
import { 
  safeParseAuthResponse,
  type LoginCredentials, 
  type AuthResponse 
} from '../schemas';

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

  const data = await response.json();
  
  // Validate response with Zod
  const validated = safeParseAuthResponse(data);
  if (!validated) {
    throw new Error('Invalid response format from server');
  }

  return validated;
};
