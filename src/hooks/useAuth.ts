import { useCallback } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '../store';
import { login as loginApi } from '../services/authApi';
import { isAuthResponse } from '../schemas';
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
      
      if (!isAuthResponse(response)) {
        toast.error('Неверный формат ответа сервера');
        return false;
      }
      
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
