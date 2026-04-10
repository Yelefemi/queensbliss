import Link from "next/link";

const values = [
  "Premium quality",
  "Customer confidence",
  "Authenticity",
  "Excellent service",
];

const pillars = [
  {
    title: "Luxury without confusion",
    description:
      "We curate wigs, maintenance essentials, and stylist support so customers can shop with more confidence and less guesswork.",
  },
  {
    title: "Built for real women",
    description:
      "From students to brides to busy professionals, Queen Bliss focuses on practical beauty that still feels elevated.",
  },
  {
    title: "Care after checkout",
    description:
      "The relationship does not stop at purchase. Hair care guidance and maintenance products are part of the brand promise.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 text-white sm:px-6 sm:py-12">
      <section className="rounded-[1.8rem] border border-[#d4af37]/35 bg-[linear-gradient(135deg,#050505_0%,#111111_55%,#24190a_100%)] px-5 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:px-8 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-[#d4af37] sm:text-sm sm:tracking-[0.35em]">
              About Queen Bliss
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Premium hair, confident women, and a shopping experience designed to feel intentional.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
              Queen Bliss was built to make premium hair feel clearer, more trusted, and more useful in everyday life. We combine polished collections, maintenance essentials, and stylist access in one place.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-black/35 p-6 backdrop-blur-sm">
            <p className="text-lg leading-8 text-white">
              “Hair is not just beauty. It is identity, presence, and confidence.”
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.25em] text-[#d4af37]">
              Queen Bliss
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 py-10 md:grid-cols-3 md:py-14">
        {pillars.map((item) => (
          <article
            key={item.title}
            className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-sm"
          >
            <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-gray-300">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 py-2 md:grid-cols-[1.05fr_0.95fr] md:py-6">
        <div className="rounded-[1.8rem] border border-white/10 bg-[#0d0d0d] p-6 md:p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">Our Story</p>
          <h2 className="mt-3 text-3xl font-bold">Why the brand exists</h2>
          <p className="mt-4 text-sm leading-7 text-gray-300 md:text-base">
            Queen Bliss started from a simple need: helping women feel put together through hair that looks rich, wears well, and suits different budgets and life stages. That is why the collections are curated around actual customer realities, not only trends.
          </p>
          <p className="mt-4 text-sm leading-7 text-gray-300 md:text-base">
            The brand now extends beyond wigs into maintenance products and stylist support, because beautiful hair is not only about the install. It is also about how well it lasts.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold text-white">Mission</h3>
            <p className="mt-3 text-sm leading-7 text-gray-300">
              To provide high-quality hair products and a cleaner shopping experience that helps every customer feel seen, stylish, and confident.
            </p>
          </div>
          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold text-white">Vision</h3>
            <p className="mt-3 text-sm leading-7 text-gray-300">
              To become a trusted premium hair platform across Africa and beyond by connecting products, care education, and professional stylists in one brand.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">What We Stand For</p>
              <h2 className="mt-3 text-3xl font-bold">The values behind the brand</h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex rounded-full border border-[#d4af37] px-5 py-3 text-sm font-semibold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black"
            >
              Shop collection
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => (
              <div
                key={value}
                className="rounded-[1.4rem] border border-white/10 bg-black/35 p-5 text-center text-sm font-semibold uppercase tracking-[0.16em] text-white"
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
