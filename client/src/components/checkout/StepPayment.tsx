import React, { useState } from 'react';
import type { PaymentMethod } from '../../types/product';
import { QrCode, CreditCard, Copy, Check, Lock, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { useToast } from '../../context/ToastContext';

interface StepPaymentProps {
  method: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
  total: number;
}

export const StepPayment: React.FC<StepPaymentProps> = ({
  method,
  onSelectMethod,
  total,
}) => {
  const { showToast } = useToast();
  const [copiedPix, setCopiedPix] = useState(false);

  // Estados fictícios para o Cartão de Crédito
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [installments, setInstallments] = useState('1');

  const pixMockCode = "00020126580014br.gov.bcb.pix0136aura-atelier-pagamentos-mock-uuid-20265204000053039865802BR5925AURA ATELIER MODA FEMININA6009SAO PAULO62070503***6304E8A2";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixMockCode);
    setCopiedPix(true);
    showToast('Código Pix copiado para a área de transferência!', 'success');
    setTimeout(() => setCopiedPix(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E7DFD3] p-6 space-y-6 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-[#E7DFD3]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-bold">
            3
          </div>
          <h3 className="font-serif text-lg font-semibold text-[#1A1A1A]">
            Forma de Pagamento
          </h3>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-[#767676]">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Ambiente Seguro</span>
        </div>
      </div>

      {/* Tabs / Payment Selectors */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => onSelectMethod('pix')}
          className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
            method === 'pix'
              ? 'bg-[#FAF9F6] border-[#1A1A1A] text-[#1A1A1A] shadow-xs'
              : 'bg-white border-[#E7DFD3] text-[#767676] hover:border-[#D4C6B3]'
          }`}
        >
          <QrCode className="w-5 h-5 text-[#8E6E45]" />
          <span>PIX</span>
          <span className="text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
            Aprovação Imediata
          </span>
        </button>

        <button
          type="button"
          onClick={() => onSelectMethod('credit_card')}
          className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
            method === 'credit_card'
              ? 'bg-[#FAF9F6] border-[#1A1A1A] text-[#1A1A1A] shadow-xs'
              : 'bg-white border-[#E7DFD3] text-[#767676] hover:border-[#D4C6B3]'
          }`}
        >
          <CreditCard className="w-5 h-5 text-[#1A1A1A]" />
          <span>Cartão de Crédito</span>
          <span className="text-[9px] text-[#767676]">Até 6x sem juros</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectMethod('debit_card')}
          className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
            method === 'debit_card'
              ? 'bg-[#FAF9F6] border-[#1A1A1A] text-[#1A1A1A] shadow-xs'
              : 'bg-white border-[#E7DFD3] text-[#767676] hover:border-[#D4C6B3]'
          }`}
        >
          <CreditCard className="w-5 h-5 text-[#767676]" />
          <span>Cartão de Débito</span>
          <span className="text-[9px] text-[#767676]">À vista</span>
        </button>
      </div>

      {/* PIX Content */}
      {method === 'pix' && (
        <div className="bg-[#FAF9F6] p-6 rounded-xl border border-[#E7DFD3] space-y-4 text-center">
          <div className="max-w-xs mx-auto space-y-3">
            <div className="bg-white p-4 rounded-xl border border-[#D4C6B3] inline-block shadow-xs">
              {/* QR Code Mock SVG */}
              <svg
                viewBox="0 0 160 160"
                className="w-36 h-36 mx-auto text-[#1A1A1A]"
                fill="currentColor"
              >
                <rect x="0" y="0" width="40" height="40" rx="4" />
                <rect x="6" y="6" width="28" height="28" fill="white" rx="2" />
                <rect x="12" y="12" width="16" height="16" rx="2" />

                <rect x="120" y="0" width="40" height="40" rx="4" />
                <rect x="126" y="6" width="28" height="28" fill="white" rx="2" />
                <rect x="132" y="12" width="16" height="16" rx="2" />

                <rect x="0" y="120" width="40" height="40" rx="4" />
                <rect x="6" y="126" width="28" height="28" fill="white" rx="2" />
                <rect x="12" y="132" width="16" height="16" rx="2" />

                <rect x="52" y="10" width="20" height="15" />
                <rect x="80" y="15" width="25" height="10" />
                <rect x="55" y="45" width="50" height="15" />
                <rect x="45" y="70" width="25" height="25" />
                <rect x="80" y="75" width="30" height="15" />
                <rect x="120" y="60" width="30" height="25" />
                <rect x="50" y="110" width="20" height="35" />
                <rect x="85" y="115" width="40" height="20" />
                <rect x="135" y="110" width="15" height="40" />
              </svg>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#1A1A1A]">
                Total: <strong className="text-sm">{formatCurrency(total)}</strong>
              </p>
              <p className="text-[11px] text-[#767676] mt-0.5">
                Escaneie o código com o aplicativo do seu banco ou use a chave abaixo.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-white border border-[#D4C6B3] rounded-lg p-2 text-left">
              <input
                type="text"
                readOnly
                value={pixMockCode}
                className="text-[10px] text-[#767676] font-mono bg-transparent w-full focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleCopyPix}
                className="px-2.5 py-1 bg-[#1A1A1A] text-white text-[10px] font-semibold uppercase rounded hover:bg-[#333333] transition-colors shrink-0 flex items-center gap-1"
              >
                {copiedPix ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPix ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Credit Card Content */}
      {method === 'credit_card' && (
        <div className="space-y-4">
          {/* Card Preview */}
          <div className="bg-gradient-to-tr from-[#1A1A1A] to-[#3A3A3A] text-white p-5 rounded-xl shadow-lg max-w-sm mx-auto space-y-4">
            <div className="flex justify-between items-center text-xs tracking-widest uppercase text-stone-300">
              <span>Aura Atelier VIP</span>
              <CreditCard className="w-5 h-5 text-[#C2A278]" />
            </div>
            <p className="font-mono text-base tracking-widest pt-2">
              {cardNumber || '•••• •••• •••• ••••'}
            </p>
            <div className="flex justify-between text-[10px] uppercase text-stone-300 tracking-wider">
              <div>
                <span className="block text-[8px] text-stone-400">Titular</span>
                <span className="font-medium truncate max-w-[150px] inline-block">
                  {cardName || 'NOME DO TITULAR'}
                </span>
              </div>
              <div>
                <span className="block text-[8px] text-stone-400">Validade</span>
                <span className="font-medium">{cardExpiry || 'MM/AA'}</span>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                Número do Cartão
              </label>
              <input
                type="text"
                maxLength={19}
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(
                    e.target.value
                      .replace(/\D/g, '')
                      .replace(/(\d{4})(?=\d)/g, '$1 ')
                  )
                }
                placeholder="0000 0000 0000 0000"
                className="w-full bg-[#FAF9F6] border border-[#D4C6B3] rounded-xl py-2 px-3 text-xs text-[#1A1A1A] focus:outline-hidden focus:ring-1 focus:ring-[#1A1A1A]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                Nome Impresso no Cartão
              </label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                placeholder="COMO CONSTA NO CARTÃO"
                className="w-full bg-[#FAF9F6] border border-[#D4C6B3] rounded-xl py-2 px-3 text-xs uppercase text-[#1A1A1A] focus:outline-hidden focus:ring-1 focus:ring-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                Validade (MM/AA)
              </label>
              <input
                type="text"
                maxLength={5}
                value={cardExpiry}
                onChange={(e) =>
                  setCardExpiry(
                    e.target.value
                      .replace(/\D/g, '')
                      .replace(/(\d{2})(\d)/, '$1/$2')
                  )
                }
                placeholder="12/28"
                className="w-full bg-[#FAF9F6] border border-[#D4C6B3] rounded-xl py-2 px-3 text-xs text-[#1A1A1A] focus:outline-hidden focus:ring-1 focus:ring-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                Código CVV
              </label>
              <input
                type="text"
                maxLength={4}
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                placeholder="123"
                className="w-full bg-[#FAF9F6] border border-[#D4C6B3] rounded-xl py-2 px-3 text-xs text-[#1A1A1A] focus:outline-hidden focus:ring-1 focus:ring-[#1A1A1A]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                Parcelas
              </label>
              <select
                value={installments}
                onChange={(e) => setInstallments(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#D4C6B3] rounded-xl py-2 px-3 text-xs text-[#1A1A1A] focus:outline-hidden focus:ring-1 focus:ring-[#1A1A1A]"
              >
                <option value="1">1x de {formatCurrency(total)} sem juros</option>
                <option value="2">2x de {formatCurrency(total / 2)} sem juros</option>
                <option value="3">3x de {formatCurrency(total / 3)} sem juros</option>
                <option value="4">4x de {formatCurrency(total / 4)} sem juros</option>
                <option value="5">5x de {formatCurrency(total / 5)} sem juros</option>
                <option value="6">6x de {formatCurrency(total / 6)} sem juros</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Debit Card Content */}
      {method === 'debit_card' && (
        <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E7DFD3] text-xs text-[#555555] space-y-2">
          <p className="font-semibold text-[#1A1A1A]">Cartão de Débito Online</p>
          <p>
            Você será autenticada em ambiente bancário seguro após confirmar o pedido. O débito é realizado instantaneamente em sua conta corrente.
          </p>
        </div>
      )}

      {/* Gateway Architecture Notice (Prepared for Mercado Pago / Stripe) */}
      <div className="p-3 bg-stone-100 rounded-xl border border-stone-200 flex items-start gap-2.5 text-[11px] text-[#555555]">
        <AlertCircle className="w-4 h-4 text-[#8E6E45] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-[#1A1A1A] block">Ambiente em Modo de Demonstração</span>
          <span>
            Esta interface está totalmente preparada e modularizada para plugar gateways de pagamento (Mercado Pago, Stripe ou Pagar.me) sem alterar a experiência de compra da cliente.
          </span>
        </div>
      </div>
    </div>
  );
};
