"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function CurtainLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleProgress = (e: any) => {
      const p = e.detail.progress;
      setProgress(Math.round(p));
      if (p >= 100) {
        setTimeout(() => setLoading(false), 500);
      }
    };

    window.addEventListener("vaastuLoadingProgress", handleProgress);

    // Fallback if no frames are found or loading fails
    // Increased to 60s to allow large 3D asset downloads (150MB+) on Vercel
    const timer = setTimeout(() => {
      setLoading(false);
    }, 60000);

    return () => {
      window.removeEventListener("vaastuLoadingProgress", handleProgress);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center pointer-events-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Left Curtain */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-raat"
            initial={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          />
          {/* Right Curtain */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-raat"
            initial={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          />
          
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl text-sona spaced-caps font-serif whitespace-nowrap tracking-[0.3em] md:tracking-[0.4em]">
              VAASTU
            </h1>
            <p className="mt-4 text-cream italic-serif text-sm md:text-base opacity-70">
              Spaces Aligned With Your Destiny
            </p>

            <div className="mt-16 w-64 md:w-80 flex flex-col items-center">
              {/* Luxury Fact Rotation */}
              <motion.span 
                key={progress < 30 ? 0 : progress < 60 ? 1 : progress < 90 ? 2 : 3}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] uppercase tracking-[0.4em] text-sona/60 mb-6 text-center h-4"
              >
                {progress < 30 ? "Curating India's Finest Addresses" : 
                 progress < 60 ? "Where Vastu meets Visionary Design" : 
                 progress < 90 ? "Crafting Perfection since 2004" : 
                 "Your Legacy Awaits"}
              </motion.span>

              {/* Gold Silk Progress Bar */}
              <div className="relative w-full h-px bg-sona/10 overflow-hidden">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-sona shadow-[0_0_10px_rgba(197,151,58,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                />
              </div>

              <span className="mt-4 text-[10px] font-sans tracking-widest text-sona/40">
                {progress}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
