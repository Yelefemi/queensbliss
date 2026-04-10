import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Hairtypes from "@/components/Hairtypes";
import StylistCTA from "@/components/StylistCTA";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.12),_transparent_28%),linear-gradient(180deg,#040404_0%,#0b0b0b_35%,#050505_100%)] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-24 h-80 bg-[radial-gradient(circle,_rgba(212,175,55,0.16),_transparent_60%)] blur-3xl" />
      <Hero />
      <Categories />
      <Hairtypes />
      <StylistCTA />
      <Testimonials />
    </main>
  );
}
