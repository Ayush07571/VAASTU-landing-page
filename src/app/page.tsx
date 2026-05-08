import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import FeaturedSlider from "@/components/FeaturedSlider";
import BentoGrid from "@/components/BentoGrid";
import IndiaMap from "@/components/IndiaMap";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-raat">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <FeaturedSlider />
      <BentoGrid />
      <IndiaMap />
      <Features />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
