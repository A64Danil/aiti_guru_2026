import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, SortState } from '../types';

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

      setProducts: (products: Product[]) => set({ products }),
      
      addProduct: (product: Product) => set((state) => ({ 
        products: [product, ...state.products] 
      })),
      
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
