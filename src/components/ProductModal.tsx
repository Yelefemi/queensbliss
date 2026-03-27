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
      className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-black border-2 border-[#d4af37] rounded-xl max-w-xl w-full p-6 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">
            {product.name}
          </h2>
          <button
            onClick={onClose}
            className="text-white text-xl hover:text-[#d4af37]"
          >
            ✕
          </button>
        </div>

        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover rounded mb-4"
        />

        {/* Details */}
        <p className="text-gray-300">
          Category: <span className="text-[#d4af37]">{product.category}</span>
        </p>
        <p className="text-gray-300">
          Hair Type: <span className="text-[#d4af37]">{product.hairType}</span>
        </p>

        <p className="text-3xl font-bold text-[#d4af37] my-4">
          ₦{product.price.toLocaleString()}
        </p>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => {
              addToCart(product);
              onClose();
            }}
            className="flex-1 bg-[#d4af37] text-black py-3 font-bold rounded hover:bg-white"
          >
            Add to Cart
          </button>

          <button
            onClick={onClose}
            className="flex-1 border border-[#d4af37] text-[#d4af37] py-3 font-bold rounded hover:bg-[#d4af37] hover:text-black"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
