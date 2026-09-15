import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategoryBanners } from '../components/home/CategoryBanners';
import { BenefitsBar } from '../components/home/BenefitsBar';
import { PromoSection } from '../components/home/PromoSection';
import { Newsletter } from '../components/home/Newsletter';
import { ProductCard } from '../components/products/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const Home: React.FC = () => {
  useDocumentTitle(
    'Início | Calças Femininas & Moda Sofisticada',
    'Conheça a coleção de calças femininas da Aura Atelier. Modelagens Wide Leg, Mom Jeans, Alfaiataria e Pantalona com corte impecável e elegância.'
  );

  // Busca produtos em destaque da API
  const { products: featuredProducts, loading } = useProducts({ featured: true, limit: 4 });


  return (
    <div className="space-y-0">
      {/* 1. Hero Banner Principal */}
      <HeroBanner />

      {/* 2. Seção de Benefícios (4 cards de confiança) */}
      <BenefitsBar />

      {/* 3. Produtos em Destaque */}
      <section className="py-20 bg-white border-b border-[#E7DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#8E6E45] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C2A278]" />
                <span>Mais Desejadas da Temporada</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-medium tracking-tight">
                Modelagens em Destaque
              </h2>
              <p className="mt-2 text-sm text-[#767676] max-w-md">
                As calças femininas favoritas das nossas clientes, com caimento testado e aprovado.
              </p>
            </div>

            <Link
              to="/calcas"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] hover:text-[#8E6E45] transition-colors group"
            >
              <span>Ver Catálogo Completo</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[3/4] rounded-2xl bg-[#F4EFE6] animate-pulse"
                  />
                ))
              : featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>

        </div>
      </section>

      {/* 4. Categorias & Arquitetura Escalável */}
      <CategoryBanners />

      {/* 5. Seção de Promoção */}
      <PromoSection />

      {/* 6. Newsletter */}
      <Newsletter />
    </div>
  );
};
