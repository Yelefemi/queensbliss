"use client";

import Link from "next/link";
import Script from "next/script";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: {
        key: string | undefined;
        email: string | undefined;
        amount: number;
        currency: string;
        ref: string;
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }) => {
        openIframe: () => void;
      };
    };
  }
}

type ShippingAddress = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

const EMPTY_ADDRESS: ShippingAddress = {
  street: "",
  city: "",
  state: "",
  zip: "",
};

export default function Checkout() {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(EMPTY_ADDRESS);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">("card");
  const [paystackLoaded, setPaystackLoaded] = useState(false);

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setPaymentSuccess(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user?.address) {
      setShippingAddress({
        street: user.address.street ?? "",
        city: user.address.city ?? "",
        state: user.address.state ?? "",
        zip: user.address.zip ?? "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.PaystackPop) {
      setPaystackLoaded(true);
    }
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 2500;
  const tax = Math.round(total * 0.075);
  const totalAmount = total + shipping + tax;
  const userEmail = user?.email;

  async function handlePayment() {
    if (!userEmail) {
      alert("Please log in to continue");
      return;
    }

    if (paymentMethod === "transfer") {
      try {
        const res = await fetch("/api/payment/initialize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userEmail,
            amount: totalAmount,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.paymentUrl) {
          throw new Error("Payment init failed");
        }

        window.location.href = data.paymentUrl;
      } catch {
        alert("Payment failed. Please try again.");
      }

      return;
    }

    handleCardPayment();
  }

  function handleCardPayment() {
    if (!paystackLoaded || !window.PaystackPop) {
      alert("Paystack is loading, please wait...");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: userEmail,
      amount: totalAmount * 100,
      currency: "NGN",
      ref: `txn_${Date.now()}`,
      callback(response) {
        setPaymentSuccess(true);
        alert(`Payment successful! Reference: ${response.reference}`);
      },
      onClose() {
        alert("Payment cancelled");
      },
    });

    handler.openIframe();
  }

  return (
    <>
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="afterInteractive"
        onLoad={() => setPaystackLoaded(true)}
      />

      <main className="mx-auto max-w-7xl px-6 py-12">
        {paymentSuccess && (
          <div className="mb-8 rounded-lg border border-green-500 bg-green-900 p-6">
            <h2 className="text-xl font-bold text-green-200">Payment Successful!</h2>
            <p className="text-green-300">Thank you for your order. We'll process it shortly.</p>
          </div>
        )}

        <h1 className="mb-8 text-3xl font-bold text-white">Checkout</h1>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="mb-8 rounded-lg border border-gray-300 bg-gray-900 p-6">
              <h2 className="mb-4 text-xl font-bold text-[#d4af37]">Order as {user?.name || "User"}</h2>
              <p className="mb-4 text-gray-300">{user?.email || ""}</p>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to log out?")) {
                    router.push("/");
                  }
                }}
                className="text-sm text-gray-400 transition hover:text-[#d4af37]"
              >
                Not {user?.name || "User"}? Log out
              </button>
            </div>

            <div className="mb-8 rounded-lg border border-gray-300 bg-gray-900 p-6">
              <h2 className="mb-6 text-xl font-bold text-white">Shipping Address</h2>
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={user?.name?.split(" ")[0] || ""}
                    readOnly
                    className="rounded border border-gray-400 bg-gray-800 px-4 py-2 text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={user?.name?.split(" ").slice(1).join(" ") || ""}
                    readOnly
                    className="rounded border border-gray-400 bg-gray-800 px-4 py-2 text-white focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Street Address"
                  value={shippingAddress.street}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                  className="w-full rounded border border-gray-400 bg-black px-4 py-2 text-white focus:border-[#d4af37] focus:outline-none"
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="rounded border border-gray-400 bg-black px-4 py-2 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                    className="rounded border border-gray-400 bg-black px-4 py-2 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={shippingAddress.zip}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
                    className="rounded border border-gray-400 bg-black px-4 py-2 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    className="rounded border border-gray-400 bg-black px-4 py-2 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </form>
            </div>

            <div className="mb-8 rounded-lg border border-gray-300 bg-gray-900 p-6">
              <h2 className="mb-6 text-xl font-bold text-white">Payment Method</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value as "card")}
                      className="mr-2"
                    />
                    <span className="text-white">Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="transfer"
                      checked={paymentMethod === "transfer"}
                      onChange={(e) => setPaymentMethod(e.target.value as "transfer")}
                      className="mr-2"
                    />
                    <span className="text-white">Bank Transfer</span>
                  </label>
                </div>

                {paymentMethod === "card" && (
                  <div className="mt-4 rounded border border-gray-600 bg-gray-800 p-4">
                    <p className="mb-2 text-gray-300">Enter your card details below. Payment is processed securely.</p>
                    <p className="text-sm text-gray-400">Card details will be handled by Paystack&apos;s secure inline form.</p>
                  </div>
                )}

                {paymentMethod === "transfer" && (
                  <div className="mt-4 rounded border border-gray-600 bg-gray-800 p-4">
                    <p className="mb-2 text-gray-300">You&apos;ll be redirected to Paystack to complete your bank transfer.</p>
                    <p className="text-sm text-gray-400">Transfer details will be provided on the next page.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="h-fit rounded-lg border border-gray-300 bg-gray-900 p-6">
            <h2 className="mb-6 text-xl font-bold text-white">Order Summary</h2>

            <div className="mb-6 max-h-64 space-y-4 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start justify-between border-b border-gray-700 pb-4">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="text-xs text-gray-400">x {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-[#d4af37]">NGN {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="mb-6 space-y-2 border-t border-gray-700 pt-4">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>NGN {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>NGN 2,500</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Tax</span>
                <span>NGN {tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-gray-700 pt-4 text-lg font-bold text-white">
                <span>Total</span>
                <span className="text-[#d4af37]">NGN {totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <button
              className="w-full rounded bg-[#d4af37] px-4 py-3 font-bold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handlePayment}
              disabled={paymentMethod === "card" && !paystackLoaded}
            >
              {paymentMethod === "card" ? (paystackLoaded ? "Pay with Card" : "Loading Paystack...") : "Pay with Transfer"}
            </button>

            <Link
              href="/Cart"
              className="mt-4 block w-full rounded border border-gray-400 px-4 py-3 text-center font-bold text-gray-300 transition hover:border-[#d4af37] hover:text-[#d4af37]"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
