import type { Product, ProductsResponse, SearchProductsResponse } from '../types';
import { BASE_URL, API_ENDPOINTS, APP_CONFIG } from '../constants';

export const getProducts = async (): Promise<ProductsResponse> => {
  const response = await fetch(`${BASE_URL}${API_ENDPOINTS.PRODUCTS}?limit=${APP_CONFIG.PRODUCTS_LIMIT}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};

export const searchProducts = async (query: string): Promise<SearchProductsResponse> => {
  const response = await fetch(`${BASE_URL}${API_ENDPOINTS.PRODUCTS_SEARCH}?q=${encodeURIComponent(query)}&limit=${APP_CONFIG.PRODUCTS_LIMIT}`);

  if (!response.ok) {
    throw new Error('Failed to search products');
  }

  return response.json();
};
