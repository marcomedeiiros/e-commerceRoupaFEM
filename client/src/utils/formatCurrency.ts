/**
 * Formata um valor numérico no formato monetário padrão brasileiro BRL (R$ 0,00)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);
}

/**
 * Calcula o percentual de desconto entre preço antigo e atual
 */
export function calculateDiscount(currentPrice: number, oldPrice?: number): number {
  if (!oldPrice || oldPrice <= currentPrice) return 0;
  return Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
}
