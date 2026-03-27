import { NextResponse } from "next/server";
import { initializePaystackPayment } from "@/lib/paystack";

export async function POST(req: Request) {
  const { email, amount } = await req.json();
  if (!email || !amount) return NextResponse.json({ message: "Email and amount required" }, { status: 400 });

  const reference = `txn_${Date.now()}`;
  const data = await initializePaystackPayment({ email, amount: amount * 100, reference }); // Convert to kobo

  if (data.status) {
    return NextResponse.json({ paymentUrl: data.data.authorization_url });
  } else {
    return NextResponse.json({ message: "Payment init failed" }, { status: 500 });
  }
}