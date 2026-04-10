"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12 text-center text-white sm:px-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-14 backdrop-blur-sm">
          <h1 className="mb-4 text-3xl font-bold">Your cart is empty</h1>
          <p className="mx-auto mb-6 max-w-xl text-sm leading-7 text-gray-300">
            Start with the wig collection or add maintenance essentials to build your order.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-full bg-[#d4af37] px-6 py-3 font-bold text-black transition hover:bg-white"
            >
              Shop Hair
            </Link>
            <Link
              href="/maintenance"
              className="inline-flex items-center justify-center rounded-full border border-[#d4af37] px-6 py-3 font-semibold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black"
            >
              Shop Maintenance
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 text-white sm:px-6 sm:py-12">
      <section className="mb-8 rounded-[1.8rem] border border-[#d4af37]/35 bg-[linear-gradient(135deg,#050505_0%,#111111_55%,#24190a_100%)] px-5 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:px-8 md:px-10">
        <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-[#d4af37] sm:text-sm sm:tracking-[0.35em]">
          Cart
        </p>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          Review your order before checkout.
        </h1>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="space-y-5">
          {cartItems.map(({ id, name, price, quantity, image }) => (
            <article
              key={id}
              className="flex flex-col gap-4 rounded-[1.6rem] border border-white/10 bg-[#0d0d0d] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] sm:flex-row sm:items-center"
            >
              <img
                src={image}
                alt={name}
                className="h-28 w-full rounded-[1.2rem] object-cover sm:w-28"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-white">{name}</h2>
                <p className="mt-1 text-sm font-medium text-[#d4af37]">
                  NGN {price.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                <label className="sr-only" htmlFor={`qty-${id}`}>
                  Quantity
                </label>
                <input
                  id={`qty-${id}`}
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => updateQuantity(id, Number(e.target.value))}
                  className="w-20 rounded-full border border-white/10 bg-black px-3 py-2 text-center text-white outline-none focus:border-[#d4af37]"
                />
                <button
                  onClick={() => removeItem(id)}
                  className="rounded-full border border-red-500/50 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-600 hover:text-white"
                  aria-label={`Remove ${name} from cart`}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="h-fit rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-white">Order summary</h2>
          <div className="mt-6 space-y-3 border-b border-white/10 pb-6 text-sm text-gray-300">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>NGN {total.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-6 flex justify-between text-xl font-bold text-white">
            <span>Total</span>
            <span className="text-[#d4af37]">NGN {total.toLocaleString()}</span>
          </div>

          <Link
            href="/checkout"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#d4af37] px-6 py-3 font-bold text-black transition hover:bg-white"
          >
            Proceed to Checkout
          </Link>

          <Link
            href="/shop"
            className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-[#d4af37] px-6 py-3 text-sm font-semibold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}
