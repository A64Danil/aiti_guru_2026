import { create } from 'zustand';
import { APP_CONFIG } from '../constants';

function isValidToken(token: unknown): token is string {
  return typeof token === 'string' && token.length > 0;
}

interface AuthState {
  storage: Storage | null;
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string | null, rememberMe: boolean) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  storage: null,
  token: null,
  isAuthenticated: false,

  setToken: (token: string | null, rememberMe: boolean) => {
    if (!isValidToken(token)) {
      return;
    }

    const storage = rememberMe ? localStorage : sessionStorage;
    
    // Сохраняем ссылку на storage в state
    set({ storage, token, isAuthenticated: true });
    
    storage.setItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN, token);
  },

  logout: () => {
    localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN);
    sessionStorage.removeItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN);
    set({ storage: null, token: null, isAuthenticated: false });
  },

  initializeAuth: () => {
    let storage: Storage = localStorage;
    let token = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN);
    
    if (!isValidToken(token)) {
      storage = sessionStorage;
      token = sessionStorage.getItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN);
    }
    
    if (isValidToken(token)) {
      // Сохраняем найденный storage в state
      set({ storage, token, isAuthenticated: true });
    }
  },
}));
