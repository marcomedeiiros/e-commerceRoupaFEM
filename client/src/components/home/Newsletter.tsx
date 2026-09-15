import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Por favor, informe um e-mail válido.', 'error');
      return;
    }

    setIsSubmitted(true);
    showToast('Obrigada! Você receberá nossas novidades e cupons exclusivos em primeira mão.', 'success');
  };

  return (
    <section className="py-20 bg-white border-b border-[#E7DFD3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-12 h-12 rounded-full bg-[#F4EFE6] border border-[#E7DFD3] flex items-center justify-center mx-auto mb-4 text-[#1A1A1A]">
          <Mail className="w-5 h-5 text-[#8E6E45]" />
        </div>

        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#8E6E45] block mb-2">
          Comunidade Aura VIP
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-medium tracking-tight">
          Receba tendências de moda e 10% OFF
        </h2>

        <p className="mt-3 text-sm text-[#767676] max-w-md mx-auto leading-relaxed">
          Cadastre seu melhor e-mail para receber lançamentos exclusivos de modelagens, dicas de estilo e promoções antes de todo mundo.
        </p>

        {isSubmitted ? (
          <div className="mt-8 p-4 bg-[#F4EFE6] rounded-xl border border-[#E7DFD3] max-w-md mx-auto flex items-center justify-center gap-2 text-sm text-[#1A1A1A] font-medium animate-in fade-in">
            <CheckCircle className="w-5 h-5 text-[#C2A278]" />
            <span>Inscrição confirmada com sucesso! Verifique sua caixa de entrada.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu melhor e-mail..."
              className="flex-1 bg-[#FAF9F6] border border-[#D4C6B3] rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#767676] focus:outline-hidden focus:ring-2 focus:ring-[#1A1A1A]/20 focus:border-[#1A1A1A] transition-all"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs uppercase font-bold tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 shadow-sm"
            >
              <span>Cadastrar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="mt-3 text-[11px] text-[#767676]">
          Respeitamos sua privacidade. Cancele sua inscrição quando desejar com um clique.
        </p>
      </div>
    </section>
  );
};
