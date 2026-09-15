import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { FilterState, Product } from '../types/product';
import { SearchBar } from '../components/products/SearchBar';
import { FilterBar } from '../components/products/FilterBar';
import { ProductGrid } from '../components/products/ProductGrid';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useDebounce } from '../hooks/useDebounce';
import { api } from '../lib/api';

const INITIAL_NON_SEARCH_FILTERS: Omit<FilterState, 'search'> = {
  category: 'all',
  sizes: [],
  colors: [],
  priceRange: [150, 400],
  inStockOnly: false,
  sortBy: 'recent',
};

export const Products: React.FC = () => {
  useDocumentTitle(
    'Calças Femininas | Catálogo Exclusivo',
    'Explore todas as calças femininas da Aura Atelier: Wide Leg, Mom Jeans, Skinny, Alfaiataria, Cargo, Jogger e muito mais com tecidos nobres.'
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get('busca') || '';
  const debouncedSearch = useDebounce(searchParam, 400);

  const [filters, setFilters] = useState<Omit<FilterState, 'search'>>(INITIAL_NON_SEARCH_FILTERS);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Metadados (tamanhos, cores, categorias) derivados dos produtos carregados
  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [allProducts]);

  const availableColors = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach((p) => p.colors.forEach((c) => set.add(c)));
    return Array.from(set);
  }, [allProducts]);

  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [allProducts]);

  // Carrega todos os produtos do servidor com os filtros ativos
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.products.list({
        search: debouncedSearch || undefined,
        category: filters.category !== 'all' ? filters.category : undefined,
        sizes: filters.sizes.length ? filters.sizes : undefined,
        colors: filters.colors.length ? filters.colors : undefined,
        priceMax: filters.priceRange[1],
        inStock: filters.inStockOnly || undefined,
        sortBy: filters.sortBy,
      });
      setAllProducts(res.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar produtos.');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const fullFilters: FilterState = useMemo(
    () => ({ ...filters, search: searchParam }),
    [filters, searchParam]
  );

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    if (newFilters.search !== undefined) {
      if (newFilters.search) {
        setSearchParams({ busca: newFilters.search });
      } else {
        setSearchParams({});
      }
    }

    setFilters((prev) => {
      const { search: _discard, ...rest } = newFilters;
      return { ...prev, ...rest };
    });
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_NON_SEARCH_FILTERS);
    setSearchParams({});
  };

  return (
    <div className="py-10 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header da Coleção */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#8E6E45] block">
            Coleção Permanente
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1A1A1A] font-medium tracking-tight">
            Calças Femininas
          </h1>
          <p className="text-sm text-[#767676] leading-relaxed">
            Do jeans casual à alfaiataria fina, todas as peças foram desenhadas para vestir com conforto, segurança e estilo impecável.
          </p>
        </div>

        {/* Barra de Pesquisa */}
        <div className="max-w-xl mx-auto">
          <SearchBar
            value={fullFilters.search}
            onChange={(val) => handleFilterChange({ search: val })}
          />
        </div>

        {/* Barra de Filtros e Ordenação */}
        <FilterBar
          filters={fullFilters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalResults={allProducts.length}
          availableSizes={availableSizes}
          availableColors={availableColors}
          availableCategories={availableCategories}
        />

        {/* Feedback de erro */}
        {error && (
          <div className="text-center py-8 text-rose-600 text-sm">
            {error} —{' '}
            <button
              onClick={fetchProducts}
              className="underline font-semibold hover:text-rose-800"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Grid de Produtos */}
        {!error && (
          <ProductGrid
            products={allProducts}
            loading={loading}
            emptyMessage="Nenhuma calça encontrada com os filtros selecionados. Tente ajustar os critérios de busca."
            onResetFilters={handleResetFilters}
          />
        )}
      </div>
    </div>
  );
};
