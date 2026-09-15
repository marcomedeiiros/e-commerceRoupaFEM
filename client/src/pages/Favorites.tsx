import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Trash2 } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { ProductCard } from '../components/products/ProductCard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const Favorites: React.FC = () => {
  useDocumentTitle('Lista de Desejos', 'Calças femininas salvas em sua lista de desejos.');
  const { favorites, clearFavorites, totalFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="py-24 px-4 text-center max-w-md mx-auto flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-[#F4EFE6] border border-[#E7DFD3] flex items-center justify-center mb-6 text-[#767676]">
          <Heart className="w-9 h-9 text-[#8E6E45]" />
        </div>

        <h2 className="font-serif text-3xl font-medium text-[#1A1A1A] mb-3">
          Sua lista de desejos está vazia
        </h2>

        <p className="text-sm text-[#767676] mb-8 leading-relaxed">
          Você ainda não favoritou nenhuma peça. Clique no ícone de coração nos produtos que você mais gostou para salvá-los aqui!
        </p>

        <Link
          to="/calcas"
          className="px-8 py-3.5 bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs uppercase font-semibold tracking-widest rounded-xl transition-all shadow-md flex items-center gap-2 group"
        >
          <span>Descobrir Calças</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7DFD3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C2A278] text-white flex items-center justify-center">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1A1A]">
                Meus Favoritos
              </h1>
              <p className="text-xs text-[#767676]">
                {totalFavorites} {totalFavorites === 1 ? 'modelo salvo' : 'modelos salvos'}
              </p>
            </div>
          </div>

          <button
            onClick={clearFavorites}
            className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-medium transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpar Todos</span>
          </button>
        </div>

        {/* Grid de Favoritos (usa o mesmo ProductCard com botão de adicionar direto) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
