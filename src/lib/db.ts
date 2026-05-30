import { DatabaseSync } from "node:sqlite";
import path from "path";
import fs from "fs";

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "awys.db");

let _db: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (_db) return _db;
  fs.mkdirSync(DB_DIR, { recursive: true });
  _db = new DatabaseSync(DB_PATH);
  migrate(_db);
  return _db;
}

function migrate(db: DatabaseSync) {
  db.exec(`
    PRAGMA journal_mode=WAL;
    PRAGMA foreign_keys=ON;

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      license_key TEXT UNIQUE NOT NULL,
      subscription_status TEXT NOT NULL DEFAULT 'inactive',
      subscription_expires_at TEXT,
      razorpay_subscription_id TEXT,
      razorpay_payment_id TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
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
