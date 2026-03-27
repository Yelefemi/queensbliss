export async function initializePaystackPayment({
  email,
  amount,
  reference,
}: {
  email: string;
  amount: number; // in kobo
  reference: string;
}) {
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
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout?success=true`, // Redirect back after payment
    }),
  });

  const data = await res.json();
  return data;
}
