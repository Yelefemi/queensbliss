"use client";

import { useState } from "react";
import ProductModal from "@/components/ProductModal";
import { Product } from "@/types/product";
import products from "@/data/products";

const categories = ["Students", "Brides", "Working Class", "Luxury"];
const hairTypes = ["Blend", "Human Hair", "Bone Straight", "Raw Donor", "Curly"];

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [hairType, setHairType] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "all" || product.category === category;

    const matchesHairType = hairType === "all" || product.hairType === hairType;

    return matchesSearch && matchesCategory && matchesHairType;
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-10 text-3xl font-bold text-white">Queen’s Bliss Hair Collection</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10">
        <input
          type="text"
          placeholder="Search wigs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-black border border-[#d4af37] text-white px-4 py-2 rounded"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-black border border-[#d4af37] text-white px-4 py-2 rounded"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={hairType}
          onChange={(e) => setHairType(e.target.value)}
          className="bg-black border border-[#d4af37] text-white px-4 py-2 rounded"
        >
          <option value="all">All Hair Types</option>
          {hairTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border border-[#d4af37] rounded-lg p-3 bg-black"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover rounded mb-3"
            />

            <h3 className="text-white font-semibold">{product.name}</h3>

            <p className="text-[#d4af37] font-bold">
              ₦{product.price.toLocaleString()}
            </p>

            <button
              onClick={() => setSelectedProduct(product)}
              className="mt-3 w-full border border-[#d4af37] text-[#d4af37] py-2 rounded hover:bg-[#d4af37] hover:text-black"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 && (
  <p className="text-white text-center col-span-full">
    No products found for your search or filters.
  </p>
)}


      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}
