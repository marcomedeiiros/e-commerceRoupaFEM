import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const NotFound: React.FC = () => {
  useDocumentTitle('Página não encontrada');

  return (
    <div className="py-24 px-4 text-center max-w-md mx-auto flex flex-col items-center">
      <div className="w-20 h-20 rounded-full bg-[#F4EFE6] border border-[#E7DFD3] flex items-center justify-center mb-6 text-[#767676]">
        <Compass className="w-9 h-9 text-[#8E6E45]" />
      </div>

      <span className="text-xs uppercase font-bold tracking-widest text-[#8E6E45] mb-1">
        Erro 404
      </span>

      <h1 className="font-serif text-3xl font-medium text-[#1A1A1A] mb-3">
        Página não encontrada
      </h1>

      <p className="text-sm text-[#767676] mb-8 leading-relaxed">
        O endereço que você tentou acessar não existe ou foi movido para outra rota do nosso catálogo.
      </p>

      <Link
        to="/"
        className="px-8 py-3.5 bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs uppercase font-semibold tracking-widest rounded-xl transition-all shadow-md flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar ao Início</span>
      </Link>
    </div>
  );
};
