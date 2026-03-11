import { useEffect, lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { useAuth } from './hooks';
import { ErrorBoundary } from './components/ErrorBoundary';

// Создаём QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут
      retry: 1,
    },
  },
});

// Lazy loading компонентов
const LoginPage = lazy(() => import('./components/LoginPage').then(m => ({ default: m.LoginPage })));
const ProductsPage = lazy(() => import('./components/ProductsPage').then(m => ({ default: m.ProductsPage })));

function AppContent() {
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
