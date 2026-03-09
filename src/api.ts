import type { 
  Product, 
  ProductsResponse, 
  SearchProductsResponse,
  LoginCredentials, 
  AuthResponse 
} from './types';

const BASE_URL = 'https://dummyjson.com';

// Auth API
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
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

// Products API
export const getProducts = async (): Promise<ProductsResponse> => {
  const response = await fetch(`${BASE_URL}/products?limit=0`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};

export const searchProducts = async (query: string): Promise<SearchProductsResponse> => {
  const response = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=0`);

  if (!response.ok) {
    throw new Error('Failed to search products');
  }

  return response.json();
};
