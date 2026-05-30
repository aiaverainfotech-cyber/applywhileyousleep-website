import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET() {
  try {
    const pool = getPool();
    await pool.query("SELECT 1");
    return NextResponse.json({ db: "connected", status: "ok" });
  } catch (err: any) {
    return NextResponse.json({ db: "error", message: err.message }, { status: 500 });
  }
}
