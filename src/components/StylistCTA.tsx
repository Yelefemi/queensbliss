"use client";

import Link from "next/link";

export default function StylistCTA() {
  return (
    <section className="relative overflow-hidden bg-black py-20">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-[#d4af37]/20" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          
          {/* Text */}
          <div>
            <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
              Are You a Professional Hairstylist?
            </h2>

            <p className="mb-6 max-w-xl text-gray-300">
              Join Queen’s Bliss Stylist Hub and get connected to clients who
              need professional installation, styling, and bridal hair services.
            </p>

            <ul className="mb-8 space-y-3 text-gray-300">
              <li>✔ Get client bookings directly</li>
              <li>✔ Grow your brand & visibility</li>
              <li>✔ Work with premium hair products</li>
            </ul>

            <Link
              href="/Stylist"
              className="inline-block rounded bg-[#d4af37] px-8 py-3 font-bold text-black transition hover:bg-white"
            >
              Join as a Stylist
            </Link>
          </div>

         {/* Image */}
<div className="relative">
  <img
    src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1"
    alt="Hair stylist at work"
    className="rounded-lg object-cover shadow-lg h-150 w-full"  // Added h-72 and w-full here
  />
  <div className="absolute inset-0 rounded-lg ring-1 ring-[#d4af37]/40" />
</div>


        </div>
      </div>
    </section>
  );
}
