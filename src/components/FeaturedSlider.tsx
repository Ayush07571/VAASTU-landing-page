"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { properties } from "@/constants/properties";
import Link from "next/link";

export default function FeaturedSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % properties.length);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [current, isPaused]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % properties.length);
  };
  
  const prev = () => {
    setCurrent((prev) => (prev - 1 + properties.length) % properties.length);
  };

  return (
    <section 
      id="properties" 
      className="relative h-screen min-h-[700px] bg-raat overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={properties[current].image}
            alt={properties[current].name}
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-6 md:px-12 h-full relative z-10 flex flex-col justify-center">
        <div className="max-w-4xl">
          <motion.div
            key={`info-${current}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-sona text-xs md:text-sm uppercase tracking-[0.4em] mb-4 block">
              {properties[current].id} / 05 · {properties[current].location}
            </span>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif text-accent-text mb-6 leading-tight">
              {properties[current].name}
            </h2>
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-12 mb-12">
              <span className="text-sona text-2xl md:text-3xl font-serif">{properties[current].price}</span>
              <span className="text-accent-text/60 text-sm md:text-base tracking-widest uppercase">
                {properties[current].details}
              </span>
            </div>
            <Link href={`/property/${properties[current].id}`}>
              <button className="px-12 py-5 bg-sona text-raat uppercase tracking-widest text-xs font-bold hover:bg-sona/80 transition-all">
                View Details
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="absolute bottom-12 left-6 md:left-12 right-6 md:right-12 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            {properties.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 transition-all duration-500 ${
                  current === i ? "w-12 bg-sona" : "w-6 bg-accent-text/20"
                }`}
              />
            ))}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={prev}
              className="w-14 h-14 border border-sona/30 rounded-full flex items-center justify-center text-sona hover:bg-sona hover:text-raat transition-all duration-500"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="w-14 h-14 border border-sona/30 rounded-full flex items-center justify-center text-sona hover:bg-sona hover:text-raat transition-all duration-500"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
