import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Tours from '@/components/Tours';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Destinations from '@/components/Destinations';
import Statistics from '@/components/Statistics';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-[#04150d] min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Tours />
      <Gallery />
      <Testimonials />
      <Destinations />
      <Statistics />
      <Contact />
      <Footer />
    </main>
  );
}
