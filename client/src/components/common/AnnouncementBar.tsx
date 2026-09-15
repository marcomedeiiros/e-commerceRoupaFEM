import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { STORE_CONFIG } from '../../config/store';
import { formatCurrency } from '../../utils/formatCurrency';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#1A1A1A] text-white text-xs py-2 px-4 relative flex items-center justify-center tracking-wider uppercase font-medium">
      <div className="flex items-center gap-2 text-center text-[11px] sm:text-xs">
        <Sparkles className="w-3.5 h-3.5 text-[#C2A278] shrink-0 animate-pulse" />
        <span>
          Frete grátis para todo o Brasil acima de {formatCurrency(STORE_CONFIG.freeShippingThreshold)} | 10% OFF no cupom <strong className="text-[#C2A278] tracking-widest">BEMVINDA10</strong>
        </span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 text-white/50 hover:text-white transition-colors"
        aria-label="Fechar aviso"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
