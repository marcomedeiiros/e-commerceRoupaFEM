import React, { useState } from 'react';
import type { CustomerData, ShippingOption } from '../../types/product';
import { maskCEP } from '../../utils/masks';
import { Search, Loader2 } from 'lucide-react';
import { STORE_CONFIG } from '../../config/store';
import { formatCurrency } from '../../utils/formatCurrency';

interface StepShippingProps {
  data: Partial<CustomerData>;
  onChange: (field: keyof CustomerData, value: string) => void;
  selectedShipping: ShippingOption | null;
  onSelectShipping: (option: ShippingOption) => void;
  isFreeShipping: boolean;
}

export const StepShipping: React.FC<StepShippingProps> = ({
  data,
  onChange,
  selectedShipping,
  onSelectShipping,
  isFreeShipping,
}) => {
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const fetchCepAddress = async (cepClean: string) => {
    if (cepClean.length !== 8) return;

    try {
      setIsLoadingCep(true);
      const res = await fetch(`https://viacep.com.br/ws/${cepClean}/json/`);
      const result = await res.json();

      if (!result.erro) {
        onChange('street', result.logradouro || '');
        onChange('neighborhood', result.bairro || '');
        onChange('city', result.localidade || '');
        onChange('state', result.uf || '');
      }
    } catch {
      // Ignora erro de rede e permite preenchimento manual
    } finally {
      setIsLoadingCep(false);
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const masked = maskCEP(raw);
    onChange('cep', masked);

    const numericOnly = raw.replace(/\D/g, '');
    if (numericOnly.length === 8) {
      fetchCepAddress(numericOnly);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E7DFD3] p-6 space-y-6 shadow-xs">
      <div className="flex items-center gap-2 pb-3 border-b border-[#E7DFD3]">
        <div className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-bold">
          2
        </div>
        <h3 className="font-serif text-lg font-semibold text-[#1A1A1A]">
          Endereço de Entrega
        </h3>
      </div>

      {/* Inputs de Endereço */}
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        {/* CEP */}
        <div className="sm:col-span-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
            CEP *
          </label>
          <div className="relative">
            <input
              type="text"
              required
              maxLength={9}
              value={data.cep || ''}
              onChange={handleCepChange}
              placeholder="00000-000"
              className="w-full bg-[#FAF9F6] border border-[#D4C6B3] rounded-xl py-2.5 pl-3.5 pr-10 text-xs text-[#1A1A1A] placeholder-[#767676] focus:outline-hidden focus:ring-1 focus:ring-[#1A1A1A]"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isLoadingCep ? (
                <Loader2 className="w-4 h-4 text-[#8E6E45] animate-spin" />
              ) : (
                <Search className="w-4 h-4 text-[#767676]" />
              )}
            </div>
          </div>
          <span className="text-[10px] text-[#767676] mt-1 block">Preenchimento automático do endereço</span>
        </div>

        {/* Rua */}
        <div className="sm:col-span-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
            Rua / Avenida *
          </label>
          <input
            type="text"
            required
            value={data.street || ''}
            onChange={(e) => onChange('street', e.target.value)}
            placeholder="Ex: Rua das Flores"
            className="w-full bg-[#FAF9F6] border border-[#D4C6B3] rounded-xl py-2.5 px-3.5 text-xs text-[#1A1A1A] placeholder-[#767676] focus:outline-hidden focus:ring-1 focus:ring-[#1A1A1A]"
          />
        </div>

        {/* Número */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
            Número *
          </label>
          <input
            type="text"
            required
            value={data.number || ''}
            onChange={(e) => onChange('number', e.target.value)}
            placeholder="Ex: 120"
            className="w-full bg-[#FAF9F6] border border-[#D4C6B3] rounded-xl py-2.5 px-3.5 text-xs text-[#1A1A1A] placeholder-[#767676] focus:outline-hidden focus:ring-1 focus:ring-[#1A1A1A]"
          />
        </div>

        {/* Complemento */}
        <div className="sm:col-span-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
            Complemento (Opcional)
          </label>
          <input
            type="text"
            value={data.complement || ''}
            onChange={(e) => onChange('complement', e.target.value)}
            placeholder="Apto, Bloco, Casa..."
            className="w-full bg-[#FAF9F6] border border-[#D4C6B3] rounded-xl py-2.5 px-3.5 text-xs text-[#1A1A1A] placeholder-[#767676] focus:outline-hidden focus:ring-1 focus:ring-[#1A1A1A]"
          />
        </div>

        {/* Bairro */}
        <div className="sm:col-span-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
            Bairro *
          </label>
          <input
            type="text"
            required
            value={data.neighborhood || ''}
            onChange={(e) => onChange('neighborhood', e.target.value)}
            placeholder="Bairro"
            className="w-full bg-[#FAF9F6] border border-[#D4C6B3] rounded-xl py-2.5 px-3.5 text-xs text-[#1A1A1A] placeholder-[#767676] focus:outline-hidden focus:ring-1 focus:ring-[#1A1A1A]"
          />
        </div>

        {/* Cidade */}
        <div className="sm:col-span-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
            Cidade *
          </label>
          <input
            type="text"
            required
            value={data.city || ''}
            onChange={(e) => onChange('city', e.target.value)}
            placeholder="Cidade"
            className="w-full bg-[#FAF9F6] border border-[#D4C6B3] rounded-xl py-2.5 px-3.5 text-xs text-[#1A1A1A] placeholder-[#767676] focus:outline-hidden focus:ring-1 focus:ring-[#1A1A1A]"
          />
        </div>

        {/* Estado */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
            UF *
          </label>
          <input
            type="text"
            required
            maxLength={2}
            value={data.state || ''}
            onChange={(e) => onChange('state', e.target.value.toUpperCase())}
            placeholder="SP"
            className="w-full bg-[#FAF9F6] border border-[#D4C6B3] rounded-xl py-2.5 px-3.5 text-xs text-[#1A1A1A] placeholder-[#767676] focus:outline-hidden focus:ring-1 focus:ring-[#1A1A1A]"
          />
        </div>
      </div>

      {/* Opções de Entrega */}
      <div className="pt-4 border-t border-[#E7DFD3] space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
          Selecione a Modalidade de Envio
        </label>

        <div className="space-y-2">
          {STORE_CONFIG.shippingOptions.map((opt) => {
            const price = isFreeShipping ? 0 : opt.price;
            const isSelected = selectedShipping?.id === opt.id;

            return (
              <label
                key={opt.id}
                onClick={() => onSelectShipping(opt)}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#1A1A1A] bg-[#FAF9F6] shadow-2xs'
                    : 'border-[#E7DFD3] hover:border-[#D4C6B3]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping_choice"
                    checked={isSelected}
                    onChange={() => onSelectShipping(opt)}
                    className="accent-[#1A1A1A]"
                  />
                  <div>
                    <span className="font-semibold text-[#1A1A1A] block">{opt.name}</span>
                    <span className="text-[#767676] text-[11px]">{opt.description} • <strong>{opt.deliveryDays}</strong></span>
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
    </div>
  );
};
