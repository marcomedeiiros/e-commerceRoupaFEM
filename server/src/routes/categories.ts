import { Router, Request, Response, NextFunction } from 'express';
import db from '../db.js';
import type { Category } from '../types/index.js';

const router = Router();

function rowToCategory(row: Record<string, unknown>): Category {
  return {
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    description: row.description as string,
    image: row.image as string,
    isActive: Boolean(row.is_active),
    itemCount: row.item_count as number,
  };
}

/**
 * GET /api/categories
 * Query params opcionais:
 *   activeOnly — "true" retorna apenas categorias ativas
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { activeOnly } = req.query as { activeOnly?: string };

    let sql = 'SELECT * FROM categories ORDER BY is_active DESC, name ASC';
    if (activeOnly === 'true') {
      sql = 'SELECT * FROM categories WHERE is_active = 1 ORDER BY name ASC';
    }

    const rows = db.prepare(sql).all() as Record<string, unknown>[];
    const categories = rows.map(rowToCategory);

    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
});

export default router;
