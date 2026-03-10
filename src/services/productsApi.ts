import type { Product, ProductsResponse, SearchProductsResponse } from '../types';

const BASE_URL = 'https://dummyjson.com';

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
