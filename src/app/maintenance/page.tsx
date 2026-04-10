"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import maintenanceProducts from "@/data/maintenanceProducts";
import { useCart } from "@/context/CartContext";

const categories = ["Shampoo", "Conditioner", "Treatment", "Styling", "Wig Care"];
const hairNeeds = [
  "Dry Hair",
  "Frizzy Hair",
  "Protective Styles",
  "Curly Hair",
  "Lace Front Wigs",
  "Straight Hair",
];

export default function MaintenancePage() {
  const { addToCart, cartCount } = useCart();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [hairNeed, setHairNeed] = useState("all");

  const filteredProducts = useMemo(() => {
    return maintenanceProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "all" || product.category === category;
      const matchesHairNeed =
        hairNeed === "all" || product.hairType === hairNeed;

      return matchesSearch && matchesCategory && matchesHairNeed;
    });
  }, [category, hairNeed, search]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 text-white sm:px-6 sm:py-12">
      <section className="mb-8 rounded-[1.6rem] border border-[#d4af37]/40 bg-[linear-gradient(135deg,#050505_0%,#111111_55%,#24190a_100%)] px-4 py-7 shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:mb-10 sm:rounded-[2rem] sm:px-6 sm:py-10 md:px-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-[#d4af37] sm:text-sm sm:tracking-[0.35em]">
              Hair Maintenance
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Pick the products that keep your hair and wigs looking fresh.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-300 md:text-base">
              Build a routine with cleansers, treatments, styling essentials, and wig-care products,
              then add everything to the same cart before checkout.
            </p>
          </div>

          <Link
            href="/Cart"
            className="inline-flex w-full items-center justify-center rounded-full border border-[#d4af37] px-6 py-3 text-sm font-semibold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black sm:w-auto"
          >
            View Cart ({cartCount})
          </Link>
        </div>
      </section>

      <section className="mb-8 grid gap-3 md:grid-cols-3 md:gap-4 sm:mb-10">
        <input
          type="text"
          placeholder="Search maintenance products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-full border border-[#d4af37]/50 bg-black px-5 py-3 text-white outline-none transition focus:border-[#d4af37]"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-full border border-[#d4af37]/50 bg-black px-5 py-3 text-white outline-none transition focus:border-[#d4af37]"
        >
          <option value="all">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={hairNeed}
          onChange={(e) => setHairNeed(e.target.value)}
          className="rounded-full border border-[#d4af37]/50 bg-black px-5 py-3 text-white outline-none transition focus:border-[#d4af37]"
        >
          <option value="all">All hair needs</option>
          {hairNeeds.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </section>

      {filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-14 text-center">
          <p className="text-lg font-semibold">No maintenance products match those filters.</p>
          <p className="mt-2 text-sm text-gray-300">
            Try another category or hair need.
          </p>
        </div>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d0d0d] shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-64 w-full object-cover"
              />

              <div className="space-y-4 p-6">
                <div className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.2em]">
                  <span className="rounded-full bg-[#d4af37]/15 px-3 py-1 text-[#d4af37]">
                    {product.category}
                  </span>
                  <span className="rounded-full bg-white/8 px-3 py-1 text-gray-300">
                    {product.hairType}
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold">{product.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-gray-300">
                    {product.description}
                  </p>
                </div>

                {product.benefits && (
                  <div className="flex flex-wrap gap-2">
                    {product.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-200"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <p className="text-2xl font-bold text-[#d4af37]">
                    NGN {product.price.toLocaleString()}
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                    className="rounded-full bg-[#d4af37] px-5 py-3 text-sm font-bold text-black transition hover:bg-white"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
