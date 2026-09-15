import React from 'react';
import type { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { Sparkles, PackageSearch } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
  onResetFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  emptyMessage = "Nenhuma calça encontrada com os filtros selecionados.",
  onResetFilters,
}) => {
  // Skeleton enquanto carrega
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-[3/4] rounded-2xl bg-[#F4EFE6] animate-pulse" />
            <div className="h-3 bg-[#F4EFE6] rounded animate-pulse w-3/4" />
            <div className="h-3 bg-[#F4EFE6] rounded animate-pulse w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16 px-4 text-center max-w-md mx-auto flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[#F4EFE6] border border-[#E7DFD3] flex items-center justify-center mb-4 text-[#767676]">
          <PackageSearch className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl text-[#1A1A1A] font-medium mb-2">
          Nenhum produto encontrado
        </h3>
        <p className="text-sm text-[#767676] mb-6">
          {emptyMessage}
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-[#333333] transition-colors inline-flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C2A278]" />
            <span>Limpar Todos os Filtros</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
