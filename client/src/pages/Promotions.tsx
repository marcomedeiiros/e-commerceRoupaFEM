import React from 'react';
import { Tag, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/products/ProductGrid';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { STORE_CONFIG } from '../config/store';

export const Promotions: React.FC = () => {
  useDocumentTitle('Promoções & Ofertas Especiais', 'Aproveite calças femininas com até 25% OFF e condições especiais.');

  const promoProducts = PRODUCTS.filter((p) => p.oldPrice && p.oldPrice > p.price);

  return (
    <div className="py-10 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8E6E45]/10 text-[#8E6E45] text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            <span>Preços Especiais de Lançamento</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1A1A1A] font-medium tracking-tight">
            Promoções & Ofertas
          </h1>
          <p className="text-sm text-[#767676] leading-relaxed">
            Aproveite nossos descontos exclusivos nas modelagens mais amadas. Use também o cupom <strong>BEMVINDA10</strong> no checkout para 10% OFF extra!
          </p>
        </div>

        {/* Highlight Coupon Card */}
        <div className="bg-[#1A1A1A] text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#C2A278]" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">Cupom: BEMVINDA10</h3>
              <p className="text-xs text-stone-300">
                Ganhe 10% de desconto adicional na primeira compra + Frete Grátis acima de R$ {STORE_CONFIG.freeShippingThreshold}.
              </p>
            </div>
          </div>
          <div className="px-5 py-2.5 bg-[#C2A278] text-white font-mono text-xs font-bold rounded-xl tracking-widest uppercase">
            CÓDIGO ATIVO
          </div>
        </div>

        {/* Promo Grid */}
        <ProductGrid
          products={promoProducts}
          emptyMessage="Nenhuma promoção ativa no momento. Volte em breve!"
        />
      </div>
    </div>
  );
};
