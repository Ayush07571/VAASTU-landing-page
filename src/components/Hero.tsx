"use client";

import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import ParallaxImage from "@/components/ParallaxImage";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center">
      {/* Cinematic Typography Mask (Background) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none z-0">
        <h2 className="text-[30vw] font-serif spaced-caps whitespace-nowrap leading-none text-transparent bg-clip-text bg-[url('/images/slide-1.png')] bg-fixed bg-cover bg-center animate-pulse">
          VAASTU
        </h2>
      </div>

      {/* Background for Mobile/Tablet */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/images/slide-1.png"
          alt="Luxury Architecture"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-raat via-raat/40 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
        {/* Left Column: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.5 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left pt-20 lg:pt-0"
        >
          <span className="text-sona text-[10px] md:text-xs uppercase tracking-[0.4em] mb-6 gold-glow">
            EST. 2004 · INDIA&apos;S FINEST
          </span>
          <h1 className="text-6xl md:text-8xl xl:text-9xl font-serif text-accent-text leading-[0.9] mb-8">
            <span className="block italic font-light opacity-80">Spaces</span>
            <span className="block gold-foil-text">Aligned With</span>
            <span className="block italic opacity-80">Your Destiny.</span>
          </h1>
          <p className="text-cream/60 italic-serif text-lg md:text-xl mb-12 max-w-lg">
            From Mumbai to Goa. From Delhi to Hyderabad. Curated addresses for those who have arrived.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Magnetic>
              <Link href="#properties" className="w-full sm:w-auto">
                <button className="w-full px-12 py-5 bg-sona text-raat uppercase tracking-widest text-xs font-bold hover:bg-sona/80 transition-all duration-500 rounded-sm shadow-xl">
                  Explore Properties
                </button>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="#about" className="w-full sm:w-auto">
                <button className="w-full px-12 py-5 border border-sona/30 text-sona uppercase tracking-widest text-xs hover:bg-sona hover:text-raat transition-all duration-500 rounded-sm">
                  Our Story
                </button>
              </Link>
            </Magnetic>
          </div>
        </motion.div>

        {/* Right Column: Hero Image with Parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
          className="hidden lg:block relative h-[85vh] w-full rounded-sm overflow-hidden"
        >
          <ParallaxImage 
            src="/images/hero.png"
            alt="VAASTU Luxury Real Estate"
            className="w-full h-full"
            strength={100}
            priority={true}
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-sona/20" />
          <div className="absolute inset-0 bg-linear-to-t from-raat/40 to-transparent" />
        </motion.div>
      </div>

      {/* Bottom Bar Stats */}
      <div className="absolute bottom-0 left-0 w-full bg-charcoal/80 backdrop-blur-sm py-6 border-t border-sona/10 z-20 hidden md:block">
        <div className="container mx-auto px-12 flex justify-between items-center text-[10px] md:text-xs uppercase tracking-[0.2em] text-accent-text/60">
          <div className="flex items-center space-x-2">
            <span className="text-sona">₹3200 Cr+</span>
            <span>Portfolio</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sona">500+</span>
            <span>Properties</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sona">22</span>
            <span>Cities Across India</span>
          </div>
        </div>
      </div>

      {/* Vertical Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-24 lg:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 z-20"
      >
        <div className="w-px h-12 bg-linear-to-b from-sona to-transparent" />
      </motion.div>
    </section>
  );
}
