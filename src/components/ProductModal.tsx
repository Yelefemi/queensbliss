"use client";

import { useEffect } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface Props {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: Props) {
  const { addToCart } = useCart();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 px-4"
      onClick={onClose}
    >
      <div
        className="animate-scaleIn w-full max-w-2xl overflow-hidden rounded-[2rem] border border-[#d4af37]/40 bg-[#090909] shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
          <img
            src={product.image}
            alt={product.name}
            className="h-72 w-full object-cover md:h-full"
          />

          <div className="p-6 md:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">{product.category}</p>
                <h2 className="mt-2 text-2xl font-bold text-white">{product.name}</h2>
              </div>
              <button
                onClick={onClose}
                className="text-xl text-white transition hover:text-[#d4af37]"
                aria-label="Close product modal"
              >
                ×
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-300">
              {product.description ?? "A Queen Bliss piece designed for a polished finish and confident wear."}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#d4af37]/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#d4af37]">
                {product.hairType}
              </span>
              {product.benefits?.map((benefit) => (
                <span
                  key={benefit}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-200"
                >
                  {benefit}
                </span>
              ))}
            </div>

            <p className="my-6 text-3xl font-bold text-[#d4af37]">
              NGN {product.price.toLocaleString()}
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                className="flex-1 rounded-full bg-[#d4af37] py-3 font-bold text-black transition hover:bg-white"
              >
                Add to Cart
              </button>

              <button
                onClick={onClose}
                className="flex-1 rounded-full border border-[#d4af37] py-3 font-bold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
