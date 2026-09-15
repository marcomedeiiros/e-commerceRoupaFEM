import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Clock } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export const CategoryBanners: React.FC = () => {
  return (
    <section className="py-16 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#8E6E45] block mb-2">
            Navegue por Estilo
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-medium tracking-tight">
            Categorias em Destaque
          </h2>
          <p className="mt-3 text-sm text-[#767676]">
            Descubra as modelagens exclusivas do nosso catálogo e prepare-se para as novidades que chegam em breve.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.slice(0, 3).map((category) => (
            <Link
              key={category.id}
              to="/calcas"
              className="group relative h-96 rounded-2xl overflow-hidden shadow-md flex flex-col justify-end p-6 border border-[#E7DFD3]"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Content Overlay */}
              <div className="relative z-10 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C2A278] bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full inline-block">
                  {category.itemCount} modelos disponíveis
                </span>
                <h3 className="font-serif text-2xl text-white font-semibold">
                  {category.name}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-2">
                  {category.description}
                </p>
                <div className="pt-2 flex items-center text-xs font-semibold text-white group-hover:text-[#C2A278] transition-colors gap-1.5 uppercase tracking-wider">
                  <span>Explorar Coleção</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Future Collections Teaser (Scalability proof) */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-[#E7DFD3] shadow-xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-[#8E6E45]">
                <Clock className="w-3.5 h-3.5" />
                <span>Próximos Lançamentos</span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl text-[#1A1A1A]">
                O guarda-roupa feminino Aura está se expandindo
              </h4>
              <p className="text-xs text-[#767676] max-w-xl">
                Em breve nosso catálogo receberá Blusas em Seda, Vestidos Fluidos, Saias Midi e Conjuntos de Alfaiataria. Cadastre-se na newsletter para acesso antecipado com 15% OFF.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-[#FAF9F6] border border-[#E7DFD3] text-xs font-medium text-[#767676] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#C2A278]" /> Blusas
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#FAF9F6] border border-[#E7DFD3] text-xs font-medium text-[#767676] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#C2A278]" /> Vestidos
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#FAF9F6] border border-[#E7DFD3] text-xs font-medium text-[#767676] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#C2A278]" /> Saias
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#FAF9F6] border border-[#E7DFD3] text-xs font-medium text-[#767676] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#C2A278]" /> Jaquetas
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
