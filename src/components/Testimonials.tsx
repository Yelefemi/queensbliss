"use client";

import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Aisha O.",
    role: "Bride",
    message:
      "Queen Bliss hair made my wedding morning feel effortless. The texture, fullness, and finish all felt premium.",
  },
  {
    name: "Blessing K.",
    role: "Working-Class Client",
    message:
      "My wig still looks polished after months. It gives me that neat, put-together look every work week.",
  },
  {
    name: "Maryam S.",
    role: "Stylist",
    message:
      "Clients notice the quality immediately. Queen Bliss is one of the few brands I can install without overexplaining the difference.",
  },
  {
    name: "Jennifer A.",
    role: "Luxury Client",
    message:
      "The raw donor hair is worth it. Full, soft, and easy to refresh with the maintenance line.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[index];

  return (
    <section className="px-6 py-14 md:py-16">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-[0_18px_50px_rgba(0,0,0,0.2)] backdrop-blur-sm md:p-10">
        <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">Client Notes</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">What people say after they wear it.</h2>

        <div key={index} className="mt-10 transition-opacity duration-700 ease-in-out">
          <p className="mx-auto max-w-3xl text-xl leading-9 text-gray-200 md:text-2xl">
            “{testimonial.message}”
          </p>

          <div className="mt-8">
            <p className="text-lg font-semibold text-[#d4af37]">{testimonial.name}</p>
            <p className="text-sm text-gray-400">{testimonial.role}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {testimonials.map((item, itemIndex) => (
            <button
              key={item.name}
              aria-label={`View testimonial ${itemIndex + 1}`}
              onClick={() => setIndex(itemIndex)}
              className={`h-2.5 rounded-full transition ${itemIndex === index ? "w-10 bg-[#d4af37]" : "w-2.5 bg-white/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
