export interface ProductDetails {
  composition: string;
  care: string[];
  fit: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  images: string[];
  sizes: string[];
  colors: string[];
  category: string;
  stock: number;
  rating: number;
  reviews: number;
  featured?: boolean;
  isNew?: boolean;
  details?: ProductDetails;
}

export interface CartItem {
  id: string; // unique key combining product id, size, and color
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  deliveryDays: string;
}

export interface CustomerData {
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export type PaymentMethod = 'pix' | 'credit_card' | 'debit_card';

/** Item de pedido no formato esperado pelo back-end */
export interface OrderItem {
  productId: number;
  productName: string;
  productSlug: string;
  productImage: string;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  unitPrice: number;
}

/** Payload enviado ao POST /api/orders */
export interface CreateOrderPayload {
  customer: CustomerData;
  items: OrderItem[];
  shippingId: string;
  couponCode?: string;
  paymentMethod: PaymentMethod | 'whatsapp';
}

/** Resposta da API ao criar / buscar um pedido */
export interface Order {
  id: string;
  createdAt: string;
  customer: CustomerData;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingPrice: number;
  total: number;
  paymentMethod: string;
  couponCode: string | null;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
}

/** Configuração pública da loja retornada pelo back-end */
export interface StoreConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  whatsappNumber: string;
  whatsappFormatted: string;
  email: string;
  address: string;
  hours: string;
  freeShippingThreshold: number;
  instagramUrl: string;
}

export interface FilterState {
  search: string;
  category: string;
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
  sortBy: 'recent' | 'price-asc' | 'price-desc' | 'best-sellers' | 'rating';
}
