import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import { login } from '../services/authApi';
import { useAuthStore } from '../store';
import type { LoginFormData } from '../types';

export function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  const setToken = useAuthStore((state) => state.setToken);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LoginFormData, string>> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Логин обязателен';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Пароль обязателен';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await login({
        username: formData.username,
        password: formData.password,
      });
      
      setToken(response.accessToken, formData.rememberMe);
      toast.success('Успешная авторизация');
    } catch (error) {
      setAuthError('Неверный логин или пароль');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Вход в систему</h1>
        <p className="login-subtitle">Введите ваши учетные данные</p>
        
        {authError && (
          <div className="auth-error">{authError}</div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Логин
            </label>
            <input
              id="username"
              type="text"
              className={`form-input ${errors.username ? 'error' : ''}`}
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              placeholder="Введите логин"
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              className={`form-input ${errors.password ? 'error' : ''}`}
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Введите пароль"
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>
          
          <div className="checkbox-group">
            <input
              id="rememberMe"
              type="checkbox"
              className="checkbox-input"
              checked={formData.rememberMe}
              onChange={(e) => handleChange('rememberMe', e.target.checked)}
            />
            <label className="checkbox-label" htmlFor="rememberMe">
              Запомнить данные
            </label>
          </div>
          
          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}
