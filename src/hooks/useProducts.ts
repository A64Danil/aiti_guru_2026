import { useEffect, useMemo, useCallback } from 'react';
import { toast } from 'sonner';
import { useProductsStore } from '../store';
import { getProducts, searchProducts } from '../services/productsApi';
import { useDebounce } from './useDebounce';
import type { Product, SortField, SortOrder } from '../types';

export function useProducts() {
  const {
    products,
    setProducts,
    addProduct,
    isLoading,
    setIsLoading,
    error,
    setError,
    searchQuery,
    setSearchQuery,
    sortState,
    setSortState,
  } = useProductsStore();

  // Debounce the search query for API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 400);

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getProducts();
      setProducts(response.products);
    } catch {
      setError('Не удалось загрузить товары');
      toast.error('Ошибка при загрузке товаров');
    } finally {
      setIsLoading(false);
    }
  }, [setProducts, setIsLoading, setError]);

  // Search products by query
  const search = useCallback(async (query: string) => {
    setSearchQuery(query);
  }, [setSearchQuery]);

  // Sort
  const handleSort = useCallback((field: SortField) => {
    const newOrder: SortOrder = 
      sortState.field === field && sortState.order === 'asc' ? 'desc' : 'asc';
    setSortState({ field, order: newOrder });
  }, [sortState, setSortState]);

  // Sorted products
  const sortedProducts = useMemo(() => {
    let result = [...products];

    if (sortState.field) {
      result.sort((a, b) => {
        let aVal: string | number;
        let bVal: string | number;

        if (sortState.field === 'id') {
          aVal = a.id;
          bVal = b.id;
        } else {
          aVal = a[sortState.field as keyof Product] as string | number;
          bVal = b[sortState.field as keyof Product] as string | number;
        }
        
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          const comparison = aVal.toLowerCase().localeCompare(bVal.toLowerCase());
          return sortState.order === 'asc' ? comparison : -comparison;
        }
        
        if (sortState.order === 'asc') {
          return aVal > bVal ? 1 : -1;
        }
        return aVal < bVal ? 1 : -1;
      });
    }

    return result;
  }, [products, sortState]);

  // Add product
  const addNewProduct = useCallback((product: Product) => {
    addProduct(product);
    toast.success('Товар успешно добавлен');
  }, [addProduct]);

  // Load products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Search when debounced query changes
  useEffect(() => {
    const doSearch = async () => {
      if (!debouncedSearchQuery.trim()) {
        await fetchProducts();
        return;
      }

      setIsLoading(true);
      try {
        const response = await searchProducts(debouncedSearchQuery);
        setProducts(response.products);
      } catch {
        toast.error('Ошибка при поиске товаров');
      } finally {
        setIsLoading(false);
      }
    };

    doSearch();
  }, [debouncedSearchQuery, fetchProducts, setProducts, setIsLoading]);

  return {
    products: sortedProducts,
    isLoading,
    error,
    searchQuery,
    sortState,
    handleSort,
    addProduct: addNewProduct,
    search,
    refetch: fetchProducts,
  };
}

export function useSortIcon(field: SortField, sortState: { field: SortField | null; order: SortOrder }) {
  if (sortState.field !== field) return '⇅';
  return sortState.order === 'asc' ? '↑' : '↓';
}
