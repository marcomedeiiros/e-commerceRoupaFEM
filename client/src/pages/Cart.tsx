import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartItemRow } from '../components/cart/CartItemRow';
import { CartSummary } from '../components/cart/CartSummary';
import { EmptyCart } from '../components/cart/EmptyCart';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const Cart: React.FC = () => {
  useDocumentTitle('Sacola de Compras', 'Revise seus itens e finalize seu pedido com total segurança.');
  const { items, updateQuantity, removeFromCart, clearCart, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="py-10 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7DFD3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1A1A]">
                Minha Sacola
              </h1>
              <p className="text-xs text-[#767676]">
                {totalItems} {totalItems === 1 ? 'produto adicionado' : 'produtos adicionados'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/calcas"
              className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:text-[#8E6E45] flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continuar Comprando</span>
            </Link>

            <button
              onClick={clearCart}
              className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-medium transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar Sacola</span>
            </button>
          </div>
        </div>

        {/* Layout Grid: Items (8 cols) + Summary (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-3">
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          {/* Cart Financial Summary */}
          <div className="lg:col-span-4 sticky top-28">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};
