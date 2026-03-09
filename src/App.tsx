import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { useAppStore, initializeAuth } from './store';
import { LoginPage } from './components/LoginPage';
import { ProductsPage } from './components/ProductsPage';

function App() {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  // Initialize auth state from storage on app load
  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      {isAuthenticated ? <ProductsPage /> : <LoginPage />}
    </>
  );
}

export default App;
