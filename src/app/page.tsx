import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import Hairtypes from '@/components/Hairtypes';
import StylistCTA from '@/components/StylistCTA';
import Testimonials from '@/components/Testimonials';


export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Hairtypes />
      <StylistCTA />
      <Testimonials />
    </>
  );
}
