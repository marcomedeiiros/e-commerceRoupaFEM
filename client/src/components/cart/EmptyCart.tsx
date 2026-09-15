import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const EmptyCart: React.FC = () => {
  return (
    <div className="py-20 px-4 text-center max-w-md mx-auto flex flex-col items-center">
      <div className="w-20 h-20 rounded-full bg-[#F4EFE6] border border-[#E7DFD3] flex items-center justify-center mb-6 text-[#767676]">
        <ShoppingBag className="w-9 h-9 text-[#8E6E45]" />
      </div>

      <h2 className="font-serif text-3xl font-medium text-[#1A1A1A] mb-3">
        Seu carrinho está vazio.
      </h2>

      <p className="text-sm text-[#767676] mb-8 leading-relaxed">
        Você ainda não adicionou nenhuma calça ao seu carrinho. Explore nosso catálogo exclusivo e encontre a modelagem perfeita para o seu estilo.
      </p>

      <Link
        to="/calcas"
        className="px-8 py-3.5 bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs uppercase font-semibold tracking-widest rounded-xl transition-all shadow-md flex items-center gap-2 group"
      >
        <span>Continuar comprando</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
};
