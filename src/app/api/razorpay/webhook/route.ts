import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getDb } from "@/lib/db";
import { addDays } from "@/lib/license";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  if (expected !== signature)
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });

  const event = JSON.parse(body);
  const db = await getDb();

  if (event.event === "subscription.charged") {
    const sub = event.payload.subscription.entity;
    const payment = event.payload.payment.entity;
    await db.query(
      `UPDATE users SET subscription_status = 'active', subscription_expires_at = $1, razorpay_payment_id = $2
       WHERE razorpay_subscription_id = $3`,
      [addDays(31), payment.id, sub.id]
    );
  }

  if (event.event === "subscription.halted" || event.event === "subscription.cancelled") {
    const sub = event.payload.subscription.entity;
    await db.query(
      "UPDATE users SET subscription_status = 'expired' WHERE razorpay_subscription_id = $1",
      [sub.id]
    );
  }

  return NextResponse.json({ ok: true });
}
