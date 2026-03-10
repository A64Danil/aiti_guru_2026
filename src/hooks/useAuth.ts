import { useCallback } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '../store';
import { login as loginApi } from '../services/authApi';
import type { LoginCredentials } from '../types';

interface LoginParams extends LoginCredentials {
  rememberMe: boolean;
}

export function useAuth() {
  const { 
    isAuthenticated, 
    token, 
    storage,
    setToken, 
    logout, 
    initializeAuth 
  } = useAuthStore();

  const login = useCallback(async (params: LoginParams) => {
    try {
      const response = await loginApi({
        username: params.username,
        password: params.password,
      });
      setToken(response.accessToken, params.rememberMe);
      toast.success('Успешная авторизация');
      return true;
    } catch {
      toast.error('Неверный логин или пароль');
      return false;
    }
  }, [setToken]);

  const handleLogout = useCallback(() => {
    logout();
    toast.info('Вы вышли из системы');
  }, [logout]);

  return {
    isAuthenticated,
    token,
    storage,
    login,
    logout: handleLogout,
    initializeAuth,
  };
}
