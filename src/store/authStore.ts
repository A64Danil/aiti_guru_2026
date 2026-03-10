import { create } from 'zustand';

interface AuthState {
  storage: Storage | null;
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string | null, rememberMe: boolean) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  storage: null,
  token: null,
  isAuthenticated: false,

  setToken: (token: string | null, rememberMe: boolean) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    
    // Сохраняем ссылку на storage в state
    set({ storage, token, isAuthenticated: !!token });
    
    if (token) {
      storage.setItem('authToken', token);
    } else {
      storage.removeItem('authToken');
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    set({ storage: null, token: null, isAuthenticated: false });
  },

  initializeAuth: () => {
    let storage: Storage = localStorage;
    let token = localStorage.getItem('authToken');
    
    if (!token) {
      storage = sessionStorage;
      token = sessionStorage.getItem('authToken');
    }
    
    if (token) {
      // Сохраняем найденный storage в state
      set({ storage, token, isAuthenticated: true });
    }
  },
}));
