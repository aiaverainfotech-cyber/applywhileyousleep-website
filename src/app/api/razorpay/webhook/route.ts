import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getDb } from "@/lib/db";
import { addDays } from "@/lib/license";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";

  // Verify webhook authenticity
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  if (expected !== signature)
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });

  const event = JSON.parse(body);
  const db = getDb();

  if (event.event === "subscription.charged") {
    const sub = event.payload.subscription.entity;
    const payment = event.payload.payment.entity;

    db.prepare(`
      UPDATE users
      SET subscription_status = 'active',
          subscription_expires_at = ?,
          razorpay_payment_id = ?
      WHERE razorpay_subscription_id = ?
    `).run(addDays(31), payment.id, sub.id);

    console.log(`[webhook] Activated subscription ${sub.id}`);
  }

  if (event.event === "subscription.halted" || event.event === "subscription.cancelled") {
    const sub = event.payload.subscription.entity;
    db.prepare(`
      UPDATE users SET subscription_status = 'expired' WHERE razorpay_subscription_id = ?
    `).run(sub.id);
    console.log(`[webhook] Expired subscription ${sub.id}`);
  }

  return NextResponse.json({ ok: true });
}
