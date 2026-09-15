import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Garante que a pasta data/ existe
const dataDir = path.resolve(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = process.env.DB_PATH
  ? path.resolve(__dirname, '../../', process.env.DB_PATH)
  : path.join(dataDir, 'database.sqlite');

const db = new Database(dbPath);

// Habilita WAL mode para melhor performance de escrita concorrente
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ─── Schema ───────────────────────────────────────────────────────────────────

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL,
    slug       TEXT    NOT NULL UNIQUE,
    description TEXT   NOT NULL,
    price      REAL    NOT NULL,
    old_price  REAL,
    images     TEXT    NOT NULL DEFAULT '[]',  -- JSON array
    sizes      TEXT    NOT NULL DEFAULT '[]',  -- JSON array
    colors     TEXT    NOT NULL DEFAULT '[]',  -- JSON array
    category   TEXT    NOT NULL,
    stock      INTEGER NOT NULL DEFAULT 0,
    rating     REAL    NOT NULL DEFAULT 0,
    reviews    INTEGER NOT NULL DEFAULT 0,
    featured   INTEGER NOT NULL DEFAULT 0,     -- 0 | 1
    is_new     INTEGER NOT NULL DEFAULT 0,     -- 0 | 1
    details    TEXT                            -- JSON object ou NULL
  );

  CREATE TABLE IF NOT EXISTS categories (
    id          TEXT    PRIMARY KEY,
    name        TEXT    NOT NULL,
    slug        TEXT    NOT NULL,
    description TEXT    NOT NULL,
    image       TEXT    NOT NULL,
    is_active   INTEGER NOT NULL DEFAULT 1,    -- 0 | 1
    item_count  INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS coupons (
    code             TEXT PRIMARY KEY,
    discount_percent INTEGER NOT NULL,
    description      TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS shipping_options (
    id            TEXT PRIMARY KEY,
    name          TEXT NOT NULL,
    description   TEXT NOT NULL,
    price         REAL NOT NULL,
    delivery_days TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS orders (
    id             TEXT PRIMARY KEY,
    created_at     TEXT NOT NULL,
    customer       TEXT NOT NULL,  -- JSON CustomerData
    subtotal       REAL NOT NULL,
    discount       REAL NOT NULL DEFAULT 0,
    shipping_price REAL NOT NULL DEFAULT 0,
    total          REAL NOT NULL,
    payment_method TEXT NOT NULL,
    coupon_code    TEXT,
    status         TEXT NOT NULL DEFAULT 'pending'
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id      TEXT    NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id    INTEGER NOT NULL,
    product_name  TEXT    NOT NULL,
    product_slug  TEXT    NOT NULL,
    product_image TEXT    NOT NULL,
    selected_size  TEXT   NOT NULL,
    selected_color TEXT   NOT NULL,
    quantity      INTEGER NOT NULL,
    unit_price    REAL    NOT NULL
  );
`);

export default db;
