"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "VAASTU didn't just find us a flat in Mumbai — they found us a home that felt like it was waiting for us.",
    author: "Rajeev & Priya Malhotra",
    location: "Worli, Mumbai",
  },
  {
    quote: "The attention to detail, the understanding of Vastu, the seamless process — nothing else comes close.",
    author: "Ananya Krishnan",
    location: "Jubilee Hills, Hyderabad",
  },
  {
    quote: "We've bought three properties through VAASTU. There is simply no other way to buy luxury real estate in India.",
    author: "Vikram Singhania",
    location: "Chattarpur, Delhi",
  },
  {
    quote: "From our first call to getting the keys, it felt like being taken care of by family. Extraordinary.",
    author: "Meera & Aditya Sharma",
    location: "Assagao, Goa",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [current, isPaused]);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section 
      className="bg-cream py-24 md:py-44 overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-6 md:px-12 text-center">
        <div className="flex justify-center mb-12">
          <Quote size={60} className="text-sona opacity-20" />
        </div>

        <div className="max-w-5xl mx-auto relative h-[400px] md:h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <h3 className="text-3xl md:text-5xl font-serif text-dark-text leading-tight mb-12 italic">
                &quot;{testimonials[current].quote}&quot;
              </h3>
              <div>
                <p className="text-sona text-sm uppercase tracking-widest font-bold mb-1">
                  {testimonials[current].author}
                </p>
                <p className="text-dark-text/40 text-[10px] uppercase tracking-widest">
                  {testimonials[current].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center space-x-12 mt-12">
          <button
            onClick={prev}
            className="w-12 h-12 border border-sona/20 rounded-full flex items-center justify-center text-sona hover:bg-sona hover:text-raat transition-all duration-500"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex space-x-3">
             {testimonials.map((_, i) => (
               <div 
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  current === i ? "bg-sona scale-150" : "bg-sona/20"
                }`}
               />
             ))}
          </div>

          <button
            onClick={next}
            className="w-12 h-12 border border-sona/20 rounded-full flex items-center justify-center text-sona hover:bg-sona hover:text-raat transition-all duration-500"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
