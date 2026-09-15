import React from 'react';
import type { CustomerData } from '../../types/product';
import { maskCPF, maskPhone } from '../../utils/masks';
import { User, Mail, Phone, FileText } from 'lucide-react';

interface StepCustomerProps {
  data: Partial<CustomerData>;
  onChange: (field: keyof CustomerData, value: string) => void;
}

export const StepCustomer: React.FC<StepCustomerProps> = ({ data, onChange }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E7DFD3] p-6 space-y-4 shadow-xs">
      <div className="flex items-center gap-2 pb-3 border-b border-[#E7DFD3]">
        <div className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-bold">
          1
        </div>
        <h3 className="font-serif text-lg font-semibold text-[#1A1A1A]">
          Dados Pessoais
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nome Completo */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
            Nome Completo *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[#767676] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              required
              value={data.fullName || ''}
              onChange={(e) => onChange('fullName', e.target.value)}
              placeholder="Ex: Mariana Silva"
              className="w-full bg-[#FAF9F6] border border-[#D4C6B3] rounded-xl py-2.5 pl-10 pr-3.5 text-xs text-[#1A1A1A] placeholder-[#767676] focus:outline-hidden focus:ring-1 focus:ring-[#1A1A1A]"
            />
          </div>
        </div>

        {/* E-mail */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
            E-mail para Confirmação *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#767676] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              required
              value={data.email || ''}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="seuemail@exemplo.com"
              className="w-full bg-[#FAF9F6] border border-[#D4C6B3] rounded-xl py-2.5 pl-10 pr-3.5 text-xs text-[#1A1A1A] placeholder-[#767676] focus:outline-hidden focus:ring-1 focus:ring-[#1A1A1A]"
            />
          </div>
        </div>

        {/* Telefone / WhatsApp */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
            Telefone / WhatsApp *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-[#767676] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="tel"
              required
              maxLength={15}
              value={data.phone || ''}
              onChange={(e) => onChange('phone', maskPhone(e.target.value))}
              placeholder="(11) 99999-9999"
              className="w-full bg-[#FAF9F6] border border-[#D4C6B3] rounded-xl py-2.5 pl-10 pr-3.5 text-xs text-[#1A1A1A] placeholder-[#767676] focus:outline-hidden focus:ring-1 focus:ring-[#1A1A1A]"
            />
          </div>
        </div>

        {/* CPF */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
            CPF (para emissão da Nota Fiscal) *
          </label>
          <div className="relative">
            <FileText className="w-4 h-4 text-[#767676] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              required
              maxLength={14}
              value={data.cpf || ''}
              onChange={(e) => onChange('cpf', maskCPF(e.target.value))}
              placeholder="000.000.000-00"
              className="w-full bg-[#FAF9F6] border border-[#D4C6B3] rounded-xl py-2.5 pl-10 pr-3.5 text-xs text-[#1A1A1A] placeholder-[#767676] focus:outline-hidden focus:ring-1 focus:ring-[#1A1A1A]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
