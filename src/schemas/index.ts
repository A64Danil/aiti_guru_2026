import { z } from 'zod';

// Product schema
export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  brand: z.string().optional(),
  category: z.string(),
  thumbnail: z.string(),
  images: z.array(z.string()),
});

// Auth response schema
export const AuthResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  image: z.string(),
  accessToken: z.string(),
});

// Login credentials schema
export const LoginCredentialsSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

// Products response schema
export const ProductsResponseSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

// Search products response schema
export const SearchProductsResponseSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

// Type exports
export type Product = z.infer<typeof ProductSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;
export type ProductsResponse = z.infer<typeof ProductsResponseSchema>;
export type SearchProductsResponse = z.infer<typeof SearchProductsResponseSchema>;

// Validation functions (Type Guards)
export function isProduct(data: unknown): data is Product {
  return ProductSchema.safeParse(data).success;
}

export function isAuthResponse(data: unknown): data is AuthResponse {
  return AuthResponseSchema.safeParse(data).success;
}

export function isProductsResponse(data: unknown): data is ProductsResponse {
  return ProductsResponseSchema.safeParse(data).success;
}

export function isSearchProductsResponse(data: unknown): data is SearchProductsResponse {
  return SearchProductsResponseSchema.safeParse(data).success;
}

// Safe parse functions with error handling
export function safeParseProduct(data: unknown): Product | null {
  const result = ProductSchema.safeParse(data);
  return result.success ? result.data : null;
}

export function safeParseAuthResponse(data: unknown): AuthResponse | null {
  const result = AuthResponseSchema.safeParse(data);
  return result.success ? result.data : null;
}

export function safeParseProductsResponse(data: unknown): ProductsResponse | null {
  const result = ProductsResponseSchema.safeParse(data);
  return result.success ? result.data : null;
}

export function safeParseSearchProductsResponse(data: unknown): SearchProductsResponse | null {
  const result = SearchProductsResponseSchema.safeParse(data);
  return result.success ? result.data : null;
}
