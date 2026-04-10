import Link from "next/link";

const collections = [
  {
    title: "Students",
    subtitle: "Affordable installs that still look polished.",
    image: "https://i.pinimg.com/736x/9f/44/b1/9f44b193af713506c02c5ac9cf58a47a.jpg",
    href: "/shop?category=Students",
  },
  {
    title: "Brides",
    subtitle: "Soft texture and ceremony-ready volume.",
    image: "https://i.pinimg.com/1200x/35/10/57/35105799ef4c4d7f0b8d7aca2c61e011.jpg",
    href: "/shop?category=Brides",
  },
  {
    title: "Working-Class",
    subtitle: "Clean finishes that hold up during busy weeks.",
    image: "https://i.pinimg.com/736x/0a/de/79/0ade7978a78e1880decc809bdd382f60.jpg",
    href: "/shop?category=Working-Class",
  },
  {
    title: "Luxury",
    subtitle: "Full donor bundles with a premium fall.",
    image: "https://i.pinimg.com/736x/8c/67/40/8c67403f44353e0c58f0874eaddf6912.jpg",
    href: "/shop?category=Luxury",
  },
];

const hairTypes = [
  {
    title: "Blend",
    subtitle: "Budget-conscious texture for daily wear.",
    href: "/shop?hairType=Blend",
  },
  {
    title: "Human Hair",
    subtitle: "Soft movement and easy styling flexibility.",
    href: "/shop?hairType=Human%20Hair",
  },
  {
    title: "Bone Straight",
    subtitle: "Sharp finish with sleek length.",
    href: "/shop?hairType=Bone%20Straight",
  },
  {
    title: "Raw Donor",
    subtitle: "Highest-end fullness and longevity.",
    href: "/shop?hairType=Raw%20Donor",
  },
];

export default function Categories() {
  return (
    <section className="px-6 py-10 md:py-14">
      <div className="mx-auto max-w-7xl space-y-14">
        <div className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">Curated Entry Points</p>
          <h2 className="text-3xl font-bold md:text-4xl">Start from the collection that fits your life.</h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
            Whether you are buying for campus, bridal glam, office polish, or luxury styling, the shop is grouped to help people find their lane faster.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {collections.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0d0d0d] shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">Collection</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-300">{item.subtitle}</p>
                <span className="mt-5 inline-flex rounded-full border border-[#d4af37] px-4 py-2 text-sm font-semibold text-[#d4af37] transition group-hover:bg-[#d4af37] group-hover:text-black">
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">Hair Types</p>
              <h3 className="mt-3 text-3xl font-bold">Filter by finish, not just by price.</h3>
            </div>
            <Link
              href="/shop"
              className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#d4af37] hover:text-[#d4af37]"
            >
              View full shop
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {hairTypes.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-[1.5rem] border border-white/10 bg-black/40 p-5 transition hover:border-[#d4af37]/45 hover:bg-black/60"
              >
                <h4 className="text-xl font-semibold text-white">{item.title}</h4>
                <p className="mt-2 text-sm leading-6 text-gray-300">{item.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
