import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#F4EFE6] border-b border-[#E7DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[640px] items-center py-12 lg:py-0">
          {/* Text Content */}
          <div className="lg:col-span-7 z-10 lg:pr-12 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#D4C6B3] backdrop-blur-xs text-xs font-semibold uppercase tracking-widest text-[#8E6E45] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C2A278]" />
              <span>Coleção Exclusiva de Calças Femininas</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1A1A1A] tracking-tight leading-[1.12]">
              Seu estilo começa pela <span className="italic font-normal">escolha certa</span>.
            </h1>

            <p className="text-base sm:text-lg text-[#555555] max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Calças femininas que combinam conforto, qualidade e estilo. Descubra modelagens com caimento impecável para todas as ocasiões do seu dia.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/calcas"
                className="w-full sm:w-auto px-8 py-4 bg-[#1A1A1A] hover:bg-[#2E2E2E] text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                <span>Comprar agora</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/calcas?busca=alfaiataria"
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/80 text-[#1A1A1A] border border-[#1A1A1A]/30 hover:border-[#1A1A1A] text-xs font-semibold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center"
              >
                <span>Ver Alfaiataria</span>
              </Link>
            </div>

            {/* Trust micro metrics */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#E7DFD3]/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">100%</span>
                <p className="text-[11px] text-[#767676] uppercase tracking-wider">Algodão & Fibras Nobres</p>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">34 ao 46</span>
                <p className="text-[11px] text-[#767676] uppercase tracking-wider">Grade Inclusiva</p>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">4.9 / 5.0</span>
                <p className="text-[11px] text-[#767676] uppercase tracking-wider">Avaliação das Clientes</p>
              </div>
            </div>
          </div>

          {/* Hero Photography Showcase */}
          <div className="lg:col-span-5 relative mt-10 lg:mt-0 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              {/* Backing decorative shapes */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#E7DFD3] to-white/40 rounded-3xl -rotate-2 transform scale-95 opacity-70"></div>

              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=85"
                  alt="Modelo vestindo Calça Wide Leg Aura Atelier"
                  className="w-full h-full object-cover object-top"
                />

                {/* Floating pill badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#8E6E45]">
                      Destaque da Semana
                    </span>
                    <p className="text-sm font-serif font-semibold text-[#1A1A1A]">
                      Calça Wide Leg Jeans Clássica
                    </p>
                  </div>
                  <Link
                    to="/produto/calca-wide-leg-jeans"
                    className="p-2 rounded-full bg-[#1A1A1A] text-white hover:scale-105 transition-transform"
                    aria-label="Ver calça em destaque"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
