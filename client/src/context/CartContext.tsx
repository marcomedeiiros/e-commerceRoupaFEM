import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { CartItem, Product, ShippingOption } from '../types/product';
import { api } from '../lib/api';
import { useToast } from './ToastContext';

interface AppliedCoupon {
  code: string;
  discountPercent: number;
}

interface CartContextData {
  items: CartItem[];
  addToCart: (product: Product, selectedSize: string, selectedColor: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  shipping: ShippingOption | null;
  setShipping: (option: ShippingOption | null) => void;
  appliedCoupon: AppliedCoupon | null;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  total: number;
  freeShippingThreshold: number;
}

const CART_STORAGE_KEY = '@aura_atelier:cart_v1';
const COUPON_STORAGE_KEY = '@aura_atelier:coupon_v1';

/** Threshold de frete grátis — valor vem da API mas temos um fallback local */
const DEFAULT_FREE_SHIPPING_THRESHOLD = 299.9;

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Falha ao carregar carrinho do localStorage', error);
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(() => {
    try {
      const saved = localStorage.getItem(COUPON_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [shipping, setShipping] = useState<ShippingOption | null>(null);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(DEFAULT_FREE_SHIPPING_THRESHOLD);

  const { showToast } = useToast();

  // Busca configurações da loja (threshold de frete grátis) na API
  useEffect(() => {
    api.store.config()
      .then((res) => {
        if (res.data?.freeShippingThreshold) {
          setFreeShippingThreshold(res.data.freeShippingThreshold);
        }
      })
      .catch(() => {
        // Mantém o valor padrão em caso de erro
      });
  }, []);

  // Persiste carrinho no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Falha ao salvar carrinho no localStorage', error);
    }
  }, [items]);

  // Persiste cupom no localStorage
  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Falha ao salvar cupom no localStorage', error);
    }
  }, [appliedCoupon]);

  const addToCart = useCallback((
    product: Product,
    selectedSize: string,
    selectedColor: string,
    quantity: number = 1
  ) => {
    const itemId = `${product.id}-${selectedSize}-${selectedColor}`;

    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === itemId);

      if (existingItemIndex > -1) {
        const updated = [...prevItems];
        updated[existingItemIndex] = {
          ...updated[existingItemIndex],
          quantity: updated[existingItemIndex].quantity + quantity,
        };
        return updated;
      }

      return [
        ...prevItems,
        {
          id: itemId,
          product,
          selectedSize,
          selectedColor,
          quantity,
        },
      ];
    });

    showToast(`"${product.name}" (${selectedSize} / ${selectedColor}) adicionado ao carrinho!`, 'success');
  }, [showToast]);

  const removeFromCart = useCallback((itemId: string) => {
    const itemToRemove = items.find((i) => i.id === itemId);
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    if (itemToRemove) {
      showToast('Item removido do carrinho.', 'info');
    }
  }, [items, showToast]);

  const updateQuantity = useCallback((itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  /**
   * Valida o cupom via API (servidor).
   * O código nunca é exposto no bundle do cliente.
   */
  const applyCoupon = useCallback(async (code: string): Promise<{ success: boolean; message: string }> => {
    if (!code.trim()) {
      return { success: false, message: 'Informe um código de cupom.' };
    }

    try {
      const res = await api.coupons.validate(code);

      // A resposta tem `valid` mesmo dentro de success:true
      const json = res as unknown as {
        valid: boolean;
        discountPercent?: number;
        message?: string;
      };

      if (!json.valid || !json.discountPercent) {
        return { success: false, message: json.message ?? 'Cupom inválido ou expirado.' };
      }

      setAppliedCoupon({
        code: code.trim().toUpperCase(),
        discountPercent: json.discountPercent,
      });

      showToast(`Cupom aplicado! (${json.discountPercent}% OFF)`, 'success');
      return { success: true, message: json.message ?? `Cupom aplicado: ${json.discountPercent}% OFF` };
    } catch {
      return { success: false, message: 'Cupom inválido ou expirado.' };
    }
  }, [showToast]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    showToast('Cupom removido.', 'info');
  }, [showToast]);

  const isFreeShipping = useMemo(() => {
    const sub = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    return sub >= freeShippingThreshold;
  }, [items, freeShippingThreshold]);

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [items]);

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    return (subtotal * appliedCoupon.discountPercent) / 100;
  }, [subtotal, appliedCoupon]);

  const total = useMemo(() => {
    const shippingPrice = isFreeShipping ? 0 : (shipping?.price || 0);
    const finalTotal = subtotal - discount + shippingPrice;
    return Math.max(0, finalTotal);
  }, [subtotal, discount, shipping, isFreeShipping]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        shipping: isFreeShipping && shipping ? { ...shipping, price: 0 } : shipping,
        setShipping,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        total,
        freeShippingThreshold,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextData {
  return useContext(CartContext);
}
