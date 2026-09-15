import { Router, Request, Response, NextFunction } from 'express';
import db from '../db.js';
import type { ShippingOption } from '../types/index.js';

const router = Router();

const FREE_SHIPPING_THRESHOLD = 299.9;

function rowToShipping(row: Record<string, unknown>): ShippingOption {
  return {
    id: row.id as string,
    name: row.name as string,
    description: row.description as string,
    price: row.price as number,
    deliveryDays: row.delivery_days as string,
  };
}

/**
 * GET /api/shipping/options
 * Retorna todas as modalidades de frete disponíveis.
 */
router.get('/options', (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rows = db
      .prepare('SELECT * FROM shipping_options ORDER BY price ASC')
      .all() as Record<string, unknown>[];

    res.json({ success: true, data: rows.map(rowToShipping) });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/shipping/calculate
 * Body: { cep: string, subtotal: number }
 * Retorna as opções de frete, com preço = 0 se subtotal >= threshold (frete grátis).
 */
router.post('/calculate', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cep, subtotal } = req.body as { cep?: string; subtotal?: number };

    if (!cep || typeof subtotal !== 'number') {
      res.status(400).json({
        success: false,
        error: 'Informe um CEP e o subtotal do carrinho.',
      });
      return;
    }

    const rows = db
      .prepare('SELECT * FROM shipping_options ORDER BY price ASC')
      .all() as Record<string, unknown>[];

    const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

    const options: ShippingOption[] = rows.map((row) => {
      const option = rowToShipping(row);
      return isFreeShipping ? { ...option, price: 0 } : option;
    });

    res.json({
      success: true,
      data: options,
      isFreeShipping,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
