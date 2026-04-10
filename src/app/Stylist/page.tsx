"use client";

import Link from "next/link";
import { useState } from "react";

export default function StylistPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12 text-white sm:px-6">
        <div className="rounded-[2rem] border border-[#d4af37]/35 bg-[linear-gradient(135deg,#050505_0%,#111111_55%,#24190a_100%)] px-6 py-12 text-center shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
          <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">Application Received</p>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">Your stylist application is in.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
            Thank you for applying to the Queen Bliss Stylist Hub. Our team will review your details and reach out if the fit is right.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-[#d4af37] px-6 py-3 text-sm font-bold text-black transition hover:bg-white"
          >
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 text-white sm:px-6 sm:py-12">
      <section className="rounded-[1.8rem] border border-[#d4af37]/35 bg-[linear-gradient(135deg,#050505_0%,#111111_55%,#24190a_100%)] px-5 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:px-8 md:px-10">
        <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-[#d4af37] sm:text-sm sm:tracking-[0.35em]">
          Stylist Hub
        </p>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          Join the Queen Bliss stylist network.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
          Get discovered by customers looking for installs, bridal styling, and premium hair service support through the Queen Bliss brand.
        </p>
      </section>

      <section className="grid gap-6 py-10 lg:grid-cols-[0.95fr_1.05fr] md:py-14">
        <div className="space-y-6">
          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white">Why apply?</h2>
            <div className="mt-5 space-y-3 text-sm text-gray-200">
              <div className="rounded-full border border-white/10 bg-black/30 px-4 py-3">Connect with customers already shopping for premium hair.</div>
              <div className="rounded-full border border-white/10 bg-black/30 px-4 py-3">Grow your visibility with a stronger premium brand association.</div>
              <div className="rounded-full border border-white/10 bg-black/30 px-4 py-3">Position yourself for installs, bridal bookings, and repeat clients.</div>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/10 bg-[#0d0d0d] p-6">
            <h3 className="text-2xl font-semibold text-white">Best fit for</h3>
            <p className="mt-3 text-sm leading-7 text-gray-300">
              Wig installers, bridal stylists, frontal specialists, and all-round professionals who want more premium-facing exposure.
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="grid gap-4 rounded-[1.8rem] border border-white/10 bg-[#0d0d0d] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
        >
          <h2 className="text-2xl font-semibold text-white">Apply now</h2>

          <input
            required
            placeholder="Full Name"
            className="rounded-full border border-white/10 bg-black px-5 py-3 text-white outline-none transition focus:border-[#d4af37]"
          />

          <input
            required
            placeholder="Phone Number"
            className="rounded-full border border-white/10 bg-black px-5 py-3 text-white outline-none transition focus:border-[#d4af37]"
          />

          <input
            required
            type="email"
            placeholder="Email Address"
            className="rounded-full border border-white/10 bg-black px-5 py-3 text-white outline-none transition focus:border-[#d4af37]"
          />

          <input
            required
            placeholder="City / Location"
            className="rounded-full border border-white/10 bg-black px-5 py-3 text-white outline-none transition focus:border-[#d4af37]"
          />

          <select
            required
            defaultValue=""
            className="rounded-full border border-white/10 bg-black px-5 py-3 text-white outline-none transition focus:border-[#d4af37]"
          >
            <option value="" disabled>
              Primary Specialty
            </option>
            <option>Wig Installation</option>
            <option>Bridal Styling</option>
            <option>Frontal / Closure</option>
            <option>All-round Stylist</option>
          </select>

          <textarea
            required
            placeholder="Briefly describe your experience"
            rows={5}
            className="rounded-[1.5rem] border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-[#d4af37]"
          />

          <button
            type="submit"
            className="rounded-full bg-[#d4af37] py-3 font-bold text-black transition hover:bg-white"
          >
            Submit Application
          </button>
        </form>
      </section>
    </main>
  );
}
