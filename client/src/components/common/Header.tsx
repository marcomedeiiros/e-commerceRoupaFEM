import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, ArrowRight } from 'lucide-react';
import { STORE_CONFIG } from '../../config/store';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { AnnouncementBar } from './AnnouncementBar';
import { MobileMenu } from './MobileMenu';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/calcas?busca=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      <AnnouncementBar />

      <div
        className={`w-full bg-[#FAF9F6]/95 backdrop-blur-md border-b transition-all duration-300 ${
          isScrolled ? 'border-[#E7DFD3] shadow-xs py-3' : 'border-[#E7DFD3]/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Mobile Menu Trigger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg text-[#1A1A1A] hover:bg-[#F4EFE6] transition-colors"
                aria-label="Abrir menu principal"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide">
              <Link
                to="/"
                className={`transition-colors py-1 relative ${
                  location.pathname === '/'
                    ? 'text-[#1A1A1A] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#1A1A1A]'
                    : 'text-[#4A4A4A] hover:text-[#1A1A1A]'
                }`}
              >
                Início
              </Link>
              <Link
                to="/calcas"
                className={`transition-colors py-1 relative ${
                  location.pathname === '/calcas'
                    ? 'text-[#1A1A1A] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#1A1A1A]'
                    : 'text-[#4A4A4A] hover:text-[#1A1A1A]'
                }`}
              >
                Calças Femininas
              </Link>
              <Link
                to="/promocoes"
                className={`transition-colors py-1 relative flex items-center gap-1.5 ${
                  location.pathname === '/promocoes'
                    ? 'text-[#8E6E45] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#8E6E45]'
                    : 'text-[#8E6E45] hover:text-[#6F5230]'
                }`}
              >
                <span>Promoções</span>
                <span className="text-[9px] uppercase tracking-wider bg-[#C2A278]/20 px-1.5 py-0.5 rounded font-bold">
                  OFF
                </span>
              </Link>
              <Link
                to="/sobre"
                className={`transition-colors py-1 relative ${
                  location.pathname === '/sobre'
                    ? 'text-[#1A1A1A] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#1A1A1A]'
                    : 'text-[#4A4A4A] hover:text-[#1A1A1A]'
                }`}
              >
                Sobre Nós
              </Link>
            </nav>

            {/* Center: Brand Logo */}
            <div className="flex-1 lg:flex-initial text-center lg:text-center">
              <Link to="/" className="inline-block group">
                <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.2em] text-[#1A1A1A] group-hover:opacity-90 transition-opacity">
                  {STORE_CONFIG.shortName.toUpperCase()}
                </span>
                <span className="block text-[9px] uppercase tracking-[0.35em] text-[#767676] -mt-1 group-hover:text-[#1A1A1A] transition-colors">
                  Atelier Feminino
                </span>
              </Link>
            </div>

            {/* Right: Actions (Search, Favorites, Cart) */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full text-[#1A1A1A] hover:bg-[#F4EFE6] transition-colors relative"
                aria-label="Buscar produtos"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Button */}
              <Link
                to="/favoritos"
                className="p-2 rounded-full text-[#1A1A1A] hover:bg-[#F4EFE6] transition-colors relative"
                aria-label={`Ver favoritos (${totalFavorites} itens)`}
              >
                <Heart className="w-5 h-5" />
                {totalFavorites > 0 && (
                  <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-[#C2A278] text-white text-[10px] font-bold rounded-full px-1 shadow-xs animate-in zoom-in">
                    {totalFavorites}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <Link
                to="/carrinho"
                className="p-2 rounded-full text-[#1A1A1A] hover:bg-[#F4EFE6] transition-colors relative flex items-center gap-2"
                aria-label={`Ver carrinho (${totalItems} produtos)`}
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-[#1A1A1A] text-white text-[10px] font-bold rounded-full px-1 shadow-xs animate-in zoom-in">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="hidden xl:inline text-xs font-semibold tracking-wider uppercase text-[#1A1A1A]">
                  Sacola
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Expandable Search Input Dropdown */}
        {isSearchOpen && (
          <div className="border-t border-[#E7DFD3] bg-[#FAF9F6] px-4 py-3 sm:py-4 transition-all duration-300">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="w-5 h-5 text-[#767676] absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Pesquisar calças (ex: wide leg, alfaiataria, mom jeans...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-white border border-[#D4C6B3] rounded-full py-2.5 pl-11 pr-24 text-sm text-[#1A1A1A] placeholder-[#767676] focus:outline-hidden focus:ring-2 focus:ring-[#1A1A1A]/20 focus:border-[#1A1A1A] transition-all"
                />
                <div className="absolute right-2 flex items-center gap-1">
                  <button
                    type="submit"
                    className="p-1.5 bg-[#1A1A1A] hover:bg-[#2E2E2E] text-white rounded-full transition-colors"
                    aria-label="Executar busca"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="p-1.5 text-[#767676] hover:text-[#1A1A1A] transition-colors"
                    aria-label="Fechar busca"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};
