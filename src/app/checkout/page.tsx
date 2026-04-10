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
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [shippingAddress, setShippingAddress] =
    useState<ShippingAddress>(EMPTY_ADDRESS);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">(
    "card"
  );
  const [paystackLoaded, setPaystackLoaded] = useState(false);
  const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  const paymentsEnabled = Boolean(paystackPublicKey);

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

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 2500;
  const tax = Math.round(total * 0.075);
  const totalAmount = total + shipping + tax;
  const userEmail = user?.email;

  async function handlePayment() {
    if (!paymentsEnabled) {
      alert(
        "Payments are not enabled yet. The site can be reviewed, but checkout is temporarily unavailable."
      );
      return;
    }

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
          throw new Error(data.message || "Payment init failed");
        }

        window.location.href = data.paymentUrl;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Payment failed. Please try again.";
        alert(message);
      }

      return;
    }

    handleCardPayment();
  }

  function handleCardPayment() {
    if (!paymentsEnabled) {
      alert("Payments are not enabled yet. Add your Paystack keys after approval.");
      return;
    }

    if (!paystackLoaded || !window.PaystackPop) {
      alert("Paystack is loading, please wait...");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: paystackPublicKey,
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
      {paymentsEnabled && (
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="afterInteractive"
          onLoad={() => setPaystackLoaded(true)}
        />
      )}

      <main className="mx-auto max-w-7xl px-4 py-8 text-white sm:px-6 sm:py-12">
        <section className="mb-8 rounded-[1.8rem] border border-[#d4af37]/35 bg-[linear-gradient(135deg,#050505_0%,#111111_55%,#24190a_100%)] px-5 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:px-8 md:px-10">
          <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-[#d4af37] sm:text-sm sm:tracking-[0.35em]">
            Checkout
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Confirm your order and delivery details.
          </h1>
        </section>

        {!paymentsEnabled && (
          <div className="mb-8 rounded-[1.5rem] border border-amber-500/40 bg-amber-950/40 p-5">
            <h2 className="text-xl font-bold text-amber-200">Payments Coming Soon</h2>
            <p className="mt-2 text-sm leading-7 text-amber-100/80">
              The store is live for review and product browsing. Online payments will be enabled after Paystack approval.
            </p>
          </div>
        )}

        {paymentSuccess && (
          <div className="mb-8 rounded-[1.5rem] border border-emerald-500/40 bg-emerald-950/40 p-5">
            <h2 className="text-xl font-bold text-emerald-200">Payment Successful</h2>
            <p className="mt-2 text-sm leading-7 text-emerald-100/80">
              Thank you for your order. We will process it shortly.
            </p>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <section className="space-y-6">
            <div className="rounded-[1.8rem] border border-white/10 bg-[#0d0d0d] p-6">
              <h2 className="text-xl font-bold text-[#d4af37]">
                Order as {user?.name || "Guest"}
              </h2>
              <p className="mt-2 text-sm text-gray-300">{user?.email || ""}</p>
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="mt-4 text-sm text-gray-400 transition hover:text-[#d4af37]"
              >
                Not {user?.name || "this user"}? Log out
              </button>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-[#0d0d0d] p-6">
              <h2 className="mb-6 text-xl font-bold text-white">Shipping Address</h2>
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={user?.name?.split(" ")[0] || ""}
                    readOnly
                    className="rounded-full border border-white/10 bg-black px-5 py-3 text-white outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={user?.name?.split(" ").slice(1).join(" ") || ""}
                    readOnly
                    className="rounded-full border border-white/10 bg-black px-5 py-3 text-white outline-none"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Street Address"
                  value={shippingAddress.street}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      street: e.target.value,
                    })
                  }
                  className="w-full rounded-full border border-white/10 bg-black px-5 py-3 text-white outline-none transition focus:border-[#d4af37]"
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        city: e.target.value,
                      })
                    }
                    className="rounded-full border border-white/10 bg-black px-5 py-3 text-white outline-none transition focus:border-[#d4af37]"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={shippingAddress.state}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        state: e.target.value,
                      })
                    }
                    className="rounded-full border border-white/10 bg-black px-5 py-3 text-white outline-none transition focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={shippingAddress.zip}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        zip: e.target.value,
                      })
                    }
                    className="rounded-full border border-white/10 bg-black px-5 py-3 text-white outline-none transition focus:border-[#d4af37]"
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    defaultValue="Nigeria"
                    className="rounded-full border border-white/10 bg-black px-5 py-3 text-white outline-none transition focus:border-[#d4af37]"
                  />
                </div>
              </form>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-[#0d0d0d] p-6">
              <h2 className="mb-6 text-xl font-bold text-white">Payment Method</h2>
              <div className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                  <label className="flex items-center text-white">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value as "card")
                      }
                      className="mr-2"
                    />
                    Credit/Debit Card
                  </label>
                  <label className="flex items-center text-white">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="transfer"
                      checked={paymentMethod === "transfer"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value as "transfer")
                      }
                      className="mr-2"
                    />
                    Bank Transfer
                  </label>
                </div>

                {paymentMethod === "card" && (
                  <div className="rounded-[1.4rem] border border-white/10 bg-black/40 p-4">
                    <p className="text-sm text-gray-300">
                      Card payments are processed securely through Paystack’s hosted checkout.
                    </p>
                  </div>
                )}

                {paymentMethod === "transfer" && (
                  <div className="rounded-[1.4rem] border border-white/10 bg-black/40 p-4">
                    <p className="text-sm text-gray-300">
                      You will be redirected to Paystack to complete your transfer instructions.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <aside className="h-fit rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white">Order Summary</h2>

            <div className="mt-6 max-h-64 space-y-4 overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between border-b border-white/10 pb-4"
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="text-xs text-gray-400">x {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-[#d4af37]">
                    NGN {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>NGN {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>NGN 2,500</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>NGN {tax.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-between border-t border-white/10 pt-5 text-lg font-bold text-white">
              <span>Total</span>
              <span className="text-[#d4af37]">
                NGN {totalAmount.toLocaleString()}
              </span>
            </div>

            <button
              className="mt-8 w-full rounded-full bg-[#d4af37] px-4 py-3 font-bold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handlePayment}
              disabled={
                !paymentsEnabled || (paymentMethod === "card" && !paystackLoaded)
              }
            >
              {!paymentsEnabled
                ? "Payments Coming Soon"
                : paymentMethod === "card"
                  ? paystackLoaded
                    ? "Pay with Card"
                    : "Loading Paystack..."
                  : "Pay with Transfer"}
            </button>

            <Link
              href="/Cart"
              className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-[#d4af37] px-4 py-3 text-center font-semibold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black"
            >
              Back to Cart
            </Link>
          </aside>
        </div>
      </main>
    </>
  );
}
