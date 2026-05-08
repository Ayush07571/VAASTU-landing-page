"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { ArrowLeft, MapPin, Maximize, BedDouble, Bath, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";
import { properties } from "@/constants/properties";
import { useParams } from "next/navigation";

export default function PropertyPage() {
  const params = useParams();
  const id = params.id as string;
  
  const property = properties.find(p => p.id === id) || properties[0];

  return (
    <main className="bg-raat min-h-screen text-accent-text">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-raat via-transparent to-transparent" />
        
        <div className="absolute bottom-12 left-0 w-full">
          <div className="container mx-auto px-6 md:px-12">
            <Link href="/" className="flex items-center text-sona text-xs uppercase tracking-widest mb-8 hover:translate-x-[-10px] transition-transform">
              <ArrowLeft size={16} className="mr-2" /> Back to Collection
            </Link>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-serif mb-4"
            >
              {property.name}
            </motion.h1>
            <div className="flex items-center text-sona/60 uppercase tracking-[0.2em] text-xs">
              <MapPin size={14} className="mr-2" /> {property.location} · {property.type}
            </div>
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="py-24 border-b border-sona/10">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-sona text-xs uppercase tracking-[0.4em] mb-8">Description</h2>
            <p className="text-xl md:text-2xl font-serif leading-relaxed mb-12 opacity-80">
              {property.description}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-white/5">
              <div className="flex flex-col">
                <BedDouble className="text-sona mb-4" size={24} />
                <span className="text-2xl font-serif">{property.beds}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-40">Bedrooms</span>
              </div>
              <div className="flex flex-col">
                <Bath className="text-sona mb-4" size={24} />
                <span className="text-2xl font-serif">{property.baths}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-40">Bathrooms</span>
              </div>
              <div className="flex flex-col">
                <Maximize className="text-sona mb-4" size={24} />
                <span className="text-2xl font-serif">{property.sqft}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-40">Sq. Ft.</span>
              </div>
              <div className="flex flex-col">
                <ShieldCheck className="text-sona mb-4" size={24} />
                <span className="text-2xl font-serif">Vastu</span>
                <span className="text-[10px] uppercase tracking-widest opacity-40">Verified</span>
              </div>
            </div>
          </div>
          
          <div className="bg-charcoal/30 p-12 rounded-sm border border-sona/10 h-fit">
            <h3 className="text-2xl font-serif mb-8">Request Access</h3>
            <p className="text-sm opacity-60 mb-8">This property is part of our private collection. Please submit your credentials for a private viewing.</p>
            <form 
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                const btn = e.currentTarget.querySelector('button');
                if (btn) {
                  const originalText = btn.innerText;
                  btn.innerText = "ACCESS REQUESTED";
                  btn.style.backgroundColor = "#4ade80"; // Green
                  btn.style.color = "#0A0A08";
                  setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = "";
                    btn.style.color = "";
                  }, 3000);
                }
              }}
            >
              <input type="text" required placeholder="Full Name" className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-sona transition-all" />
              <input type="email" required placeholder="Email Address" className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-sona transition-all" />
              <Magnetic>
                <button type="submit" className="w-full py-5 bg-sona text-raat uppercase tracking-widest text-xs font-bold hover:bg-sona/80 transition-all">
                  Request Viewing
                </button>
              </Magnetic>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
