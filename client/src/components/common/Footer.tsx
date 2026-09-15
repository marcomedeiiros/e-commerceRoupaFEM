import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, MapPin, ShieldCheck, RefreshCw, Truck, Lock } from 'lucide-react';
import { STORE_CONFIG } from '../../config/store';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-white/10 text-stone-300">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-[#C2A278] shrink-0" />
            <div>
              <p className="text-xs uppercase font-semibold tracking-wider text-white">Frete Grátis</p>
              <p className="text-[11px] text-stone-400">Acima de R$ 299 para todo o Brasil</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 text-[#C2A278] shrink-0" />
            <div>
              <p className="text-xs uppercase font-semibold tracking-wider text-white">Troca Descomplicada</p>
              <p className="text-[11px] text-stone-400">Até 30 dias após o recebimento</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-[#C2A278] shrink-0" />
            <div>
              <p className="text-xs uppercase font-semibold tracking-wider text-white">Compra Segura</p>
              <p className="text-[11px] text-stone-400">Ambiente criptografado SSL 256-bit</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#C2A278] shrink-0" />
            <div>
              <p className="text-xs uppercase font-semibold tracking-wider text-white">Qualidade Premium</p>
              <p className="text-[11px] text-stone-400">Modelagens e tecidos de alto padrão</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl font-semibold tracking-[0.2em] text-white">
                {STORE_CONFIG.shortName.toUpperCase()}
              </span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-[#C2A278] -mt-1 font-medium">
                Atelier Feminino
              </span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              {STORE_CONFIG.description}
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <a
                href={STORE_CONFIG.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 hover:text-white hover:bg-[#C2A278] hover:border-[#C2A278] transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <p className="text-xs uppercase font-semibold tracking-widest text-[#C2A278]">
              Navegação
            </p>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/calcas" className="hover:text-white transition-colors">
                  Calças Femininas
                </Link>
              </li>
              <li>
                <Link to="/promocoes" className="hover:text-white transition-colors">
                  Promoções & Ofertas
                </Link>
              </li>
              <li>
                <Link to="/favoritos" className="hover:text-white transition-colors">
                  Lista de Desejos
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:text-white transition-colors">
                  Sobre a Aura
                </Link>
              </li>
            </ul>
          </div>

          {/* Modelagens / Categorias */}
          <div className="space-y-3">
            <p className="text-xs uppercase font-semibold tracking-widest text-[#C2A278]">
              Modelagens
            </p>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/calcas?busca=wide" className="hover:text-white transition-colors">
                  Calça Wide Leg
                </Link>
              </li>
              <li>
                <Link to="/calcas?busca=alfaiataria" className="hover:text-white transition-colors">
                  Calça Alfaiataria
                </Link>
              </li>
              <li>
                <Link to="/calcas?busca=mom" className="hover:text-white transition-colors">
                  Calça Mom Jeans
                </Link>
              </li>
              <li>
                <Link to="/calcas?busca=pantalona" className="hover:text-white transition-colors">
                  Calça Pantalona
                </Link>
              </li>
              <li>
                <Link to="/calcas?busca=skinny" className="hover:text-white transition-colors">
                  Calça Skinny
                </Link>
              </li>
            </ul>
          </div>

          {/* Atendimento */}
          <div className="space-y-3">
            <p className="text-xs uppercase font-semibold tracking-widest text-[#C2A278]">
              Atendimento
            </p>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MessageCircle className="w-4 h-4 text-[#C2A278] shrink-0 mt-0.5" />
                <span>WhatsApp: {STORE_CONFIG.whatsappFormatted}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#C2A278] shrink-0 mt-0.5" />
                <span className="break-all">{STORE_CONFIG.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C2A278] shrink-0 mt-0.5" />
                <span>{STORE_CONFIG.address}</span>
              </li>
              <li className="text-[11px] text-stone-500 pt-1">
                Horário: {STORE_CONFIG.hours}
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods and Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-500">
          <div>
            <p>© {currentYear} {STORE_CONFIG.name}. Todos os direitos reservados. CNPJ 00.000.000/0001-00.</p>
            <div className="flex gap-4 mt-2">
              <span className="hover:underline cursor-pointer">Política de Privacidade</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">Termos de Uso</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">Política de Trocas e Devoluções</span>
            </div>
          </div>

          {/* Payment Badges */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="text-[10px] uppercase tracking-wider text-stone-400">Formas de Pagamento Aceitas</span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 bg-white/10 rounded font-semibold text-white text-[11px] tracking-wide">PIX</span>
              <span className="px-2 py-1 bg-white/10 rounded text-stone-300 text-[11px]">Visa</span>
              <span className="px-2 py-1 bg-white/10 rounded text-stone-300 text-[11px]">Mastercard</span>
              <span className="px-2 py-1 bg-white/10 rounded text-stone-300 text-[11px]">Elo</span>
              <span className="px-2 py-1 bg-white/10 rounded text-stone-300 text-[11px]">Boleto</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
