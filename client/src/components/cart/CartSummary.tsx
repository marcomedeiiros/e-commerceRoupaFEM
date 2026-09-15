import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, ArrowRight, X, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { STORE_CONFIG } from '../../config/store';

export const CartSummary: React.FC = () => {
  const {
    subtotal,
    discount,
    shipping,
    setShipping,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponCode('');
    }
  };

  const remainingForFreeShipping = Math.max(0, STORE_CONFIG.freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / STORE_CONFIG.freeShippingThreshold) * 100);

  return (
    <div className="bg-white rounded-2xl border border-[#E7DFD3] p-6 sm:p-8 space-y-6 shadow-xs">
      <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] pb-4 border-b border-[#E7DFD3]">
        Resumo do Pedido
      </h3>

      {/* Free Shipping Progress Bar */}
      <div className="bg-[#F4EFE6] p-4 rounded-xl border border-[#E7DFD3] space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#1A1A1A]">
          <Truck className="w-4 h-4 text-[#8E6E45]" />
          {remainingForFreeShipping === 0 ? (
            <span className="text-emerald-700">Parabéns! Você ganhou Frete Grátis! 🎉</span>
          ) : (
            <span>
              Faltam apenas <strong>{formatCurrency(remainingForFreeShipping)}</strong> para frete grátis!
            </span>
          )}
        </div>
        <div className="w-full bg-[#E7DFD3] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#C2A278] h-full transition-all duration-500 ease-out"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Coupon Field */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2">
          Você tem um cupom de desconto?
        </label>
        {appliedCoupon ? (
          <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>Cupom <strong>{appliedCoupon.code}</strong> aplicado ({appliedCoupon.discountPercent}% OFF)</span>
            </div>
            <button
              type="button"
              onClick={removeCoupon}
              className="text-emerald-800 hover:text-emerald-950 p-1"
              aria-label="Remover cupom"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="Ex: BEMVINDA10"
              className="flex-1 bg-[#FAF9F6] border border-[#D4C6B3] rounded-xl px-3.5 py-2.5 text-xs uppercase font-medium text-[#1A1A1A] placeholder-[#767676] focus:outline-hidden focus:ring-1 focus:ring-[#1A1A1A]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#333333] transition-colors"
            >
              Aplicar
            </button>
          </form>
        )}
        {couponError && (
          <p className="text-xs text-rose-600 mt-1.5 font-medium">{couponError}</p>
        )}
      </div>

      {/* Shipping Options Selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2">
          Opção de Entrega
        </label>
        <div className="space-y-2">
          {STORE_CONFIG.shippingOptions.map((opt) => {
            const isFree = subtotal >= STORE_CONFIG.freeShippingThreshold;
            const price = isFree ? 0 : opt.price;
            const isSelected = shipping?.id === opt.id;

            return (
              <label
                key={opt.id}
                onClick={() => setShipping(opt)}
                className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#1A1A1A] bg-[#FAF9F6] shadow-2xs'
                    : 'border-[#E7DFD3] hover:border-[#D4C6B3]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="shipping_opt"
                    checked={isSelected}
                    onChange={() => setShipping(opt)}
                    className="accent-[#1A1A1A]"
                  />
                  <div>
                    <span className="font-semibold text-[#1A1A1A] block">{opt.name}</span>
                    <span className="text-[#767676] text-[11px]">{opt.deliveryDays}</span>
                  </div>
                </div>
                <span className="font-bold text-[#1A1A1A]">
                  {price === 0 ? 'Grátis' : formatCurrency(price)}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Costs breakdown */}
      <div className="space-y-3 pt-4 border-t border-[#E7DFD3] text-sm">
        <div className="flex justify-between text-[#555555]">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-700 font-medium">
            <span>Desconto ({appliedCoupon?.code})</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-[#555555]">
          <span>Frete ({shipping?.name})</span>
          <span>
            {shipping?.price === 0 || subtotal >= STORE_CONFIG.freeShippingThreshold
              ? 'Grátis'
              : formatCurrency(shipping?.price || 0)}
          </span>
        </div>

        <div className="flex justify-between items-baseline pt-3 border-t border-[#E7DFD3] text-[#1A1A1A]">
          <span className="font-serif text-lg font-semibold">Total</span>
          <div className="text-right">
            <span className="text-2xl font-bold text-[#1A1A1A]">
              {formatCurrency(total)}
            </span>
            <p className="text-[11px] text-[#767676]">em até 6x sem juros</p>
          </div>
        </div>
      </div>

      {/* Proceed to checkout CTA */}
      <Link
        to="/checkout"
        className="w-full py-4 bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
      >
        <span>Fechar Pedido</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>

      <div className="flex items-center justify-center gap-2 text-[11px] text-[#767676]">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Compra 100% Criptografada e Segura</span>
      </div>
    </div>
  );
};
