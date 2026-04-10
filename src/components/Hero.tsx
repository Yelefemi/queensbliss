"use client";

import Link from "next/link";

const highlights = [
  { label: "Signature collections", value: "4" },
  { label: "Care essentials", value: "6" },
  { label: "Trusted by stylists", value: "120+" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 md:pb-24 md:pt-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-10">
        <div className="space-y-6 sm:space-y-8">
          <div className="inline-flex max-w-full items-center rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d4af37] sm:px-4 sm:text-xs sm:tracking-[0.3em]">
            Queen Bliss Hair House
          </div>

          <div className="space-y-4 sm:space-y-5">
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.02] sm:text-5xl md:text-6xl lg:text-7xl">
              Premium wigs and maintenance essentials with a richer finish.
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-gray-300 sm:text-base md:text-lg">
              Shop luxury-ready wigs, student-friendly installs, bridal texture, and the care products that keep every unit fresh long after checkout.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="/shop"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#d4af37] px-6 py-3 text-sm font-bold text-black transition hover:bg-white sm:w-auto sm:px-8 sm:py-4"
            >
              Shop Hair Collection
            </Link>
            <Link
              href="/maintenance"
              className="inline-flex w-full items-center justify-center rounded-full border border-[#d4af37] px-6 py-3 text-sm font-bold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black sm:w-auto sm:px-8 sm:py-4"
            >
              Explore Maintenance
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm sm:rounded-[1.5rem] sm:px-5 sm:py-5"
              >
                <p className="text-2xl font-bold text-[#d4af37] sm:text-3xl">{item.value}</p>
                <p className="mt-2 text-xs text-gray-300 sm:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 top-8 h-20 w-20 rounded-full bg-[#d4af37]/20 blur-3xl sm:-left-10 sm:h-32 sm:w-32" />
          <div className="absolute -right-4 bottom-6 h-24 w-24 rounded-full bg-[#d4af37]/10 blur-3xl sm:-right-6 sm:h-40 sm:w-40" />

          <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0d0d0d] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:rounded-[2rem] sm:p-4">
            <img
              src="https://i.pinimg.com/1200x/af/c7/7b/afc77b328645f19aed2d831e79692361.jpg"
              alt="Queen Bliss premium wig collection"
              className="h-[360px] w-full rounded-[1.2rem] object-cover sm:h-[440px] sm:rounded-[1.5rem] lg:h-[520px]"
            />

            <div className="absolute inset-x-5 bottom-5 rounded-[1.2rem] border border-white/10 bg-black/70 p-4 backdrop-blur-md sm:inset-x-8 sm:bottom-8 sm:rounded-[1.4rem] sm:p-5 lg:inset-x-10 lg:bottom-10 lg:rounded-[1.5rem]">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#d4af37] sm:text-xs sm:tracking-[0.3em]">This Season</p>
              <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl lg:text-2xl">Glossy installs, soft lace, polished finish.</h2>
              <p className="mt-2 text-xs leading-5 text-gray-300 sm:text-sm sm:leading-6">
                Built for bridal mornings, office-ready styling, and everyday confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
