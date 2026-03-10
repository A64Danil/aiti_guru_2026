export const APP_CONFIG = {
  // App
  APP_NAME: 'Aiti Guru',
  
  // Search
  SEARCH_DEBOUNCE_MS: 400,
  
  // Pagination
  PRODUCTS_LIMIT: 0, // 0 = all products
  
  // Storage keys
  STORAGE_KEYS: {
    AUTH_TOKEN: 'authToken',
    AUTH_STORAGE_TYPE: 'authStorageType',
  },
} as const;
