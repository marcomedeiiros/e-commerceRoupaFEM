import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Tag } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../products/ProductCard';

export const PromoSection: React.FC = () => {
  // Filtra produtos que possuem desconto
  const promoProducts = PRODUCTS.filter((p) => p.oldPrice && p.oldPrice > p.price).slice(0, 4);

  return (
    <section className="py-20 bg-[#F4EFE6] border-b border-[#E7DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Header with Sale Highlight */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A1A] text-white text-[10px] uppercase font-bold tracking-widest mb-3">
              <Tag className="w-3 h-3 text-[#C2A278]" />
              <span>Ofertas Exclusivas por Tempo Limitado</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-medium tracking-tight">
              Seleção Especial com até 25% OFF
            </h2>
            <p className="mt-2 text-sm text-[#767676] max-w-lg">
              Peças selecionadas com condições especiais de lançamento. Aproveite o parcelamento em até 6x sem juros e frete grátis.
            </p>
          </div>

          <Link
            to="/promocoes"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] hover:text-[#8E6E45] transition-colors group"
          >
            <span>Ver todas as promoções</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Promo Grid (4 products) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {promoProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Banner Callout */}
        <div className="mt-12 bg-[#1A1A1A] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#C2A278]" />
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-semibold">Cupom BEMVINDA10</p>
              <p className="text-xs text-stone-300">Garanta 10% OFF extra no carrinho em toda a loja!</p>
            </div>
          </div>
          <Link
            to="/calcas"
            className="px-6 py-3 bg-[#C2A278] hover:bg-[#B39368] text-white text-xs uppercase font-bold tracking-widest rounded-xl transition-colors shrink-0"
          >
            Aproveitar Cupom
          </Link>
        </div>
      </div>
    </section>
  );
};
