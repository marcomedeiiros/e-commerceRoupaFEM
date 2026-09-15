import { Router, Request, Response, NextFunction } from 'express';
import db from '../db.js';
import type { Product } from '../types/index.js';

const router = Router();

// ─── Helper: converte row do banco para o tipo Product ────────────────────────
function rowToProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as number,
    name: row.name as string,
    slug: row.slug as string,
    description: row.description as string,
    price: row.price as number,
    oldPrice: row.old_price as number | null,
    images: JSON.parse((row.images as string) || '[]') as string[],
    sizes: JSON.parse((row.sizes as string) || '[]') as string[],
    colors: JSON.parse((row.colors as string) || '[]') as string[],
    category: row.category as string,
    stock: row.stock as number,
    rating: row.rating as number,
    reviews: row.reviews as number,
    featured: Boolean(row.featured),
    isNew: Boolean(row.is_new),
    details: row.details ? JSON.parse(row.details as string) : null,
  };
}

/**
 * GET /api/products
 * Query params opcionais:
 *   search     texto livre (name, description, category)
 *   category   filtra por categoria exata
 *   sizes      lista separada por vírgula e.g. "36,38"
 *   colors     lista separada por vírgula e.g. "Preto,Bege"
 *   priceMax   preço máximo (número)
 *   inStock    "true" filtra apenas com stock > 0
 *   sortBy     "recent" | "price-asc" | "price-desc" | "best-sellers" | "rating"
 *   featured   "true" retorna apenas produtos em destaque
 *   isNew      "true" retorna apenas lançamentos
 *   limit      limita quantidade de resultados
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      search,
      category,
      sizes,
      colors,
      priceMax,
      inStock,
      sortBy,
      featured,
      isNew,
      limit,
    } = req.query as Record<string, string | undefined>;

    let sql = 'SELECT * FROM products WHERE 1=1';
    const params: (string | number)[] = [];

    // Busca textual
    if (search?.trim()) {
      sql += ' AND (LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(category) LIKE ?)';
      const q = `%${search.trim().toLowerCase()}%`;
      params.push(q, q, q);
    }

    // Filtro de categoria
    if (category && category !== 'all') {
      sql += ' AND category = ?';
      params.push(category);
    }

    // Filtro de tamanhos verifica se o JSON da coluna contém o tamanho
    if (sizes) {
      const sizeList = sizes.split(',').map((s) => s.trim()).filter(Boolean);
      if (sizeList.length > 0) {
        const sizeClauses = sizeList.map(() => `sizes LIKE ?`).join(' OR ');
        sql += ` AND (${sizeClauses})`;
        sizeList.forEach((s) => params.push(`%"${s}"%`));
      }
    }

    // Filtro de cores
    if (colors) {
      const colorList = colors.split(',').map((c) => c.trim()).filter(Boolean);
      if (colorList.length > 0) {
        const colorClauses = colorList.map(() => `colors LIKE ?`).join(' OR ');
        sql += ` AND (${colorClauses})`;
        colorList.forEach((c) => params.push(`%"${c}"%`));
      }
    }

    // Preço máximo
    if (priceMax) {
      const max = parseFloat(priceMax);
      if (!isNaN(max)) {
        sql += ' AND price <= ?';
        params.push(max);
      }
    }

    // Apenas em estoque
    if (inStock === 'true') {
      sql += ' AND stock > 0';
    }

    // Apenas em destaque
    if (featured === 'true') {
      sql += ' AND featured = 1';
    }

    // Apenas lançamentos
    if (isNew === 'true') {
      sql += ' AND is_new = 1';
    }

    // Ordenação
    switch (sortBy) {
      case 'price-asc':
        sql += ' ORDER BY price ASC';
        break;
      case 'price-desc':
        sql += ' ORDER BY price DESC';
        break;
      case 'best-sellers':
        sql += ' ORDER BY reviews DESC';
        break;
      case 'rating':
        sql += ' ORDER BY rating DESC';
        break;
      case 'recent':
      default:
        sql += ' ORDER BY is_new DESC, id DESC';
        break;
    }

    // Limite opcional
    if (limit) {
      const lim = parseInt(limit, 10);
      if (!isNaN(lim) && lim > 0) {
        sql += ' LIMIT ?';
        params.push(lim);
      }
    }

    const rows = db.prepare(sql).all(...params) as Record<string, unknown>[];
    const products = rows.map(rowToProduct);

    res.json({ success: true, data: products, total: products.length });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/products/:slug
 * Retorna um produto pelo seu slug único.
 */
router.get('/:slug', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const row = db.prepare('SELECT * FROM products WHERE slug = ?').get(slug) as
      | Record<string, unknown>
      | undefined;

    if (!row) {
      res.status(404).json({ success: false, error: 'Produto não encontrado.' });
      return;
    }

    res.json({ success: true, data: rowToProduct(row) });
  } catch (err) {
    next(err);
  }
});

export default router;
