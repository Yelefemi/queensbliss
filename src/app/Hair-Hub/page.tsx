"use client";

import Link from "next/link";

const guides = [
  {
    title: "Hair types guide",
    desc: "Understand blend, human hair, bone straight, raw donor, and what each finish means before you buy.",
  },
  {
    title: "Maintenance routine",
    desc: "A simple care routine for washing, detangling, storing, and refreshing your wigs between installs.",
  },
  {
    title: "Install expectations",
    desc: "Know what to ask before lace installs, frontal styling, and bridal preparation so the result feels worth it.",
  },
];

const quickTips = [
  "Store units on a stand to keep shape longer.",
  "Use lighter products on wigs to avoid buildup.",
  "Refresh curls with moisture before applying heat.",
  "Match your routine to your hair type, not just trends.",
];

export default function HairHubPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 text-white sm:px-6 sm:py-12">
      <section className="rounded-[1.8rem] border border-[#d4af37]/35 bg-[linear-gradient(135deg,#050505_0%,#111111_55%,#24190a_100%)] px-5 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:px-8 md:px-10">
        <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-[#d4af37] sm:text-sm sm:tracking-[0.35em]">
          Hair Hub
        </p>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          Learn how to choose, wear, and maintain premium hair with more confidence.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
          The Hair Hub is your quick learning space for picking the right texture, caring for your units, and knowing when to talk to a stylist.
        </p>
      </section>

      <section className="grid gap-6 py-10 md:grid-cols-3 md:py-14">
        {guides.map((item) => (
          <article
            key={item.title}
            className="rounded-[1.75rem] border border-white/10 bg-[#0d0d0d] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37]">Guide</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-gray-300">{item.desc}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 py-2 md:grid-cols-[1fr_1fr] md:py-6">
        <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">Quick Tips</p>
          <h2 className="mt-3 text-3xl font-bold">Start with these basics</h2>
          <div className="mt-6 space-y-3">
            {quickTips.map((tip) => (
              <div
                key={tip}
                className="rounded-full border border-white/10 bg-black/35 px-4 py-3 text-sm text-gray-200"
              >
                {tip}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-white/10 bg-[#0d0d0d] p-6 md:p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">Need Help?</p>
          <h2 className="mt-3 text-3xl font-bold">Talk to the team before you buy.</h2>
          <p className="mt-4 text-sm leading-7 text-gray-300 md:text-base">
            If you are unsure about hair type, budget, or maintenance routine, speak with a Queen Bliss consultant and get guided to the right option faster.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/2349028367079?text=Hello%20Queen%27s%20Bliss,%20I%20need%20help%20choosing%20hair"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#d4af37] px-6 py-3 text-sm font-bold text-black transition hover:bg-white"
            >
              Chat on WhatsApp
            </a>
            <Link
              href="/maintenance"
              className="inline-flex items-center justify-center rounded-full border border-[#d4af37] px-6 py-3 text-sm font-semibold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black"
            >
              Shop maintenance
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
