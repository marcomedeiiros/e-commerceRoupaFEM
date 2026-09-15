import { useState, useEffect, useCallback } from 'react';
import { api, type ProductFilters } from '../lib/api';
import type { Product } from '../types/product';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: (filters?: ProductFilters) => void;
}

export function useProducts(initialFilters: ProductFilters = {}): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (filters: ProductFilters = initialFilters) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.products.list(filters);
      setProducts(res.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar produtos.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchProducts(initialFilters);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}
