"use client";

import Link from "next/link";

export default function StylistCTA() {
  return (
    <section className="px-6 py-10 md:py-14">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.2rem] border border-[#d4af37]/25 bg-[linear-gradient(135deg,#0b0b0b_0%,#151515_60%,#2d200c_100%)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.3)] md:grid-cols-[0.95fr_1.05fr] md:p-8 lg:p-10">
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">Stylist Network</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Are you a professional hairstylist?</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-300 md:text-base">
              Join the Queen Bliss stylist hub to attract bridal bookings, wig installations, and premium-hair clients already shopping inside the brand.
            </p>
          </div>

          <div className="mt-8 space-y-3 text-sm text-gray-200">
            <div className="rounded-full border border-white/10 bg-black/25 px-4 py-3">Get direct client bookings from the site.</div>
            <div className="rounded-full border border-white/10 bg-black/25 px-4 py-3">Grow visibility with a stronger premium positioning.</div>
            <div className="rounded-full border border-white/10 bg-black/25 px-4 py-3">Work with premium hair and maintenance products.</div>
          </div>

          <Link
            href="/Stylist"
            className="mt-8 inline-flex w-fit rounded-full bg-[#d4af37] px-8 py-4 text-sm font-bold text-black transition hover:bg-white"
          >
            Join as a Stylist
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10">
          <img
            src="https://i.pinimg.com/736x/37/d3/ba/37d3ba5ecddf186e08aa89ec0eb596e8.jpg"
            alt="Hair stylist at work"
            className="h-full min-h-[380px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 rounded-[1.5rem] border border-white/10 bg-black/60 px-5 py-4 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">For Pros</p>
            <p className="mt-2 text-lg font-semibold text-white">Install. Style. Grow your brand.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
