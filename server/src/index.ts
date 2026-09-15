import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import './db.js'; // garante que o schema é criado na inicialização

import productsRouter from './routes/products.js';
import categoriesRouter from './routes/categories.js';
import couponsRouter from './routes/coupons.js';
import shippingRouter from './routes/shipping.js';
import ordersRouter from './routes/orders.js';
import storeRouter from './routes/store.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

// ─── Middlewares globais ───────────────────────────────────────────────────────

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:4173',
      'http://127.0.0.1:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Rotas ─────────────────────────────────────────────────────────────────────

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/coupons', couponsRouter);
app.use('/api/shipping', shippingRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/store', storeRouter);

// Rota 404 genérica
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Rota não encontrada.' });
});

// ─── Error Handler ─────────────────────────────────────────────────────────────

app.use(errorHandler);

// ─── Start ─────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n🚀 Aura Atelier API rodando em http://localhost:${PORT}`);
  console.log(`   Ambiente: ${process.env.NODE_ENV ?? 'development'}`);
  console.log(`   Health:   http://localhost:${PORT}/health\n`);
});

export default app;
