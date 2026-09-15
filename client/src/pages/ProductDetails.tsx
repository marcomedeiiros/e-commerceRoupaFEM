import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Ruler,
  Truck,
  RefreshCw,
  ChevronRight,
  Minus,
  Plus,
  Share2,
  Check,
  ZoomIn,
  Sparkles,
} from 'lucide-react';
import type { Product } from '../types/product';
import { api } from '../lib/api';
import { formatCurrency, calculateDiscount } from '../utils/formatCurrency';
import { getColorHex } from '../utils/colors';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ProductRating } from '../components/products/ProductRating';
import { ModalSizeGuide } from '../components/common/ModalSizeGuide';
import { ProductCard } from '../components/products/ProductCard';
import { useProducts } from '../hooks/useProducts';

interface ProductViewProps {
  product: Product;
}


const ProductView: React.FC<ProductViewProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { showToast } = useToast();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [validationError, setValidationError] = useState<string>('');
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);


  const favorited = isFavorite(product.id);
  const discountPercent = calculateDiscount(product.price, product.oldPrice);

  const validateSelection = (): boolean => {
    if (!selectedSize) {
      setValidationError('Por favor, selecione um tamanho antes de continuar.');
      return false;
    }
    if (!selectedColor) {
      setValidationError('Por favor, selecione uma cor antes de continuar.');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleAddToCart = () => {
    if (!validateSelection()) return;
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    if (!validateSelection()) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link do produto copiado com sucesso!', 'info');
    }
  };

  // Produtos relacionados (outros produtos, exceto o atual)
  const { products: relatedProducts } = useProducts({ limit: 4 });
  const filteredRelated = relatedProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="py-8 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#767676]">
          <Link to="/" className="hover:text-black transition-colors">Início</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/calcas" className="hover:text-black transition-colors">Calças</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A1A1A] font-medium truncate">{product.name}</span>
        </nav>

        {/* Product Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Gallery Col (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto scrollbar-none shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-[#F4EFE6] ${
                      activeImageIndex === idx
                        ? 'border-[#1A1A1A] shadow-xs'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} miniatura ${idx + 1}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image View */}
              <div className="relative flex-1 aspect-[3/4] rounded-2xl overflow-hidden bg-[#F4EFE6] border border-[#E7DFD3] shadow-xs group">
                <img
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 cursor-zoom-in"
                  onClick={() => setIsZoomModalOpen(true)}
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                  {product.isNew && (
                    <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest bg-[#1A1A1A] text-white rounded-xs shadow-sm">
                      Novo Lançamento
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest bg-[#8E6E45] text-white rounded-xs shadow-sm">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>

                {/* Actions overlay */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(product)}
                    className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
                      favorited
                        ? 'bg-[#1A1A1A] text-white'
                        : 'bg-white/80 text-[#1A1A1A] hover:bg-white hover:scale-105'
                    }`}
                    aria-label="Favoritar"
                  >
                    <Heart className={`w-5 h-5 ${favorited ? 'fill-white' : ''}`} />
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="p-2.5 rounded-full bg-white/80 backdrop-blur-md text-[#1A1A1A] hover:bg-white hover:scale-105 transition-all shadow-md"
                    title="Compartilhar produto"
                    aria-label="Compartilhar"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Zoom hint */}
                <button
                  type="button"
                  onClick={() => setIsZoomModalOpen(true)}
                  className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <ZoomIn className="w-4 h-4" />
                  <span>Ampliar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Product Information & Purchase Col (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2 border-b border-[#E7DFD3] pb-6">
              <span className="text-xs uppercase font-bold tracking-widest text-[#8E6E45]">
                {product.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-semibold tracking-tight leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 pt-1">
                <ProductRating rating={product.rating} reviews={product.reviews} size="md" />
                <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                  Em estoque ({product.stock} un.)
                </span>
              </div>

              {/* Price */}
              <div className="pt-3 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#1A1A1A]">
                  {formatCurrency(product.price)}
                </span>
                {product.oldPrice && product.oldPrice > product.price && (
                  <span className="text-sm text-[#767676] line-through">
                    {formatCurrency(product.oldPrice)}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#767676]">
                ou em até <strong>6x de {formatCurrency(product.price / 6)}</strong> sem juros no cartão
              </p>
            </div>

            {/* Short Description */}
            <p className="text-sm text-[#555555] leading-relaxed">
              {product.description}
            </p>

            {/* Selection: Color */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  Cor: <span className="font-normal text-[#767676]">{selectedColor || 'Selecione uma cor'}</span>
                </label>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((colorName) => {
                  const isSelected = selectedColor === colorName;
                  return (
                    <button
                      key={colorName}
                      type="button"
                      onClick={() => {
                        setSelectedColor(colorName);
                        setValidationError('');
                      }}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all ${
                        isSelected
                          ? 'border-[#1A1A1A] bg-white shadow-xs text-[#1A1A1A] ring-1 ring-[#1A1A1A]'
                          : 'border-[#D4C6B3] bg-white text-[#555555] hover:border-[#1A1A1A]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: getColorHex(colorName) }}
                      />
                      <span>{colorName}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selection: Size */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  Tamanho: <span className="font-normal text-[#767676]">{selectedSize || 'Selecione um tamanho'}</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-[#8E6E45] hover:underline flex items-center gap-1 font-semibold"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Guia de Medidas</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setSelectedSize(size);
                        setValidationError('');
                      }}
                      className={`w-12 h-12 rounded-xl text-xs font-bold border transition-all flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                          : 'bg-white text-[#1A1A1A] border-[#D4C6B3] hover:border-[#1A1A1A]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] block">
                Quantidade
              </label>
              <div className="flex items-center border border-[#D4C6B3] rounded-xl bg-white w-32">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 text-[#1A1A1A] hover:bg-[#F4EFE6] transition-colors rounded-l-xl"
                  aria-label="Diminuir"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="flex-1 text-center text-sm font-bold text-[#1A1A1A]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="p-2.5 text-[#1A1A1A] hover:bg-[#F4EFE6] transition-colors rounded-r-xl"
                  aria-label="Aumentar"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Validation Error Message */}
            {validationError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-700 animate-in fade-in">
                {validationError}
              </div>
            )}

            {/* Action Buttons: Add to Cart & Buy Now */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-4 bg-white hover:bg-[#FAF9F6] text-[#1A1A1A] border-2 border-[#1A1A1A] text-xs uppercase font-bold tracking-widest rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Adicionar ao Carrinho</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-4 bg-[#1A1A1A] hover:bg-[#2E2E2E] text-white text-xs uppercase font-bold tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#C2A278]" />
                <span>Comprar Agora</span>
              </button>
            </div>

            {/* Accordions / Extra Information */}
            <div className="pt-6 border-t border-[#E7DFD3] space-y-4 text-xs text-[#555555]">
              {product.details && (
                <div className="bg-white p-4 rounded-xl border border-[#E7DFD3] space-y-2">
                  <h4 className="font-bold uppercase tracking-wider text-[#1A1A1A]">
                    Composição & Tecido
                  </h4>
                  <p>{product.details.composition}</p>
                  <p className="text-[#767676]">{product.details.fit}</p>
                </div>
              )}

              {product.details?.care && (
                <div className="bg-white p-4 rounded-xl border border-[#E7DFD3] space-y-2">
                  <h4 className="font-bold uppercase tracking-wider text-[#1A1A1A]">
                    Cuidados com a Peça
                  </h4>
                  <ul className="space-y-1 list-disc list-inside text-[#767676]">
                    {product.details.care.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#E7DFD3]">
                  <Truck className="w-4 h-4 text-[#8E6E45] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1A1A1A] block">Entrega Expressa</span>
                    <span className="text-[11px] text-[#767676]">Envio em até 24h úteis</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#E7DFD3]">
                  <RefreshCw className="w-4 h-4 text-[#8E6E45] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1A1A1A] block">Troca Descomplicada</span>
                    <span className="text-[11px] text-[#767676]">30 dias após o recebimento</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="pt-16 border-t border-[#E7DFD3]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8E6E45] block mb-1">
              Combine com seu Estilo
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1A1A]">
              Calças Semelhantes
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredRelated.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal Guia de Medidas */}
      <ModalSizeGuide
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Lightbox / Zoom Modal */}
      {isZoomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <button
            onClick={() => setIsZoomModalOpen(false)}
            className="absolute top-6 right-6 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all z-20"
            aria-label="Fechar zoom"
          >
            ✕
          </button>
          <img
            src={product.images[activeImageIndex]}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;
    setLoading(true);
    setNotFound(false);

    api.products.getBySlug(slug)
      .then((res) => {
        if (!cancelled && res.data) setProduct(res.data);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [slug]);

  useDocumentTitle(
    product ? `${product.name} | Calças Femininas` : 'Produto',
    product?.description
  );

  if (loading) {
    return (
      <div className="py-8 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <div className="aspect-[3/4] rounded-2xl bg-[#F4EFE6] animate-pulse" />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div className="h-4 bg-[#F4EFE6] rounded animate-pulse w-1/3" />
              <div className="h-8 bg-[#F4EFE6] rounded animate-pulse w-2/3" />
              <div className="h-6 bg-[#F4EFE6] rounded animate-pulse w-1/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="font-serif text-3xl text-[#1A1A1A] mb-3">
          Produto não encontrado
        </h2>
        <p className="text-sm text-[#767676] mb-6">
          A calça procurada não está mais disponível em nosso catálogo.
        </p>
        <Link
          to="/calcas"
          className="px-6 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold rounded-xl inline-block"
        >
          Voltar para as Calças
        </Link>
      </div>
    );
  }

  return <ProductView key={product.slug} product={product} />;
};
