import React, { useState } from 'react';
import { SlidersHorizontal, X, RotateCcw, Check } from 'lucide-react';
import type { FilterState } from '../../types/product';
import { getColorHex } from '../../utils/colors';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
  availableSizes: string[];
  availableColors: string[];
  availableCategories: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  availableSizes,
  availableColors,
  availableCategories,
}) => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const toggleSize = (size: string) => {
    const next = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ sizes: next });
  };

  const toggleColor = (color: string) => {
    const next = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onFilterChange({ colors: next });
  };

  const hasActiveFilters =
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.category !== 'all' ||
    filters.inStockOnly ||
    filters.priceRange[1] < 400;

  return (
    <div className="space-y-4">
      {/* Top Bar with Filter Trigger, Active Counter, and Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E7DFD3]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#D4C6B3] rounded-lg text-sm font-medium text-[#1A1A1A] hover:bg-[#F4EFE6] transition-colors shadow-2xs"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#767676]" />
            <span>Filtros</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#C2A278]"></span>
            )}
          </button>

          <span className="text-xs text-[#767676]">
            Mostrando <strong>{totalResults}</strong> calças
          </span>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-xs text-[#8E6E45] hover:underline flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Limpar filtros</span>
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-by" className="text-xs text-[#767676] font-medium hidden sm:inline">
            Ordenar por:
          </label>
          <select
            id="sort-by"
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
            className="bg-white border border-[#D4C6B3] rounded-lg px-3 py-2 text-xs font-medium text-[#1A1A1A] focus:outline-hidden focus:ring-1 focus:ring-[#1A1A1A] cursor-pointer shadow-2xs"
          >
            <option value="recent">Mais recentes</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
            <option value="best-sellers">Mais vendidos</option>
            <option value="rating">Melhor avaliação</option>
          </select>
        </div>
      </div>

      {/* Quick Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => onFilterChange({ category: 'all' })}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
            filters.category === 'all'
              ? 'bg-[#1A1A1A] text-white shadow-xs'
              : 'bg-white border border-[#D4C6B3] text-[#4A4A4A] hover:border-[#1A1A1A]'
          }`}
        >
          Todos os Modelos
        </button>
        {availableCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => onFilterChange({ category: cat })}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              filters.category === cat
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'bg-white border border-[#D4C6B3] text-[#4A4A4A] hover:border-[#1A1A1A]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filter Drawer Modal (Both for Mobile and Quick Desktop expansion) */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsMobileDrawerOpen(false)}
          />

          <div className="relative ml-auto w-full max-w-sm bg-[#FAF9F6] h-full shadow-2xl z-10 flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7DFD3]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#1A1A1A]" />
                <h3 className="font-serif text-xl font-medium text-[#1A1A1A]">Filtros</h3>
              </div>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1 text-[#767676] hover:text-[#1A1A1A] rounded-full hover:bg-[#F4EFE6]"
                aria-label="Fechar filtros"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6 flex-1">
              {/* Category Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3">
                  Modelo / Estilo
                </h4>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm text-[#4A4A4A] cursor-pointer hover:text-black">
                    <input
                      type="radio"
                      name="filter-cat"
                      checked={filters.category === 'all'}
                      onChange={() => onFilterChange({ category: 'all' })}
                      className="accent-[#1A1A1A]"
                    />
                    <span>Todos os modelos</span>
                  </label>
                  {availableCategories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 text-sm text-[#4A4A4A] cursor-pointer hover:text-black">
                      <input
                        type="radio"
                        name="filter-cat"
                        checked={filters.category === cat}
                        onChange={() => onFilterChange({ category: cat })}
                        className="accent-[#1A1A1A]"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="pt-4 border-t border-[#E7DFD3]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3">
                  Tamanho
                </h4>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => {
                    const isSelected = filters.sizes.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={`w-10 h-10 rounded-lg text-xs font-semibold border transition-all flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'bg-white text-[#1A1A1A] border-[#D4C6B3] hover:border-[#1A1A1A]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Colors */}
              <div className="pt-4 border-t border-[#E7DFD3]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3">
                  Cores
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {availableColors.map((color) => {
                    const isSelected = filters.colors.includes(color);
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => toggleColor(color)}
                        title={color}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all ${
                          isSelected
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'bg-white text-[#4A4A4A] border-[#D4C6B3] hover:border-[#1A1A1A]'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/20"
                          style={{ backgroundColor: getColorHex(color) }}
                        />
                        <span>{color}</span>
                        {isSelected && <Check className="w-3 h-3 ml-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Max Price Range */}
              <div className="pt-4 border-t border-[#E7DFD3]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                    Preço Máximo
                  </h4>
                  <span className="text-xs font-semibold text-[#8E6E45]">
                    Até R$ {filters.priceRange[1]}
                  </span>
                </div>
                <input
                  type="range"
                  min={150}
                  max={400}
                  step={10}
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    onFilterChange({ priceRange: [filters.priceRange[0], Number(e.target.value)] })
                  }
                  className="w-full accent-[#1A1A1A] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#767676] mt-1">
                  <span>R$ 150</span>
                  <span>R$ 400</span>
                </div>
              </div>

              {/* Availability */}
              <div className="pt-4 border-t border-[#E7DFD3]">
                <label className="flex items-center gap-2 text-sm text-[#1A1A1A] font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) => onFilterChange({ inStockOnly: e.target.checked })}
                    className="rounded accent-[#1A1A1A] w-4 h-4"
                  />
                  <span>Apenas produtos em estoque</span>
                </label>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#E7DFD3] flex gap-3">
              <button
                type="button"
                onClick={onResetFilters}
                className="flex-1 py-3 px-4 bg-white border border-[#D4C6B3] text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] rounded-xl hover:bg-[#F4EFE6] transition-colors"
              >
                Limpar
              </button>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="flex-1 py-3 px-4 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#333333] transition-colors"
              >
                Ver ({totalResults})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
