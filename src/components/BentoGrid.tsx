"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { properties as allProperties } from "@/constants/properties";
import ParallaxImage from "./ParallaxImage";
import Magnetic from "./Magnetic";

import Link from "next/link";

const listings = allProperties.map((p, i) => ({
  ...p,
  size: i === 0 ? "large" : "small"
}));

const categories = ["All", "Residential", "Villas", "Penthouses", "Commercial"];

export default function BentoGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" 
    ? listings 
    : listings.filter(l => l.type === activeCategory);

  return (
    <section id="properties" className="bg-raat py-24 md:py-44 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <span className="text-sona text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 block gold-glow">
              CURATED COLLECTION
            </span>
            <h2 className="text-5xl md:text-7xl font-serif text-accent-text gold-foil-text leading-tight">
              Our Finest <br className="hidden md:block" /> Addresses.
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-4 md:gap-12">
            {categories.map((cat) => (
              <Magnetic key={cat} strength={0.15}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] uppercase tracking-[0.2em] transition-all relative pb-2 ${
                    activeCategory === cat ? "text-sona" : "text-accent-text/30 hover:text-accent-text"
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute bottom-0 left-0 w-full h-px bg-sona"
                    />
                  )}
                </button>
              </Magnetic>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[300px] md:auto-rows-[450px]">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`group relative rounded-sm overflow-hidden border border-sona/5 ${
                item.size === "large" ? "lg:col-span-1 lg:row-span-2" : ""
              }`}
            >
              <ParallaxImage 
                src={item.image}
                alt={item.name}
                className="w-full h-full"
                strength={item.size === "large" ? 120 : 60}
              />
              <div className="absolute inset-0 bg-linear-to-t from-raat/95 via-raat/10 to-transparent transition-opacity duration-700" />
              
              <div className="absolute inset-0 border border-sona/0 group-hover:border-sona/30 transition-all duration-700 m-6" />

              <div className="absolute bottom-0 left-0 p-10 w-full z-10">
                <p className="text-sona text-[10px] uppercase tracking-widest mb-3 opacity-60">
                  {item.city} · {item.type}
                </p>
                <h3 className="text-2xl md:text-3xl font-serif text-accent-text mb-4 transition-transform duration-700 group-hover:-translate-y-2">
                  {item.name}
                </h3>
                <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                  <span className="text-sona font-serif text-xl">{item.price}</span>
                  <Magnetic strength={0.2}>
                    <Link href={`/property/${item.id}`}>
                      <button className="flex items-center text-[10px] uppercase tracking-widest text-accent-text hover:text-sona transition-colors">
                        View Property <ArrowUpRight size={14} className="ml-2" />
                      </button>
                    </Link>
                  </Magnetic>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
