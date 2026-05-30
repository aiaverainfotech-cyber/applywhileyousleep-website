import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getSession } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { addDays } from "@/lib/license";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

  // Verify payment signature
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  if (expected !== razorpay_signature)
    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });

  // Activate subscription for 30 days
  const db = await getDb();
  await db.query(
    `UPDATE users SET subscription_status = 'active', subscription_expires_at = $1, razorpay_payment_id = $2
     WHERE id = $3`,
    [addDays(30), razorpay_payment_id, session.userId]
  );

  return NextResponse.json({ success: true, message: "Payment verified. Subscription activated!" });
}
