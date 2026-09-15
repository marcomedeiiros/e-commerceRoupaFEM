import React from 'react';
import type { CartItem, ShippingOption } from '../../types/product';
import { formatCurrency } from '../../utils/formatCurrency';
import { STORE_CONFIG } from '../../config/store';
import { ShieldCheck, Truck, ShoppingBag } from 'lucide-react';

interface OrderSummaryCardProps {
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: ShippingOption | null;
  total: number;
  couponCode?: string;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  items,
  subtotal,
  discount,
  shipping,
  total,
  couponCode,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E7DFD3] p-6 space-y-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-[#E7DFD3]">
        <h3 className="font-serif text-xl font-semibold text-[#1A1A1A]">
          Itens do Pedido ({items.reduce((s, i) => s + i.quantity, 0)})
        </h3>
        <ShoppingBag className="w-5 h-5 text-[#767676]" />
      </div>

      {/* Items list */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 text-xs">
            <div className="w-14 h-16 rounded-md overflow-hidden bg-[#F4EFE6] shrink-0 border border-[#E7DFD3]">
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#1A1A1A] truncate">{item.product.name}</p>
              <p className="text-[#767676]">
                Tam: {item.selectedSize} • {item.selectedColor}
              </p>
              <p className="text-[#1A1A1A] font-semibold">
                {item.quantity}x {formatCurrency(item.product.price)}
              </p>
            </div>
            <span className="font-bold text-[#1A1A1A]">
              {formatCurrency(item.product.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Financial breakdown */}
      <div className="space-y-2.5 pt-4 border-t border-[#E7DFD3] text-xs">
        <div className="flex justify-between text-[#555555]">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-700 font-semibold">
            <span>Desconto {couponCode && `(${couponCode})`}</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-[#555555]">
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-[#8E6E45]" />
            <span>Frete ({shipping?.name || 'A calcular'})</span>
          </span>
          <span>
            {shipping?.price === 0 || subtotal >= STORE_CONFIG.freeShippingThreshold
              ? 'Grátis'
              : formatCurrency(shipping?.price || 0)}
          </span>
        </div>

        <div className="flex justify-between items-baseline pt-3 border-t border-[#E7DFD3] text-[#1A1A1A]">
          <span className="font-serif text-base font-bold">Total Final</span>
          <span className="text-xl font-bold text-[#1A1A1A]">{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E7DFD3] flex items-center gap-2 text-[11px] text-[#767676]">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Garantia de entrega com rastreamento e seguro total.</span>
      </div>
    </div>
  );
};
