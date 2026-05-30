import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getSession } from "@/lib/auth";

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

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET)
    return NextResponse.json({ error: "Razorpay keys not configured." }, { status: 500 });

  try {
    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: 19900, // ₹199 in paise
      currency: "INR",
      receipt: `order_${session.userId.slice(0, 8)}_${Date.now()}`,
      notes: { user_id: session.userId, email: session.email },
    });

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err: any) {
    console.error("[create-order]", err);
    return NextResponse.json({
      error: err?.error?.description || err?.message || "Failed to create order",
    }, { status: 500 });
  }
}
