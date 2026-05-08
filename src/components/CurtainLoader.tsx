"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function CurtainLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
