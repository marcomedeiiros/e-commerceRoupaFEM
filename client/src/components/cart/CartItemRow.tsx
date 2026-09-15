import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';
import type { CartItem } from '../../types/product';
import { formatCurrency } from '../../utils/formatCurrency';
import { getColorHex } from '../../utils/colors';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const itemTotal = item.product.price * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 bg-white rounded-xl border border-[#E7DFD3] shadow-2xs">
      {/* Product Image & Info */}
      <div className="flex items-center gap-4">
        <Link
          to={`/produto/${item.product.slug}`}
          className="w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden bg-[#F4EFE6] shrink-0 border border-[#E7DFD3]"
        >
          <img
            src={item.product.images[0]}
            alt={item.product.name}
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-widest text-[#767676] font-semibold">
            {item.product.category}
          </span>
          <Link
            to={`/produto/${item.product.slug}`}
            className="block text-sm sm:text-base font-medium text-[#1A1A1A] hover:text-[#8E6E45] transition-colors leading-tight"
          >
            {item.product.name}
          </Link>

          {/* Selected attributes */}
          <div className="flex items-center gap-3 text-xs text-[#555555] pt-1">
            <span className="bg-[#F4EFE6] px-2 py-0.5 rounded font-semibold text-[#1A1A1A]">
              Tam: {item.selectedSize}
            </span>
            <div className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full border border-black/20"
                style={{ backgroundColor: getColorHex(item.selectedColor) }}
              />
              <span>{item.selectedColor}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-[#1A1A1A] pt-1">
            {formatCurrency(item.product.price)} un.
          </p>
        </div>
      </div>

      {/* Quantity & Subtotal */}
      <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E7DFD3]/60">
        {/* Quantity Controls */}
        <div className="flex items-center border border-[#D4C6B3] rounded-lg bg-[#FAF9F6]">
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="p-1.5 sm:p-2 text-[#1A1A1A] hover:bg-[#E7DFD3] transition-colors rounded-l-lg"
            aria-label="Diminuir quantidade"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-xs sm:text-sm font-semibold text-[#1A1A1A]">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="p-1.5 sm:p-2 text-[#1A1A1A] hover:bg-[#E7DFD3] transition-colors rounded-r-lg"
            aria-label="Aumentar quantidade"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Subtotal */}
        <div className="text-right">
          <p className="text-[10px] uppercase font-bold text-[#767676] sm:hidden">Subtotal</p>
          <p className="text-sm sm:text-base font-bold text-[#1A1A1A]">
            {formatCurrency(itemTotal)}
          </p>
        </div>

        {/* Remove item */}
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="p-2 text-[#767676] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          title="Remover produto do carrinho"
          aria-label={`Remover ${item.product.name}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
