import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import type { Product } from '../../types/product';
import { formatCurrency, calculateDiscount } from '../../utils/formatCurrency';
import { getColorHex } from '../../utils/colors';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { ProductRating } from './ProductRating';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedQuickSize, setSelectedQuickSize] = useState<string>('');
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  const favorited = isFavorite(product.id);
  const discountPercent = calculateDiscount(product.price, product.oldPrice);
  const hasSecondImage = product.images.length > 1;

  const handleQuickAddToCart = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultColor = product.colors[0] || 'Padrão';
    addToCart(product, size, defaultColor, 1);
    setSelectedQuickSize(size);
    setTimeout(() => {
      setShowQuickAdd(false);
      setSelectedQuickSize('');
    }, 1200);
  };

  return (
    <div
      className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-[#E7DFD3]/60 hover:border-[#D4C6B3] hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickAdd(false);
      }}
    >
      {/* Image Container with Hover Crossfade */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4EFE6]">
        <Link to={`/produto/${product.slug}`} className="block w-full h-full">
          {/* Primary Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 ${
              isHovered && hasSecondImage ? 'opacity-0' : 'opacity-100'
            }`}
            loading="lazy"
          />

          {/* Secondary Image (Hover Effect) */}
          {hasSecondImage && (
            <img
              src={product.images[1]}
              alt={`${product.name} - Vista detalhada`}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
            />
          )}
        </Link>

        {/* Badges: Novo & Promoção */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
          {product.isNew && (
            <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-[#1A1A1A] text-white rounded-xs shadow-xs">
              Novo
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-[#8E6E45] text-white rounded-xs shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product);
          }}
          aria-label={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            favorited
              ? 'bg-[#1A1A1A] text-white'
              : 'bg-white/80 text-[#1A1A1A] hover:bg-white hover:scale-110 shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View / Add Action Overlay (Desktop) */}
        <div
          className={`absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 via-black/30 to-transparent transition-opacity duration-300 flex flex-col justify-end gap-2 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {showQuickAdd ? (
            <div className="bg-white/95 backdrop-blur-md rounded-lg p-2.5 shadow-xl animate-in fade-in zoom-in-95">
              <p className="text-[10px] uppercase font-bold tracking-wider text-center text-[#767676] mb-1.5">
                Escolha o tamanho:
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => handleQuickAddToCart(e, size)}
                    className={`px-2 py-1 text-xs font-semibold rounded border transition-all ${
                      selectedQuickSize === size
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                        : 'bg-white hover:bg-[#F4EFE6] text-[#1A1A1A] border-[#D4C6B3]'
                    }`}
                  >
                    {selectedQuickSize === size ? <Check className="w-3.5 h-3.5" /> : size}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowQuickAdd(true);
                }}
                className="flex-1 py-2 px-3 bg-white hover:bg-[#FAF9F6] text-[#1A1A1A] text-xs font-medium uppercase tracking-wider rounded-lg shadow-md flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Adicionar</span>
              </button>
              <button
                type="button"
                onClick={() => navigate(`/produto/${product.slug}`)}
                className="p-2 bg-white/90 hover:bg-white text-[#1A1A1A] rounded-lg shadow-md transition-colors"
                title="Ver detalhes"
                aria-label="Ver detalhes"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Category & Color Swatches */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-widest text-[#767676] font-semibold">
              {product.category}
            </span>

            {/* Color Swatch Dots */}
            {product.colors.length > 0 && (
              <div className="flex items-center gap-1">
                {product.colors.slice(0, 4).map((colorName) => (
                  <span
                    key={colorName}
                    title={colorName}
                    className="w-2.5 h-2.5 rounded-full border border-black/20 shadow-2xs"
                    style={{ backgroundColor: getColorHex(colorName) }}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-[9px] text-[#767676]">+{product.colors.length - 4}</span>
                )}
              </div>
            )}
          </div>

          {/* Title */}
          <Link
            to={`/produto/${product.slug}`}
            className="block font-medium text-sm text-[#1A1A1A] hover:text-[#8E6E45] transition-colors line-clamp-1 leading-snug"
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="mt-1.5">
            <ProductRating rating={product.rating} reviews={product.reviews} size="sm" />
          </div>
        </div>

        {/* Pricing */}
        <div className="pt-2 border-t border-[#E7DFD3]/40 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-base text-[#1A1A1A]">
              {formatCurrency(product.price)}
            </span>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-xs text-[#767676] line-through">
                {formatCurrency(product.oldPrice)}
              </span>
            )}
          </div>
          <span className="text-[11px] text-[#767676]">
            3x de {formatCurrency(product.price / 3)}
          </span>
        </div>

        {/* Mobile Add To Bag Button (Always visible on mobile/tablet) */}
        <button
          type="button"
          onClick={() => navigate(`/produto/${product.slug}`)}
          className="lg:hidden mt-1 w-full py-2 bg-[#FAF9F6] hover:bg-[#F4EFE6] border border-[#D4C6B3] text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-colors"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Ver Opções</span>
        </button>
      </div>
    </div>
  );
};
