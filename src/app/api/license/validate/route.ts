import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { isExpired } from "@/lib/license";

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");

  if (!key)
    return NextResponse.json({ valid: false, reason: "No license key provided." }, { status: 400 });

  const db = await getDb();
  const result = await db.query(
    "SELECT subscription_status, subscription_expires_at, email FROM users WHERE license_key = $1",
    [key]
  );
  const user = result.rows[0];

  if (!user)
    return NextResponse.json({ valid: false, reason: "License key not found." }, { status: 404 });

  if (user.subscription_status === "active" && !isExpired(user.subscription_expires_at)) {
    return NextResponse.json({
      valid: true, status: "active",
      email: user.email, expires_at: user.subscription_expires_at,
    });
  }

  if (user.subscription_status === "trial") {
    return NextResponse.json({
      valid: true, status: "trial",
      email: user.email, expires_at: user.subscription_expires_at,
    });
  }

  const reason = user.subscription_status === "inactive"
    ? "Subscription not activated. Please pay at applywhileyousleep.com."
    : "Subscription expired. Please renew at applywhileyousleep.com.";

  return NextResponse.json({ valid: false, reason, status: user.subscription_status }, { status: 403 });
}
