import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const db = getDb();
  const user = db.prepare(
    "SELECT id, email, license_key, subscription_status, subscription_expires_at, created_at FROM users WHERE id = ?"
  ).get(session.userId) as any;

  if (!user)
    return NextResponse.json({ error: "User not found." }, { status: 404 });

  return NextResponse.json(user);
}
