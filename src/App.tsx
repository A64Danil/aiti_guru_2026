import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { useAuth } from './hooks';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoginPage } from './components/LoginPage';
import { ProductsPage } from './components/ProductsPage';

function App() {
  const { isAuthenticated, initializeAuth } = useAuth();

  // Initialize auth state from storage on app load
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <ErrorBoundary>
      <Toaster position="top-center" />
      {isAuthenticated ? <ProductsPage /> : <LoginPage />}
    </ErrorBoundary>
  );
}

export default App;
