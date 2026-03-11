import { useEffect, lazy, Suspense } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Toaster } from 'sonner';
import { useAuth } from './hooks';
import { ErrorBoundary } from './components/ErrorBoundary';

// Создаём Persister для localStorage
const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

// Создаём QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут
      gcTime: 24 * 60 * 60 * 1000, // 24 часа
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
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <AppContent />
    </PersistQueryClientProvider>
  );
}

export default App;
