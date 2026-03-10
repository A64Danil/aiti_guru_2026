import { BASE_URL, API_ENDPOINTS, APP_CONFIG } from '../constants';
import { 
  safeParseProductsResponse,
  safeParseSearchProductsResponse,
  type ProductsResponse, 
  type SearchProductsResponse 
} from '../schemas';

export const getProducts = async (): Promise<ProductsResponse> => {
  const response = await fetch(`${BASE_URL}${API_ENDPOINTS.PRODUCTS}?limit=${APP_CONFIG.PRODUCTS_LIMIT}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  
  // Validate response with Zod
  const validated = safeParseProductsResponse(data);
  if (!validated) {
    throw new Error('Invalid response format from server');
  }

  return validated;
};

export const searchProducts = async (query: string): Promise<SearchProductsResponse> => {
  const response = await fetch(`${BASE_URL}${API_ENDPOINTS.PRODUCTS_SEARCH}?q=${encodeURIComponent(query)}&limit=${APP_CONFIG.PRODUCTS_LIMIT}`);

  if (!response.ok) {
    throw new Error('Failed to search products');
  }

  const data = await response.json();
  
  // Validate response with Zod
  const validated = safeParseSearchProductsResponse(data);
  if (!validated) {
    throw new Error('Invalid response format from server');
  }

  return validated;
};
