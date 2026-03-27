"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(images.unsplash.com/photo-1511929825537-516974a253df?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-[#d4af37]/30" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="mb-6 max-w-3xl text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Luxury Hair,  
            <span className="text-[#d4af37]"> Perfect You.</span>
          </h1>

          <p className="mb-8 max-w-xl text-lg text-gray-200">
            Premium wigs and hair collections crafted for students, brides,
            working-class women and luxury lovers.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="rounded bg-[#d4af37] px-8 py-3 font-bold text-black hover:bg-white transition"
            >
              Shop Now
            </Link>

            <Link
              href="/Contact-Us"
              className="rounded border-2 border-[#d4af37] px-8 py-3 font-bold text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
