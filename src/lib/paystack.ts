import crypto from "crypto";

export async function initializePaystackPayment({
  email,
  amount,
  reference,
  metadata,
}: {
  email: string;
  amount: number; // in kobo
  reference: string;
  metadata?: Record<string, unknown>;
}) {
  if (!process.env.PAYSTACK_SECRET_KEY) {
    return {
      status: false,
      message: "Paystack is not configured yet.",
    };
  }

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount,
      reference,
      currency: "NGN",
      channels: ["card", "bank_transfer"], // Allow both card and transfer
      metadata,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout?success=true`, // Redirect back after payment
    }),
  });

  const data = await res.json();
  return data;
}

export function verifyPaystackSignature(payload: string, signature: string | null) {
  const secret = process.env.PAYSTACK_WEBHOOK_SECRET || process.env.PAYSTACK_SECRET_KEY;

  if (!secret || !signature) {
    return false;
  }

  const hash = crypto
    .createHmac("sha512", secret)
    .update(payload, "utf8")
    .digest("hex");

  return hash === signature;
}
