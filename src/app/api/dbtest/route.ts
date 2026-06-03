import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET() {
  try {
    const pool = getPool();
    // Test basic connection
    await pool.query("SELECT 1");
    // Test if users table exists
    const tableCheck = await pool.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users')"
    );
    const tableExists = tableCheck.rows[0].exists;
    // If table doesn't exist, create it
    if (!tableExists) {
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
        )
      `);
      return NextResponse.json({ db: "connected", table: "created", message: "Users table was missing — now created!" });
    }
    const countResult = await pool.query("SELECT COUNT(*) FROM users");
    return NextResponse.json({ db: "connected", table: "exists", user_count: countResult.rows[0].count });
  } catch (err: any) {
    return NextResponse.json({ db: "error", message: err.message }, { status: 500 });
  }
}
