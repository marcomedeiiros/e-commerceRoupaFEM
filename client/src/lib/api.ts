/**
 * lib/api.ts
 * Wrapper centralizado para todas as chamadas à API do back-end.
 * Usa a variável de ambiente VITE_API_URL (configurada no .env do client)
 * ou cai para /api (via proxy do Vite em desenvolvimento).
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  total?: number;
  valid?: boolean;
  discountPercent?: number;
  isFreeShipping?: boolean;
  freeShippingThreshold?: number;
}

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${path}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  const json = (await res.json()) as ApiResponse<T>;

  if (!res.ok || !json.success) {
    throw new ApiError(
      json.error ?? `Erro na requisição: ${res.status}`,
      res.status
    );
  }

  return json;
}

// ─── Produtos ─────────────────────────────────────────────────────────────────

export interface ProductFilters {
  search?: string;
  category?: string;
  sizes?: string[];
  colors?: string[];
  priceMax?: number;
  inStock?: boolean;
  sortBy?: 'recent' | 'price-asc' | 'price-desc' | 'best-sellers' | 'rating';
  featured?: boolean;
  isNew?: boolean;
  limit?: number;
}

function buildProductQuery(filters: ProductFilters): string {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.category && filters.category !== 'all') params.set('category', filters.category);
  if (filters.sizes?.length) params.set('sizes', filters.sizes.join(','));
  if (filters.colors?.length) params.set('colors', filters.colors.join(','));
  if (filters.priceMax !== undefined) params.set('priceMax', String(filters.priceMax));
  if (filters.inStock) params.set('inStock', 'true');
  if (filters.sortBy) params.set('sortBy', filters.sortBy);
  if (filters.featured) params.set('featured', 'true');
  if (filters.isNew) params.set('isNew', 'true');
  if (filters.limit) params.set('limit', String(filters.limit));
  const q = params.toString();
  return q ? `?${q}` : '';
}

export const api = {
  products: {
    list: (filters: ProductFilters = {}) =>
      request<import('../types/product').Product[]>(`/products${buildProductQuery(filters)}`),
    getBySlug: (slug: string) =>
      request<import('../types/product').Product>(`/products/${slug}`),
  },

  categories: {
    list: (activeOnly = false) =>
      request<import('../data/categories').Category[]>(
        `/categories${activeOnly ? '?activeOnly=true' : ''}`
      ),
  },

  coupons: {
    validate: (code: string) =>
      request<null>('/coupons/validate', {
        method: 'POST',
        body: JSON.stringify({ code }),
      }),
  },

  shipping: {
    options: () =>
      request<import('../types/product').ShippingOption[]>('/shipping/options'),
    calculate: (cep: string, subtotal: number) =>
      request<import('../types/product').ShippingOption[]>('/shipping/calculate', {
        method: 'POST',
        body: JSON.stringify({ cep, subtotal }),
      }),
  },

  orders: {
    create: (body: import('../types/product').CreateOrderPayload) =>
      request<import('../types/product').Order>('/orders', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    get: (id: string) =>
      request<import('../types/product').Order>(`/orders/${id}`),
  },

  store: {
    config: () =>
      request<import('../types/product').StoreConfig>('/store/config'),
  },
};
