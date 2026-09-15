import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { CustomerData, PaymentMethod, ShippingOption } from '../types/product';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { STORE_CONFIG } from '../config/store';
import { StepCustomer } from '../components/checkout/StepCustomer';
import { StepShipping } from '../components/checkout/StepShipping';
import { StepPayment } from '../components/checkout/StepPayment';
import { OrderSummaryCard } from '../components/checkout/OrderSummaryCard';
import { buildWhatsAppLink } from '../utils/whatsapp';
import { ArrowLeft, CheckCircle2, MessageSquare, ShieldCheck, Lock, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

export const Checkout: React.FC = () => {
  useDocumentTitle('Finalizar Compra', 'Ambiente de checkout seguro da Aura Atelier.');
  const { items, subtotal, discount, shipping, setShipping, total, appliedCoupon, clearCart } = useCart();
  const { showToast } = useToast();

  const [customer, setCustomer] = useState<Partial<CustomerData>>({
    fullName: '',
    email: '',
    phone: '',
    cpf: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState<{ id: string } | null>(null);

  const isFreeShipping = subtotal >= STORE_CONFIG.freeShippingThreshold;

  const handleCustomerChange = (field: keyof CustomerData, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!customer.fullName?.trim()) {
      showToast('Por favor, informe seu nome completo.', 'error');
      return false;
    }
    if (!customer.email?.includes('@')) {
      showToast('Por favor, informe um e-mail válido.', 'error');
      return false;
    }
    if (!customer.phone || customer.phone.length < 14) {
      showToast('Por favor, informe um número de telefone com DDD.', 'error');
      return false;
    }
    if (!customer.cpf || customer.cpf.length < 14) {
      showToast('Por favor, informe um CPF válido.', 'error');
      return false;
    }
    if (!customer.cep || customer.cep.length < 9) {
      showToast('Por favor, informe um CEP válido.', 'error');
      return false;
    }
    if (!customer.street || !customer.number) {
      showToast('Por favor, preencha o endereço completo com rua e número.', 'error');
      return false;
    }
    return true;
  };

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!shipping) {
      showToast('Selecione uma opção de frete antes de finalizar.', 'error');
      return;
    }

    setIsProcessing(true);

    try {
      // Monta o payload para a API
      const orderItems = items.map((cartItem) => ({
        productId: cartItem.product.id,
        productName: cartItem.product.name,
        productSlug: cartItem.product.slug,
        productImage: cartItem.product.images[0] ?? '',
        selectedSize: cartItem.selectedSize,
        selectedColor: cartItem.selectedColor,
        quantity: cartItem.quantity,
        unitPrice: cartItem.product.price,
      }));

      const res = await api.orders.create({
        customer: customer as import('../types/product').CustomerData,
        items: orderItems,
        shippingId: shipping.id,
        couponCode: appliedCoupon?.code,
        paymentMethod,
      });

      if (res.data) {
        setOrderCompleted({ id: res.data.id });
        clearCart();
        showToast('Pedido realizado com sucesso!', 'success');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao processar pedido.';
      showToast(message, 'error');
    } finally {
      setIsProcessing(false);
    }
  };


  const handleWhatsAppCheckout = () => {
    if (!customer.fullName) {
      showToast('Por favor, preencha pelo menos seu nome e telefone para enviar via WhatsApp.', 'error');
      return;
    }

    const waLink = buildWhatsAppLink({
      customer,
      items,
      subtotal,
      discount,
      shipping,
      total,
    });

    window.open(waLink, '_blank');
  };

  // Se o carrinho estiver vazio e não finalizou o pedido, redireciona
  if (items.length === 0 && !orderCompleted) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="font-serif text-2xl text-[#1A1A1A] mb-3">
          Sua sacola está vazia
        </h2>
        <p className="text-sm text-[#767676] mb-6">
          Adicione calças ao seu carrinho para acessar o checkout.
        </p>
        <Link
          to="/calcas"
          className="px-6 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold rounded-xl inline-block"
        >
          Ir para o Catálogo
        </Link>
      </div>
    );
  }

  // Tela de Sucesso após conclusão
  if (orderCompleted) {
    return (
      <div className="py-16 px-4 max-w-xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-50 rounded-full border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8E6E45]">
            Pedido Confirmado
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-semibold">
            Obrigada pela sua compra!
          </h1>
          <p className="text-sm text-[#767676]">
            Código do Pedido: <strong className="text-[#1A1A1A]">#{orderCompleted.id}</strong>
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E7DFD3] text-left space-y-3 text-xs text-[#555555]">
          <p>
            Enviamos os detalhes do seu pedido para o e-mail: <strong>{customer.email}</strong>.
          </p>
          <p>
            Assim que seu pacote for despachado, você receberá o código de rastreamento por e-mail e SMS.
          </p>
          {paymentMethod === 'pix' && (
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900">
              Caso tenha escolhido PIX, o prazo para compensação do código é de 30 minutos.
            </div>
          )}
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/calcas"
            className="px-8 py-3.5 bg-[#1A1A1A] text-white text-xs uppercase font-bold tracking-widest rounded-xl hover:bg-[#333333] transition-colors"
          >
            Continuar Comprando
          </Link>
          <a
            href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              `Olá! Acabei de realizar o pedido #${orderCompleted.id} na Aura Atelier e gostaria de acompanhar o status.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 bg-emerald-600 text-white text-xs uppercase font-bold tracking-widest rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Falar com Atendimento</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header do Checkout */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E7DFD3]">
          <Link
            to="/carrinho"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] hover:text-[#8E6E45] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para a Sacola</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-[#767676]">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Checkout Seguro SSL 256-bit</span>
          </div>
        </div>

        {/* Formulário Principal (8 cols) + Resumo do Pedido (4 cols) */}
        <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            {/* WhatsApp Checkout Highlight Card */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-wide">Prefere atendimento humanizado?</h4>
                  <p className="text-xs text-emerald-100">
                    Finalize seu pedido diretamente com nossas consultoras pelo WhatsApp.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="px-5 py-2.5 bg-white hover:bg-emerald-50 text-emerald-900 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shrink-0 shadow-md"
              >
                Finalizar no WhatsApp
              </button>
            </div>

            {/* Etapa 1: Dados Pessoais */}
            <StepCustomer data={customer} onChange={handleCustomerChange} />

            {/* Etapa 2: Endereço & Frete */}
            <StepShipping
              data={customer}
              onChange={handleCustomerChange}
              selectedShipping={shipping}
              onSelectShipping={(opt: ShippingOption) => setShipping(opt)}
              isFreeShipping={isFreeShipping}
            />

            {/* Etapa 3: Pagamento */}
            <StepPayment
              method={paymentMethod}
              onSelectMethod={(m: PaymentMethod) => setPaymentMethod(m)}
              total={total}
            />

            {/* Submit Action */}
            <div className="pt-4 space-y-3">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#1A1A1A] hover:bg-[#2E2E2E] disabled:bg-[#767676] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Processando seu pedido...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#C2A278]" />
                    <span>Concluir Pedido ({formatCurrency(total)})</span>
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-[#767676]">
                Ao clicar em Concluir Pedido, você concorda com nossos Termos de Uso e Política de Privacidade.
              </p>
            </div>
          </div>

          {/* Sidebar: Order Summary */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <OrderSummaryCard
              items={items}
              subtotal={subtotal}
              discount={discount}
              shipping={shipping}
              total={total}
              couponCode={appliedCoupon?.code}
            />

            <div className="p-4 rounded-xl bg-white border border-[#E7DFD3] text-xs text-[#555555] space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[#1A1A1A]">
                <ShieldCheck className="w-4 h-4 text-[#8E6E45]" />
                <span>Privacidade & Segurança Garantidas</span>
              </div>
              <p className="text-[11px] text-[#767676]">
                Não armazenamos dados sensíveis de cartões de crédito. Todas as transações são protegidas por protocolos criptografados.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
