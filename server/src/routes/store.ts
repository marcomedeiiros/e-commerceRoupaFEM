import { Router, Request, Response, NextFunction } from 'express';
import type { StoreConfig } from '../types/index.js';

const router = Router();

// Configurações públicas da loja (sem cupons e dados sensíveis)
const STORE_CONFIG: StoreConfig = {
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

/**
 * GET /api/store/config
 * Retorna as configurações públicas da loja.
 */
router.get('/config', (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ success: true, data: STORE_CONFIG });
  } catch (err) {
    next(err);
  }
});

export default router;
