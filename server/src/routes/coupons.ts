import { Router, Request, Response, NextFunction } from 'express';
import db from '../db.js';

const router = Router();

/**
 * POST /api/coupons/validate
 * Body: { code: string }
 * Retorna se o cupom é válido e o percentual de desconto.
 * O código do cupom NUNCA é retornado em texto puro — apenas o resultado da validação.
 */
router.post('/validate', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.body as { code?: string };

    if (!code || typeof code !== 'string') {
      res.status(400).json({
        success: false,
        valid: false,
        message: 'Código do cupom não informado.',
      });
      return;
    }

    const cleanCode = code.trim().toUpperCase();

    const coupon = db
      .prepare('SELECT discount_percent, description FROM coupons WHERE code = ?')
      .get(cleanCode) as { discount_percent: number; description: string } | undefined;

    if (!coupon) {
      res.status(200).json({
        success: true,
        valid: false,
        message: 'Cupom inválido ou expirado.',
      });
      return;
    }

    res.json({
      success: true,
      valid: true,
      discountPercent: coupon.discount_percent,
      description: coupon.description,
      message: `Cupom aplicado: ${coupon.discount_percent}% OFF`,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
