import { useEffect, lazy, Suspense } from 'react';
import { Toaster } from 'sonner';
import { useAuth } from './hooks';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy loading компонентов
const LoginPage = lazy(() => import('./components/LoginPage').then(m => ({ default: m.LoginPage })));
const ProductsPage = lazy(() => import('./components/ProductsPage').then(m => ({ default: m.ProductsPage })));

function App() {
  const { isAuthenticated, initializeAuth } = useAuth();

  // Initialize auth state from storage on app load
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <ErrorBoundary>
      <Toaster position="top-center" />
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Загрузка...</div>}>
        {isAuthenticated ? <ProductsPage /> : <LoginPage />}
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
