import { NextResponse } from "next/server";
import { verifyPaystackSignature } from "@/lib/paystack";
import { prisma } from "@/lib/prisma";

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

  const paystackEvent = event as {
    event?: string;
    data?: {
      reference?: string;
      amount?: number;
      customer?: { email?: string };
      metadata?: {
        customerName?: string;
        userId?: string;
        shippingAddress?: unknown;
        subtotal?: number;
        shipping?: number;
        tax?: number;
        total?: number;
        items?: Array<{
          id?: number;
          name?: string;
          category?: string;
          hairType?: string;
          image?: string;
          price?: number;
          quantity?: number;
          collection?: string;
        }>;
      };
    };
  };

  const reference = paystackEvent.data?.reference;

  if (!reference) {
    return NextResponse.json({ message: "Missing payment reference" }, { status: 400 });
  }

  if (paystackEvent.event === "charge.success") {
    const metadata = paystackEvent.data?.metadata;

    await prisma.order.upsert({
      where: { paymentReference: reference },
      update: {
        status: "PAID",
        customerName: metadata?.customerName || paystackEvent.data?.customer?.email || "Customer",
        customerEmail: paystackEvent.data?.customer?.email || "",
        subtotal: Number(metadata?.subtotal ?? 0),
        shipping: Number(metadata?.shipping ?? 0),
        tax: Number(metadata?.tax ?? 0),
        total: Number(metadata?.total ?? Math.round((paystackEvent.data?.amount ?? 0) / 100)),
        shippingAddress: metadata?.shippingAddress ?? undefined,
      },
      create: {
        userId: metadata?.userId || undefined,
        paymentReference: reference,
        status: "PAID",
        customerName: metadata?.customerName || paystackEvent.data?.customer?.email || "Customer",
        customerEmail: paystackEvent.data?.customer?.email || "",
        subtotal: Number(metadata?.subtotal ?? 0),
        shipping: Number(metadata?.shipping ?? 0),
        tax: Number(metadata?.tax ?? 0),
        total: Number(metadata?.total ?? Math.round((paystackEvent.data?.amount ?? 0) / 100)),
        shippingAddress: metadata?.shippingAddress ?? undefined,
        items: {
          create: (metadata?.items || []).map((item) => ({
            productId: Number(item.id ?? 0),
            name: String(item.name ?? ""),
            category: String(item.category ?? ""),
            hairType: String(item.hairType ?? ""),
            image: String(item.image ?? ""),
            price: Number(item.price ?? 0),
            quantity: Number(item.quantity ?? 0),
            collection: item.collection ? String(item.collection) : undefined,
          })),
        },
      },
    });
  }

  if (paystackEvent.event === "charge.failed") {
    await prisma.order.upsert({
      where: { paymentReference: reference },
      update: { status: "FAILED" },
      create: {
        paymentReference: reference,
        status: "FAILED",
        customerName: paystackEvent.data?.metadata?.customerName || "Customer",
        customerEmail: paystackEvent.data?.customer?.email || "",
        subtotal: Number(paystackEvent.data?.metadata?.subtotal ?? 0),
        shipping: Number(paystackEvent.data?.metadata?.shipping ?? 0),
        tax: Number(paystackEvent.data?.metadata?.tax ?? 0),
        total: Number(paystackEvent.data?.metadata?.total ?? 0),
        shippingAddress: paystackEvent.data?.metadata?.shippingAddress ?? undefined,
      },
    });
  }

  return NextResponse.json({ received: true });
}
