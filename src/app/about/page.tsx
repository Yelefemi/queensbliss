export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative bg-black py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-[#d4af37]/30" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h1 className="mb-4 text-4xl md:text-5xl font-bold text-white">
            About Queen’s Bliss
          </h1>
          <p className="text-gray-300">
            Premium hair. Confident women. Timeless beauty.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-black">
              Our Story
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Queen’s Bliss was created with one goal in mind — to help women
              feel confident, beautiful, and empowered through premium quality
              hair products.
              <br /><br />
              From everyday elegance to bridal luxury, our collections are
              carefully curated to suit students, working-class women, brides,
              and lovers of luxury.
            </p>
          </div>

          <div className="rounded-lg bg-[#f9f9f9] p-8 border">
            <p className="text-lg font-semibold text-black">
              “Hair is not just beauty — it’s identity, confidence, and power.”
            </p>
            <p className="mt-3 text-sm text-gray-500">
              — Queen’s Bliss
            </p>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-[#fafafa] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-2">
            
            {/* Mission */}
            <div className="rounded-lg border bg-white p-8 hover:border-[#d4af37] transition">
              <h3 className="mb-3 text-2xl font-bold text-black">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To provide high-quality, long-lasting hair products while
                creating a seamless shopping and styling experience that makes
                every woman feel confident and celebrated.
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-lg border bg-white p-8 hover:border-[#d4af37] transition">
              <h3 className="mb-3 text-2xl font-bold text-black">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To become a trusted household name in premium hair across Africa
                and beyond — connecting beauty, confidence, and professional
                hairstylists through one powerful platform.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-10 text-center text-3xl font-bold text-black">
          What We Stand For
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {[
            "Premium Quality",
            "Customer Confidence",
            "Authenticity",
            "Excellence in Service",
          ].map((value, i) => (
            <div
              key={i}
              className="rounded-lg border p-6 text-center hover:border-[#d4af37]"
            >
              <p className="font-semibold text-black">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
