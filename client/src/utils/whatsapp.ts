import { STORE_CONFIG } from '../config/store';
import type { CartItem, CustomerData, ShippingOption } from '../types/product';
import { formatCurrency } from './formatCurrency';

interface GenerateWhatsAppMessageProps {
  customer?: Partial<CustomerData>;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping?: ShippingOption | null;
  total: number;
  orderNumber?: string;
}

export function generateWhatsAppOrderMessage({
  customer,
  items,
  subtotal,
  discount,
  shipping,
  total,
  orderNumber = `AUR-${Math.floor(100000 + Math.random() * 900000)}`,
}: GenerateWhatsAppMessageProps): string {
  const customerName = customer?.fullName || 'Cliente Aura Atelier';

  const productLines = items
    .map((item, index) => {
      const itemSubtotal = item.product.price * item.quantity;
      return `${index + 1}. *${item.product.name}*\n   - Tamanho: ${item.selectedSize}\n   - Cor: ${item.selectedColor}\n   - Qtd: ${item.quantity}x (${formatCurrency(item.product.price)})\n   - Subtotal: ${formatCurrency(itemSubtotal)}`;
    })
    .join('\n\n');

  let message = `✨ *NOVO PEDIDO - ${STORE_CONFIG.name.toUpperCase()}* ✨\n`;
  message += `🔖 *Pedido:* #${orderNumber}\n\n`;
  message += `👤 *DADOS DO CLIENTE*\n`;
  message += `• Nome: ${customerName}\n`;
  if (customer?.phone) message += `• Telefone: ${customer.phone}\n`;
  if (customer?.email) message += `• E-mail: ${customer.email}\n`;
  if (customer?.cpf) message += `• CPF: ${customer.cpf}\n`;

  if (customer?.street) {
    message += `\n📍 *ENDEREÇO DE ENTREGA*\n`;
    message += `• ${customer.street}, nº ${customer.number || 'S/N'}${customer.complement ? ` - ${customer.complement}` : ''}\n`;
    message += `• Bairro: ${customer.neighborhood} - ${customer.city}/${customer.state}\n`;
    message += `• CEP: ${customer.cep}\n`;
  }

  message += `\n🛍️ *ITENS DO PEDIDO*\n\n${productLines}\n\n`;
  message += `──────────────\n`;
  message += `💵 *Subtotal:* ${formatCurrency(subtotal)}\n`;
  if (discount > 0) {
    message += `🏷️ *Desconto:* -${formatCurrency(discount)}\n`;
  }
  if (shipping) {
    message += `🚚 *Frete (${shipping.name}):* ${shipping.price === 0 ? 'Grátis' : formatCurrency(shipping.price)} (${shipping.deliveryDays})\n`;
  }
  message += `✨ *TOTAL A PAGAR: ${formatCurrency(total)}*\n`;
  message += `──────────────\n\n`;
  message += `Olá! Gostaria de confirmar e finalizar este pedido com a equipe de atendimento.`;

  return message;
}

export function buildWhatsAppLink(props: GenerateWhatsAppMessageProps): string {
  const message = generateWhatsAppOrderMessage(props);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encoded}`;
}
