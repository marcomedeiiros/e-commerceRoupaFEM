// Tipos compartilhados do servidor

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
  oldPrice: number | null;
  images: string[];
  sizes: string[];
  colors: string[];
  category: string;
  stock: number;
  rating: number;
  reviews: number;
  featured: boolean;
  isNew: boolean;
  details: ProductDetails | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
  itemCount: number;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  deliveryDays: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
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

export interface CreateOrderBody {
  customer: CustomerData;
  items: OrderItem[];
  shippingId: string;
  couponCode?: string;
  paymentMethod: 'pix' | 'credit_card' | 'debit_card' | 'whatsapp';
}

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

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
