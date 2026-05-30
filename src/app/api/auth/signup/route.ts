import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { getDb } from "@/lib/db";
import { signToken, setTokenCookie } from "@/lib/auth";
import { generateLicenseKey } from "@/lib/license";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json({ error: "Email and password required." }, { status: 400 });
    if (password.length < 8)
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });

    const db = getDb();
    const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email.toLowerCase().trim());
    if (existing)
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });

    const id = uuidv4();
    const password_hash = await bcrypt.hash(password, 12);
    const license_key = generateLicenseKey();

    db.prepare(`
      INSERT INTO users (id, email, password_hash, license_key, subscription_status)
      VALUES (?, ?, ?, ?, 'inactive')
    `).run(id, email.toLowerCase().trim(), password_hash, license_key);

    const token = await signToken({ userId: id, email: email.toLowerCase().trim() });
    const res = NextResponse.json({ success: true, license_key }, { status: 201 });
    setTokenCookie(token, res);
    return res;
  } catch (err) {
    console.error("[signup]", err);
    return NextResponse.json({ error: "Signup failed. Please try again." }, { status: 500 });
  }
}
