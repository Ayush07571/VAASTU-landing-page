"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

function Counter({ value, suffix = "", delay = 0 }: { value: number; suffix?: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const start = 0;
          const end = value;
          const duration = 2000;
          let startTime: number | null = null;

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * (end - start) + start));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          
          setTimeout(() => {
            window.requestAnimationFrame(step);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, delay]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="about" className="bg-cream py-24 md:py-44 text-dark-text overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left: Image Collage */}
        <div className="relative h-[600px] md:h-[800px]">
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-0 left-0 w-3/4 h-[500px] border-12 border-white shadow-2xl rounded-sm overflow-hidden z-10"
          >
            <Image
              src="/images/about-1.png"
              alt="Legacy Interior"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div 
            style={{ y: y2 }}
            className="absolute bottom-0 right-0 w-3/4 h-[500px] border-12 border-white shadow-2xl rounded-sm overflow-hidden z-0"
          >
            <Image
              src="/images/about-2.png"
              alt="Heritage Courtyard"
              fill
              className="object-cover"
            />
          </motion.div>
          
          {/* Subtle Mandala Decor */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-sona animate-spin-slow">
               <path d="M50 0L55 45L100 50L55 55L50 100L45 55L0 50L45 45Z" />
            </svg>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="flex flex-col">
          <motion.span 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-sona text-xs uppercase tracking-[0.4em] mb-8 font-bold"
          >
            OUR PHILOSOPHY
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-serif leading-tight mb-10"
          >
            Not Just Homes. <br />
            <span className="italic">A Statement of Who You Are.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-dark-text/70 text-lg md:text-xl leading-relaxed mb-12 max-w-xl font-light"
          >
            At VAASTU, we believe every space carries an energy — a destiny. Rooted in the ancient wisdom of Vastu Shastra and refined by decades of crafting India&apos;s most coveted addresses, we don&apos;t just sell property. We align you with the space that was always meant to be yours.
          </motion.p>

          {/* Animated Counters */}
          <div className="grid grid-cols-2 gap-8 md:gap-12">
            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-serif text-sona mb-2">
                <Counter value={3200} suffix=" Cr+" />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-dark-text/50">Portfolio Value</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-serif text-sona mb-2">
                <Counter value={600} suffix="+" delay={200} />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-dark-text/50">Properties Delivered</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-serif text-sona mb-2">
                <Counter value={22} delay={400} />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-dark-text/50">Cities Across India</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-serif text-sona mb-2">
                <Counter value={98} suffix="%" delay={600} />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-dark-text/50">Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Divider */}
      <div className="container mx-auto px-6 md:px-12 mt-24">
        <div className="h-px w-full bg-sona/20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cream px-8">
            <svg width="40" height="40" viewBox="0 0 40 40" className="fill-sona">
              <path d="M20 0L22 18L40 20L22 22L20 40L18 22L0 20L18 18Z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
