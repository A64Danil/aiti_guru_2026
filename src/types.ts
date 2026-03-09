// Product types from DummyJSON API
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// API Response types
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface SearchProductsResponse extends ProductsResponse {
}

// Auth types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

// Local product type (for adding new products)
export interface NewProduct {
  title: string;
  price: number;
  brand: string;
  sku: string;
}

// Sorting
export type SortField = 'title' | 'brand' | 'id' | 'price' | 'rating';
export type SortOrder = 'asc' | 'desc';

export interface SortState {
  field: SortField | null;
  order: SortOrder;
}

// Form types
export interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface AddProductFormData {
  title: string;
  price: string;
  brand: string;
  sku: string;
}
