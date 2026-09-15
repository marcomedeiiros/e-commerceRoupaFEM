import { Router, Request, Response, NextFunction } from 'express';
import db from '../db.js';
import type { CreateOrderBody, Order, OrderItem } from '../types/index.js';

const router = Router();

const FREE_SHIPPING_THRESHOLD = 299.9;

function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AUR-${timestamp}-${random}`;
}

/**
 * POST /api/orders
 * Cria um novo pedido no banco de dados.
 * Body: CreateOrderBody
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body as CreateOrderBody;

    // ─── Validações básicas ──────────────────────────────────────────────────
    if (!body.customer || !body.items || !Array.isArray(body.items) || body.items.length === 0) {
      res.status(400).json({
        success: false,
        error: 'Dados incompletos. Informe os dados do cliente e os itens do pedido.',
      });
      return;
    }

    const { customer, items, shippingId, couponCode, paymentMethod } = body;

    // Valida campos obrigatórios do cliente
    const requiredFields: (keyof typeof customer)[] = [
      'fullName', 'email', 'phone', 'cpf', 'cep', 'street', 'number', 'neighborhood', 'city', 'state',
    ];
    for (const field of requiredFields) {
      if (!customer[field]?.trim()) {
        res.status(400).json({
          success: false,
          error: `Campo obrigatório não preenchido: ${field}`,
        });
        return;
      }
    }

    // ─── Valida e busca opção de frete ────────────────────────────────────────
    const shippingRow = db
      .prepare('SELECT * FROM shipping_options WHERE id = ?')
      .get(shippingId) as Record<string, unknown> | undefined;

    if (!shippingRow) {
      res.status(400).json({ success: false, error: 'Opção de frete inválida.' });
      return;
    }

    // ─── Valida e busca cada produto (verifica estoque) ──────────────────────
    const validatedItems: (OrderItem & { stock: number })[] = [];
    let subtotal = 0;

    for (const item of items) {
      if (!item.productId || item.quantity <= 0) {
        res.status(400).json({ success: false, error: 'Item de pedido inválido.' });
        return;
      }

      const productRow = db
        .prepare('SELECT id, name, slug, images, price, stock FROM products WHERE id = ?')
        .get(item.productId) as Record<string, unknown> | undefined;

      if (!productRow) {
        res.status(400).json({
          success: false,
          error: `Produto não encontrado: ID ${item.productId}`,
        });
        return;
      }

      const currentStock = productRow.stock as number;
      if (currentStock < item.quantity) {
        res.status(400).json({
          success: false,
          error: `Estoque insuficiente para o produto: ${productRow.name}`,
        });
        return;
      }

      const images = JSON.parse((productRow.images as string) || '[]') as string[];
      const unitPrice = productRow.price as number;
      subtotal += unitPrice * item.quantity;

      validatedItems.push({
        productId: item.productId,
        productName: productRow.name as string,
        productSlug: productRow.slug as string,
        productImage: images[0] ?? '',
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        quantity: item.quantity,
        unitPrice,
        stock: currentStock,
      });
    }

    // ─── Valida cupom (opcional) ──────────────────────────────────────────────
    let discount = 0;
    let appliedCouponCode: string | null = null;

    if (couponCode) {
      const cleanCode = couponCode.trim().toUpperCase();
      const coupon = db
        .prepare('SELECT discount_percent FROM coupons WHERE code = ?')
        .get(cleanCode) as { discount_percent: number } | undefined;

      if (coupon) {
        discount = (subtotal * coupon.discount_percent) / 100;
        appliedCouponCode = cleanCode;
      }
    }

    // ─── Calcula frete ────────────────────────────────────────────────────────
    const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
    const shippingPrice = isFreeShipping ? 0 : (shippingRow.price as number);

    const total = Math.max(0, subtotal - discount + shippingPrice);
    const orderId = generateOrderId();
    const createdAt = new Date().toISOString();

    // ─── Persiste no banco (transação) ────────────────────────────────────────
    const insertOrder = db.prepare(`
      INSERT INTO orders (id, created_at, customer, subtotal, discount, shipping_price, total, payment_method, coupon_code, status)
      VALUES (@id, @createdAt, @customer, @subtotal, @discount, @shippingPrice, @total, @paymentMethod, @couponCode, 'pending')
    `);

    const insertItem = db.prepare(`
      INSERT INTO order_items (order_id, product_id, product_name, product_slug, product_image, selected_size, selected_color, quantity, unit_price)
      VALUES (@orderId, @productId, @productName, @productSlug, @productImage, @selectedSize, @selectedColor, @quantity, @unitPrice)
    `);

    const decrementStock = db.prepare(`
      UPDATE products SET stock = stock - @quantity WHERE id = @productId
    `);

    const createOrderTransaction = db.transaction(() => {
      insertOrder.run({
        id: orderId,
        createdAt,
        customer: JSON.stringify(customer),
        subtotal,
        discount,
        shippingPrice,
        total,
        paymentMethod: paymentMethod ?? 'pix',
        couponCode: appliedCouponCode,
      });

      for (const item of validatedItems) {
        insertItem.run({
          orderId,
          productId: item.productId,
          productName: item.productName,
          productSlug: item.productSlug,
          productImage: item.productImage,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        });

        decrementStock.run({ quantity: item.quantity, productId: item.productId });
      }
    });

    createOrderTransaction();

    // ─── Resposta ─────────────────────────────────────────────────────────────
    const order: Order = {
      id: orderId,
      createdAt,
      customer,
      items: validatedItems,
      subtotal,
      discount,
      shippingPrice,
      total,
      paymentMethod: paymentMethod ?? 'pix',
      couponCode: appliedCouponCode,
      status: 'pending',
    };

    console.log(`📦 Novo pedido criado: ${orderId} (R$ ${total.toFixed(2)})`);

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/orders/:id
 * Consulta um pedido pelo seu ID.
 */
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const orderRow = db.prepare('SELECT * FROM orders WHERE id = ?').get(id) as
      | Record<string, unknown>
      | undefined;

    if (!orderRow) {
      res.status(404).json({ success: false, error: 'Pedido não encontrado.' });
      return;
    }

    const itemRows = db
      .prepare('SELECT * FROM order_items WHERE order_id = ?')
      .all(id) as Record<string, unknown>[];

    const order: Order = {
      id: orderRow.id as string,
      createdAt: orderRow.created_at as string,
      customer: JSON.parse(orderRow.customer as string),
      items: itemRows.map((r) => ({
        productId: r.product_id as number,
        productName: r.product_name as string,
        productSlug: r.product_slug as string,
        productImage: r.product_image as string,
        selectedSize: r.selected_size as string,
        selectedColor: r.selected_color as string,
        quantity: r.quantity as number,
        unitPrice: r.unit_price as number,
      })),
      subtotal: orderRow.subtotal as number,
      discount: orderRow.discount as number,
      shippingPrice: orderRow.shipping_price as number,
      total: orderRow.total as number,
      paymentMethod: orderRow.payment_method as string,
      couponCode: orderRow.coupon_code as string | null,
      status: orderRow.status as Order['status'],
    };

    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
});

export default router;
