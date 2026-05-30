import { Pool } from "pg";

let _pool: Pool | null = null;

export function getPool(): Pool {
  if (_pool) return _pool;
  _pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  return _pool;
}

export async function getDb() {
  const pool = getPool();
  await migrate(pool);
  return pool;
}

async function migrate(pool: Pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      license_key TEXT UNIQUE NOT NULL,
      subscription_status TEXT NOT NULL DEFAULT 'inactive',
      subscription_expires_at TIMESTAMPTZ,
      razorpay_subscription_id TEXT,
      razorpay_payment_id TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

export type User = {
  id: string;
  email: string;
  password_hash: string;
  license_key: string;
  subscription_status: "inactive" | "trial" | "active" | "expired";
  subscription_expires_at: string | null;
  razorpay_subscription_id: string | null;
  razorpay_payment_id: string | null;
  created_at: string;
};
