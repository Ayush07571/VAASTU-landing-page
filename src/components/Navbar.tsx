"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Properties", href: "#properties" },
  { name: "Cities", href: "#cities" },
  { name: "Legacy", href: "#legacy" },
  { name: "Contact", href: "#contact" },
];

import Magnetic from "./Magnetic";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-700",
        scrolled ? "glass-premium py-4" : "bg-linear-to-b from-raat/90 via-raat/40 to-transparent py-10"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="text-xl md:text-3xl font-serif text-accent-text spaced-caps tracking-[0.3em] md:tracking-[0.4em] gold-glow transition-all duration-500 hover:text-sona whitespace-nowrap">
            VAASTU
          </Link>
        </div>

        {/* Center: Desktop Links */}
        <div className="hidden lg:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Magnetic key={link.name} strength={0.2}>
              <Link
                href={link.href}
                className="text-[10px] uppercase tracking-[0.2em] text-accent-text/80 hover:text-sona transition-all duration-300 relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-sona transition-all duration-500 group-hover:w-full" />
              </Link>
            </Magnetic>
          ))}
        </div>

        {/* Right: CTA & Mobile Toggle */}
        <div className="flex-1 flex justify-end items-center space-x-8">
          <div className="hidden lg:block">
            <Magnetic strength={0.3}>
              <Link href="#contact">
                <button className="px-8 py-2.5 border border-sona/30 rounded-full text-sona text-[10px] uppercase tracking-widest hover:bg-sona hover:text-raat transition-all duration-500 shadow-[0_0_15px_rgba(197,151,58,0.1)]">
                  Book a Consultation
                </button>
              </Link>
            </Magnetic>
          </div>

          <button
            className="lg:hidden text-accent-text"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-60 bg-raat flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-8 right-8 text-accent-text"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>

            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-serif text-accent-text hover:text-sona transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + navLinks.length * 0.1 }}
                  className="mt-8 px-10 py-4 border border-sona rounded-full text-sona uppercase tracking-widest"
                >
                  Book a Consultation
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
