"use client";

import Link from "next/link";
import { Globe, Send, Briefcase, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-raat pt-24 pb-12 border-t border-sona/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center mb-24">
          <Link href="#hero" className="group inline-block relative z-50 cursor-pointer">
            <h2 className="text-4xl md:text-6xl font-serif text-accent-text spaced-caps mb-6 transition-all duration-500 group-hover:text-sona whitespace-nowrap tracking-[0.3em] md:tracking-[0.4em]">
              VAASTU
            </h2>
            <p className="italic-serif text-sona text-lg opacity-80 group-hover:opacity-100 transition-opacity">
              Spaces Aligned With Your Destiny
            </p>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/5 pt-16">
          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-sona text-xs uppercase tracking-widest mb-8 font-bold">Quick Links</h4>
            <div className="flex flex-col space-y-4 items-center md:items-start text-[10px] uppercase tracking-widest text-accent-text/60">
              <Link href="#properties" className="hover:text-sona transition-colors">Featured Properties</Link>
              <Link href="#legacy" className="hover:text-sona transition-colors">Our Legacy</Link>
              <Link href="#cities" className="hover:text-sona transition-colors">Global Presence</Link>
              <Link href="#contact" className="hover:text-sona transition-colors">Contact Us</Link>
            </div>
          </div>

          {/* Cities */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-sona text-xs uppercase tracking-widest mb-8 font-bold">Key Cities</h4>
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-[10px] uppercase tracking-widest text-accent-text/60">
              <Link href="#cities" className="hover:text-sona transition-colors cursor-pointer">Mumbai</Link>
              <Link href="#cities" className="hover:text-sona transition-colors cursor-pointer">New Delhi</Link>
              <Link href="#cities" className="hover:text-sona transition-colors cursor-pointer">Goa</Link>
              <Link href="#cities" className="hover:text-sona transition-colors cursor-pointer">Hyderabad</Link>
              <Link href="#cities" className="hover:text-sona transition-colors cursor-pointer">Bangalore</Link>
              <Link href="#cities" className="hover:text-sona transition-colors cursor-pointer">Jaipur</Link>
            </div>
          </div>

          {/* Connect */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-sona text-xs uppercase tracking-widest mb-8 font-bold">Connect</h4>
            <div className="flex space-x-6 mb-8 text-accent-text/60">
              <Globe size={20} className="hover:text-sona cursor-pointer transition-colors" />
              <Send size={20} className="hover:text-sona cursor-pointer transition-colors" />
              <Briefcase size={20} className="hover:text-sona cursor-pointer transition-colors" />
              <MessageSquare size={20} className="hover:text-sona cursor-pointer transition-colors" />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-accent-text/30 text-center md:text-left leading-relaxed">
              Sign up for our newsletter to receive curated property collections monthly.
            </p>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-accent-text/30">
          <p>© 2024 VAASTU. All Rights Reserved.</p>
          <p>Crafted With Precision In India</p>
          <div className="flex space-x-8">
            <Link href="/legal" className="hover:text-accent-text transition-colors cursor-pointer">Privacy Policy</Link>
            <Link href="/legal" className="hover:text-accent-text transition-colors cursor-pointer">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
