"use client";

import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Aisha O.",
    role: "Bride",
    message:
      "Queen’s Bliss hair made my wedding day perfect. The quality was premium and the styling was flawless.",
  },
  {
    name: "Blessing K.",
    role: "Working Class",
    message:
      "I love how natural the hair feels. I’ve worn mine for months and it still looks brand new.",
  },
  {
    name: "Maryam S.",
    role: "Stylist",
    message:
      "As a stylist, Queen’s Bliss is my go-to brand. Clients always ask where the hair is from.",
  },
  {
    name: "Jennifer A.",
    role: "Luxury Client",
    message:
      "The raw donor hair is unmatched. Soft, full, and worth every naira.",
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
    <section className="bg-black py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-10 text-3xl md:text-4xl font-bold text-white">
          What Our Clients Say
        </h2>

        <div
          key={index}
          className="transition-opacity duration-700 ease-in-out"
        >
          <p className="mb-6 text-xl text-gray-300 italic">
            “{testimonial.message}”
          </p>

          <p className="font-semibold text-[#d4af37]">
            {testimonial.name}
          </p>
          <p className="text-sm text-gray-400">
            {testimonial.role}
          </p>
        </div>
      </div>
    </section>
  );
}
