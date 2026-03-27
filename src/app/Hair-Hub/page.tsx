"use client";

export default function HairHubPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="mb-6 text-4xl font-bold text-[#d4af37]">
        Queen’s Bliss Hair Hub
      </h1>

      <p className="mb-12 max-w-2xl text-[#d4af37]">
        Learn how to choose, care for, and maintain premium hair that lasts.
      </p>

      {/* Education */}
      <div className="grid gap-8 md:grid-cols-3 mb-20">
        {[
          {
            title: "Hair Types Guide",
            desc: "Blend, Human Hair, Bone Straight, Raw Donor & Curly explained.",
          },
          {
            title: "Hair Care Tips",
            desc: "Washing, styling & storage for long-lasting beauty.",
          },
          {
            title: "Installation Advice",
            desc: "What to know before wigs, frontals & bridal installs.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-200 bg-white p-6 hover:border-[#d4af37]"
          >
            <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Consultation CTA */}
      <section className="rounded-lg bg-black px-8 py-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">
          Need Help Choosing the Right Hair?
        </h2>

        <p className="mb-6 text-gray-300">
          Speak directly with a Queen’s Bliss hair consultant for personalized advice.
        </p>

        <a
          href="https://wa.me/2349028367079?text=Hello%20Queen’s%20Bliss,%20I%20need%20help%20choosing%20hair"
          target="_blank"
          className="inline-block rounded bg-[#d4af37] px-8 py-3 font-bold text-black hover:bg-white"
        >
          Chat on WhatsApp
        </a>
      </section>
    </main>
  );
}
