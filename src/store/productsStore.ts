import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { isProduct, type Product } from '../schemas';
import type { SortState } from '../types';

// Type Guard для проверки массива продуктов
function isProductArray(data: unknown): data is Product[] {
  return Array.isArray(data) && data.every(isProduct);
}

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  sortState: SortState;
  
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSortState: (sortState: SortState) => void;
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set) => ({
      products: [],
      isLoading: false,
      error: null,
      searchQuery: '',
      sortState: { field: null, order: 'asc' },

      setProducts: (products: Product[]) => {
        // Type Guard проверка
        if (!isProductArray(products)) {
          console.warn('Invalid products data received');
          return;
        }
        set({ products });
      },
      
      addProduct: (product: Product) => {
        // Type Guard проверка
        if (!isProduct(product)) {
          console.warn('Invalid product data received');
          return;
        }
        set((state) => ({ 
          products: [product, ...state.products] 
        }));
      },
      
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      
      setError: (error: string | null) => set({ error }),
      
      setSearchQuery: (searchQuery: string) => set({ searchQuery }),
      
      setSortState: (sortState: SortState) => set({ sortState }),
    }),
    {
      name: 'products-storage',
      partialize: (state) => ({ 
        sortState: state.sortState 
      }),
    }
  )
);
