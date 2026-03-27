"use client";

import { useState } from "react";

export default function StylistPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="mb-4 text-3xl font-bold text-black">
          Application Received ✨
        </h1>
        <p className="text-gray-600">
          Thank you for applying to Queen’s Bliss Stylist Hub.  
          Our team will review your application and contact you shortly.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="mb-4 text-4xl font-bold text-white">
        Join Queen’s Bliss Stylist Hub
      </h1>

      <p className="mb-10 max-w-2xl text-[#d4af37]">
        Get connected with premium clients who need professional installation,
        bridal styling, and luxury hair services.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="grid gap-6 max-w-3xl"
      >
        <input
          required
          placeholder="Full Name"
          className="rounded border px-4 py-3"
        />

        <input
          required
          placeholder="Phone Number"
          className="rounded border px-4 py-3"
        />

        <input
          required
          type="email"
          placeholder="Email Address"
          className="rounded border px-4 py-3"
        />

        <input
          required
          placeholder="City / Location"
          className="rounded border px-4 py-3"
        />

        <select required className="rounded border px-4 py-3">
          <option value="">Primary Specialty</option>
          <option>Wig Installation</option>
          <option>Bridal Styling</option>
          <option>Frontal / Closure</option>
          <option>All-round Stylist</option>
        </select>

        <textarea
          required
          placeholder="Briefly describe your experience"
          rows={4}
          className="rounded border px-4 py-3"
        />

        <button
          type="submit"
          className="rounded bg-[#d4af37] py-3 font-bold text-black hover:bg-black hover:text-white"
        >
          Submit Application
        </button>
      </form>
    </main>
  );
}
