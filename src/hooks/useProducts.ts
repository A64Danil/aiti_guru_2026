import { useMemo, useCallback, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getProducts, searchProducts } from '../services/productsApi';
import { useDebounce } from './useDebounce';
import { MESSAGES } from '../constants';
import type { Product, SortField, SortOrder } from '../types';

export function useProducts() {
  const queryClient = useQueryClient();
  
  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Sort state
  const [sortState, setSortState] = useState<{ field: SortField; order: SortOrder }>({
    field: 'id',
    order: 'asc',
  });

  // Debounce the search query
  const debouncedSearchQuery = useDebounce(searchQuery);

  // Query: Fetch all products (when no search)
  const { data: allProducts, isLoading: isLoadingAll, error: errorAll, refetch } = useQuery({
    queryKey: ['products', 'all'],
    queryFn: () => getProducts().then(res => res.products),
    enabled: !debouncedSearchQuery.trim(),
    staleTime: 5 * 60 * 1000,
  });

  // Query: Search products (when there's a search query)
  const { data: searchResults, isLoading: isLoadingSearch, error: errorSearch } = useQuery({
    queryKey: ['products', 'search', debouncedSearchQuery],
    queryFn: () => searchProducts(debouncedSearchQuery).then(res => res.products),
    enabled: debouncedSearchQuery.trim().length > 0,
    staleTime: 5 * 60 * 1000,
  });

  // Determine current products based on search
  const products = debouncedSearchQuery.trim() ? (searchResults ?? []) : (allProducts ?? []);

  // Loading state
  const isLoading = isLoadingAll || isLoadingSearch;

  // Error state
  const error = errorAll?.message || errorSearch?.message || null;

  // Mutation: Add product
  const addProductMutation = useMutation({
    mutationFn: (product: Product) => {
      // Simulate adding - in real app this would be an API call
      return Promise.resolve(product);
    },
    onSuccess: (newProduct) => {
      // Add to cache manually
      queryClient.setQueryData<Product[]>(['products', 'all'], (old) => {
        return old ? [newProduct, ...old] : [newProduct];
      });
      toast.success(MESSAGES.PRODUCTS_ADD_SUCCESS);
    },
    onError: () => {
      toast.error(MESSAGES.PRODUCTS_ADD_ERROR);
    },
  });

  // Sort handler
  const handleSort = useCallback((field: SortField) => {
    setSortState((prev) => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  // Search handler
  const search = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Sorted products (client-side sorting)
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

  // Add product handler
  const addProduct = useCallback((product: Product) => {
    addProductMutation.mutate(product);
  }, [addProductMutation]);

  return {
    products: sortedProducts,
    isLoading,
    error,
    searchQuery,
    sortState,
    handleSort,
    addProduct,
    search,
    refetch,
  };
}
