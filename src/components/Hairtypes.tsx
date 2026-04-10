import Link from "next/link";

const occasions = [
  {
    title: "Bridal Bliss",
    description: "Soft volume, flattering shine, and styles that hold through a long event day.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    href: "/shop?category=Brides",
    eyebrow: "Event Ready",
  },
  {
    title: "Campus Queen",
    description: "Easy-going units with a lighter price point and enough polish for classes and outings.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
    href: "/shop?category=Students",
    eyebrow: "Everyday Style",
  },
];

export default function Hairtypes() {
  return (
    <section className="px-6 py-10 md:py-14">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">Featured Looks</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Two signature moods, both styled with intention.</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {occasions.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="text-xs uppercase tracking-[0.35em] text-[#d4af37]">{item.eyebrow}</p>
                <h3 className="mt-3 text-3xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-gray-300">{item.description}</p>
                <span className="mt-6 inline-flex rounded-full bg-[#d4af37] px-5 py-3 text-sm font-bold text-black transition group-hover:bg-white">
                  Shop this mood
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
