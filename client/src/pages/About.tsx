import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const About: React.FC = () => {
  useDocumentTitle('Sobre Nós | Nossa História', 'Conheça o compromisso da Aura Atelier com a alfaiataria e modelagem feminina de alto padrão.');

  return (
    <div className="py-12 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#8E6E45] block">
            Manifesto & História
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] font-medium tracking-tight">
            A Arte da Modelagem Perfeita
          </h1>
          <p className="text-base text-[#767676] leading-relaxed">
            Nascemos com um propósito claro: reinventar a experiência de vestir calças femininas no Brasil, aliando alfaiataria impecável a um conforto inegociável.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-[#E7DFD3] aspect-[4/5] bg-[#F4EFE6]">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80"
              alt="Atelier de alfaiataria feminina"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="font-serif text-3xl text-[#1A1A1A]">
              Por que começamos pelas calças?
            </h2>
            <p className="text-sm text-[#555555] leading-relaxed">
              Toda mulher já viveu a frustração de encontrar uma calça com cintura larga e quadril apertado, ou tecidos sintéticos que perdem a estrutura após poucas lavagens.
            </p>
            <p className="text-sm text-[#555555] leading-relaxed">
              Decidimos dedicar toda a nossa energia e pesquisa inicial na peça mais complexa e essencial da moda feminina: <strong>a calça</strong>. Cada milímetro dos nossos moldes foi desenhado pensando na diversidade das curvas femininas.
            </p>
            <div className="pt-2">
              <Link
                to="/calcas"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white text-xs uppercase font-semibold tracking-widest rounded-xl hover:bg-[#333333] transition-colors"
              >
                <span>Conheça a Coleção</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#E7DFD3]">
          <div className="bg-white p-6 rounded-2xl border border-[#E7DFD3] space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#8E6E45]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#1A1A1A]">Matérias-Primas Nobres</h3>
            <p className="text-xs text-[#767676] leading-relaxed">
              Algodão 100% certificado BCI, Liocel Tencel™ e viscose sarjada com alta gramatura. Tecidos que respiram e duram por anos.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E7DFD3] space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#8E6E45]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#1A1A1A]">Corte Ergonômico</h3>
            <p className="text-xs text-[#767676] leading-relaxed">
              Cinturas altas verdadeiras com estrutura interna que abraça o corpo sem apertar ou limitar seus movimentos ao longo do dia.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E7DFD3] space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#8E6E45]">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#1A1A1A]">Produção Consciente</h3>
            <p className="text-xs text-[#767676] leading-relaxed">
              Respeito absoluto à mão de obra e à sustentabilidade com processos de lavagem a seco que economizam até 70% de água.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
