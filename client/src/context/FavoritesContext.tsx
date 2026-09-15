import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../types/product';
import { useToast } from './ToastContext';

interface FavoritesContextData {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
  removeFavorite: (productId: number) => void;
  clearFavorites: () => void;
  totalFavorites: number;
}

const FAVORITES_STORAGE_KEY = '@aura_atelier:favorites_v1';

const FavoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Falha ao carregar favoritos do localStorage', error);
      return [];
    }
  });

  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Falha ao salvar favoritos no localStorage', error);
    }
  }, [favorites]);

  const isFavorite = (productId: number): boolean => {
    return favorites.some((item) => item.id === productId);
  };

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      setFavorites((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`"${product.name}" foi removido dos seus favoritos.`, 'info');
    } else {
      setFavorites((prev) => [...prev, product]);
      showToast(`"${product.name}" adicionado à sua lista de desejos!`, 'success');
    }
  };

  const removeFavorite = (productId: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        removeFavorite,
        clearFavorites,
        totalFavorites: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites(): FavoritesContextData {
  return useContext(FavoritesContext);
}
