"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <>
        <main className="mx-auto max-w-4xl px-6 py-12 text-center">
          <h1 className="mb-6 text-3xl font-bold text-white">Your cart is empty</h1>
          <Link href="/shop" className="text-[#d4af37] underline">
            Continue shopping
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="mb-8 text-4xl font-bold text-white">Shopping Cart</h1>

        <div className="flex flex-col gap-8">
          {cartItems.map(({ id, name, price, quantity, image }) => (
            <div
              key={id}
              className="flex flex-wrap items-center gap-6 rounded border border-gray-300 bg-gray-900 p-4"
            >
              <img
                src={image}
                alt={name}
                className="h-24 w-24 rounded object-cover"
              />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold text-white">{name}</h2>
                <p className="text-gray-300 transition hover:text-[#d4af37]">₦{price.toLocaleString()}</p>
              </div>

              <div>
                <label className="sr-only" htmlFor={`qty-${id}`}>
                  Quantity
                </label>
                <input
                  id={`qty-${id}`}
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => updateQuantity(id, Number(e.target.value))}
                  className="w-16 rounded border border-gray-400 bg-black px-2 py-1 text-center text-white"
                />
              </div>

              <button
                onClick={() => removeItem(id)}
                className="ml-4 rounded bg-red-600 px-3 py-1 text-white transition hover:bg-red-700"
                aria-label={`Remove ${name} from cart`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between border-t border-gray-400 pt-8 text-xl font-bold text-white">
          <span>Total:</span>
          <span>₦{total.toLocaleString()}</span>
        </div>

        <div className="mt-8 text-right">
          <Link
            href="/checkout"
            className="rounded bg-[#d4af37] px-8 py-3 font-bold text-black transition hover:bg-white"
          >
            Proceed to Checkout
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
