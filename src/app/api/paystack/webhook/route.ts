import { NextResponse } from "next/server";
import { verifyPaystackSignature } from "@/lib/paystack";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  if (!verifyPaystackSignature(payload, signature)) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  let event: unknown;

  try {
    event = JSON.parse(payload);
  } catch {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  console.log("Paystack webhook received", event);

  return NextResponse.json({ received: true });
}
