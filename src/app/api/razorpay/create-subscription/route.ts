import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getSession } from "@/lib/auth";
import { getDb } from "@/lib/db";

function getRazorpay() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });
}

export async function POST() {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const db = getDb();
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(session.userId) as any;
  if (!user)
    return NextResponse.json({ error: "User not found." }, { status: 404 });

  // If already active, return existing subscription
  if (user.subscription_status === "active" && user.razorpay_subscription_id) {
    return NextResponse.json({ subscription_id: user.razorpay_subscription_id });
  }

  const razorpay = getRazorpay();
  const subscription = await (razorpay.subscriptions as any).create({
    plan_id: process.env.RAZORPAY_PLAN_ID!,
    total_count: 12,
    quantity: 1,
    customer_notify: 1,
    notes: { user_id: user.id, email: user.email },
  });

  db.prepare("UPDATE users SET razorpay_subscription_id = ? WHERE id = ?")
    .run(subscription.id, user.id);

  return NextResponse.json({
    subscription_id: subscription.id,
    key_id: process.env.RAZORPAY_KEY_ID,
  });
}
