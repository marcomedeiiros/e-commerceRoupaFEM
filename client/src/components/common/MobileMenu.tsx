import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Heart, ShoppingBag, Phone, MapPin, Sparkles } from 'lucide-react';
import { STORE_CONFIG } from '../../config/store';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();

  if (!isOpen) return null;

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Calças Femininas', path: '/calcas' },
    { name: 'Promoções & Ofertas', path: '/promocoes', highlight: true },
    { name: 'Sobre a Aura', path: '/sobre' },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF9F6] shadow-2xl flex flex-col z-10 border-r border-[#E7DFD3] transition-transform duration-300 ease-out">
        {/* Top Header */}
        <div className="p-5 flex items-center justify-between border-b border-[#E7DFD3]">
          <div>
            <span className="font-serif text-2xl font-semibold tracking-wider text-[#1A1A1A]">
              {STORE_CONFIG.shortName.toUpperCase()}
            </span>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-[#767676] -mt-1">
              Atelier Feminino
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F4EFE6] text-[#1A1A1A] transition-colors"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={`flex items-center justify-between py-3 text-base font-medium transition-colors border-b border-[#E7DFD3]/40 ${
                    isActive
                      ? 'text-[#1A1A1A] font-semibold pl-2 border-l-2 border-l-[#1A1A1A]'
                      : 'text-[#4A4A4A] hover:text-black'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.name}
                    {link.highlight && (
                      <span className="text-[10px] uppercase tracking-wider bg-[#C2A278]/20 text-[#8E6E45] px-2 py-0.5 rounded-full font-semibold">
                        Sale
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions in Mobile Menu */}
          <div className="pt-4 space-y-2">
            <Link
              to="/favoritos"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-lg bg-[#F4EFE6] hover:bg-[#E7DFD3] transition-colors text-sm font-medium"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-[#1A1A1A]" />
                <span>Meus Favoritos</span>
              </div>
              <span className="text-xs bg-[#1A1A1A] text-white px-2 py-0.5 rounded-full font-semibold">
                {totalFavorites}
              </span>
            </Link>

            <Link
              to="/carrinho"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-lg bg-[#F4EFE6] hover:bg-[#E7DFD3] transition-colors text-sm font-medium"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-[#1A1A1A]" />
                <span>Sacola de Compras</span>
              </div>
              <span className="text-xs bg-[#1A1A1A] text-white px-2 py-0.5 rounded-full font-semibold">
                {totalItems}
              </span>
            </Link>
          </div>

          {/* Future categories preview teaser */}
          <div className="pt-6 border-t border-[#E7DFD3]">
            <p className="text-xs font-semibold text-[#767676] uppercase tracking-wider mb-2">
              Coleções & Categorias
            </p>
            <ul className="space-y-2 text-sm text-[#4A4A4A]">
              <li>
                <Link to="/calcas" onClick={onClose} className="hover:text-black flex items-center gap-1.5 font-medium text-[#1A1A1A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C2A278]"></span>
                  Calças Femininas (Catálogo Completo)
                </Link>
              </li>
              <li className="text-stone-400 text-xs flex items-center justify-between">
                <span>Blusas & Camisas</span>
                <span className="italic text-[10px]">Em breve</span>
              </li>
              <li className="text-stone-400 text-xs flex items-center justify-between">
                <span>Vestidos & Alfaiataria</span>
                <span className="italic text-[10px]">Em breve</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer info in Mobile Menu */}
        <div className="p-5 bg-[#F4EFE6] border-t border-[#E7DFD3] text-xs text-[#767676] space-y-2">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span>WhatsApp: {STORE_CONFIG.whatsappFormatted}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span className="truncate">{STORE_CONFIG.address}</span>
          </div>
          <p className="text-[11px] pt-1 text-[#8E6E45] flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Compra 100% Segura & Troca Fácil
          </p>
        </div>
      </div>
    </div>
  );
};
