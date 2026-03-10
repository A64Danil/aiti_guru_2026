import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { useAuthStore } from './store';
import { LoginPage } from './components/LoginPage';
import { ProductsPage } from './components/ProductsPage';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  // Initialize auth state from storage on app load
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <>
      <Toaster position="top-center" />
      {isAuthenticated ? <ProductsPage /> : <LoginPage />}
    </>
  );
}

export default App;
