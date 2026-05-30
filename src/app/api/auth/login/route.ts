import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { signToken, setTokenCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json({ error: "Email and password required." }, { status: 400 });

    const db = getDb();
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email.toLowerCase().trim()) as any;

    if (!user)
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid)
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });

    const token = await signToken({ userId: user.id, email: user.email });
    const res = NextResponse.json({ success: true });
    setTokenCookie(token, res);
    return res;
  } catch (err) {
    console.error("[login]", err);
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 });
  }
}
