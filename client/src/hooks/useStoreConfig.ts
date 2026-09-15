import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { StoreConfig } from '../types/product';

// Fallback local enquanto a API não responde (evita tela em branco)
const FALLBACK: StoreConfig = {
  name: 'Aura Atelier',
  shortName: 'Aura',
  tagline: 'Seu estilo começa pela escolha certa.',
  description:
    'Calças femininas que combinam conforto, corte impecável, qualidade premium e sofisticação atemporal.',
  whatsappNumber: '5511999999999',
  whatsappFormatted: '(11) 99999-9999',
  email: 'contato@auraatelier.com.br',
  address: 'Alameda Lorena, 1420 - Jardins, São Paulo - SP',
  hours: 'Segunda a Sábado, das 09:00 às 19:00',
  freeShippingThreshold: 299.9,
  instagramUrl: 'https://instagram.com',
};

interface UseStoreConfigResult {
  config: StoreConfig;
  loading: boolean;
  error: string | null;
}

export function useStoreConfig(): UseStoreConfigResult {
  const [config, setConfig] = useState<StoreConfig>(FALLBACK);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      setLoading(true);
      try {
        const res = await api.store.config();
        if (!cancelled && res.data) setConfig(res.data);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : 'Erro ao carregar configurações.');
        // Mantém o fallback em caso de erro
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetch();
    return () => { cancelled = true; };
  }, []);

  return { config, loading, error };
}
