import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, SortState } from './types';

interface AppState {
  // Auth state
  token: string | null;
  isAuthenticated: boolean;
  
  // Products state
  products: Product[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  sortState: SortState;
  
  // Actions
  setToken: (token: string | null, rememberMe: boolean) => void;
  logout: () => void;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSortState: (sortState: SortState) => void;
}

// Storage helper
const getStorage = (rememberMe: boolean) => {
  return rememberMe ? localStorage : sessionStorage;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      token: null,
      isAuthenticated: false,
      products: [],
      isLoading: false,
      error: null,
      searchQuery: '',
      sortState: { field: null, order: 'asc' },

      // Auth actions
      setToken: (token: string | null, rememberMe: boolean) => {
        const storage = getStorage(rememberMe);
        if (token) {
          storage.setItem('authToken', token);
        } else {
          storage.removeItem('authToken');
        }
        set({ token, isAuthenticated: !!token });
      },

      logout: () => {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        set({ 
          token: null, 
          isAuthenticated: false, 
          products: [],
          searchQuery: '',
          sortState: { field: null, order: 'asc' }
        });
      },

      // Products actions
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
      name: 'app-storage',
      partialize: (state) => ({ 
        // Only persist sort state
        sortState: state.sortState 
      }),
    }
  )
);

// Initialize auth state from storage on app load
export const initializeAuth = () => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  if (token) {
    useAppStore.setState({ token, isAuthenticated: true });
  }
};
