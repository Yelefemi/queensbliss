import { NextResponse } from "next/server";
import { initializePaystackPayment } from "@/lib/paystack";

type CheckoutItem = {
  id: number;
  name: string;
  category: string;
  hairType: string;
  image: string;
  price: number;
  quantity: number;
  collection?: string;
};

export async function POST(req: Request) {
  if (!process.env.PAYSTACK_SECRET_KEY) {
    return NextResponse.json(
      { message: "Payments are not configured yet." },
      { status: 503 }
    );
  }

  const { email, amount, customerName, userId, items, shippingAddress, subtotal, shipping, tax } =
    await req.json();
  if (!email || !amount) {
    return NextResponse.json({ message: "Email and amount required" }, { status: 400 });
  }

  const sanitizedItems: CheckoutItem[] = Array.isArray(items)
    ? items.map((item) => ({
        id: Number(item.id),
        name: String(item.name ?? ""),
        category: String(item.category ?? ""),
        hairType: String(item.hairType ?? ""),
        image: String(item.image ?? ""),
        price: Number(item.price ?? 0),
        quantity: Number(item.quantity ?? 0),
        collection: item.collection ? String(item.collection) : undefined,
      }))
    : [];

  const reference = `txn_${Date.now()}`;
  const data = await initializePaystackPayment({
    email,
    amount: amount * 100,
    reference,
    metadata: {
      customerName,
      userId,
      items: sanitizedItems,
      shippingAddress,
      subtotal,
      shipping,
      tax,
      total: amount,
    },
  });

  if (data.status) {
    return NextResponse.json({ paymentUrl: data.data.authorization_url });
  } else {
    return NextResponse.json({ message: "Payment init failed" }, { status: 500 });
  }
}
