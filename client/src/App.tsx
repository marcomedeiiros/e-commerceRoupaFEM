import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import { ScrollToTop } from './components/common/ScrollToTop';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';

// Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Favorites } from './pages/Favorites';
import { Checkout } from './pages/Checkout';
import { Promotions } from './pages/Promotions';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <Router>
      <ToastProvider>
        <FavoritesProvider>
          <CartProvider>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1A1A] font-sans selection:bg-[#E7DFD3] selection:text-[#1A1A1A]">
              {/* Header com Navegação, Busca, Favoritos e Carrinho */}
              <Header />

              {/* Conteúdo Principal com Rotas */}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/calcas" element={<Products />} />
                  <Route path="/produto/:slug" element={<ProductDetails />} />
                  <Route path="/carrinho" element={<Cart />} />
                  <Route path="/favoritos" element={<Favorites />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/promocoes" element={<Promotions />} />
                  <Route path="/sobre" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              {/* Rodapé da Loja */}
              <Footer />
            </div>
          </CartProvider>
        </FavoritesProvider>
      </ToastProvider>
    </Router>
  );
};

export default App;
