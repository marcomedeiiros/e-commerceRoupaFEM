import React from 'react';
import { Truck, ShieldCheck, RefreshCw, MessageSquare } from 'lucide-react';

export const BenefitsBar: React.FC = () => {
  const benefits = [
    {
      icon: Truck,
      title: "Envio para todo o Brasil",
      description: "Frete expresso com rastreamento seguro até sua porta.",
    },
    {
      icon: ShieldCheck,
      title: "Compra 100% Segura",
      description: "Seus dados blindados com criptografia de ponta a ponta.",
    },
    {
      icon: RefreshCw,
      title: "Troca Fácil & Grátis",
      description: "Primeira troca garantida em até 30 dias após o recebimento.",
    },
    {
      icon: MessageSquare,
      title: "Atendimento Personalizado",
      description: "Consultoras de estilo disponíveis via WhatsApp para te ajudar.",
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-[#E7DFD3]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#FAF9F6] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F4EFE6] border border-[#E7DFD3] flex items-center justify-center shrink-0 text-[#1A1A1A]">
                  <Icon className="w-5 h-5 text-[#8E6E45]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1A1A1A] tracking-wide mb-1">
                    {b.title}
                  </h4>
                  <p className="text-xs text-[#767676] leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
