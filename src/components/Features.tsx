"use client";

import { motion } from "framer-motion";

const features = [
  {
    num: "01",
    title: "Vastu-Verified Properties",
    desc: "Every listing assessed by our in-house Vastu Shastra experts for energy alignment and architectural harmony.",
  },
  {
    num: "02",
    title: "White-Glove Concierge",
    desc: "From site visits to legal due diligence to interior styling — we handle everything, always.",
  },
  {
    num: "03",
    title: "Pan-India Reach",
    desc: "22 cities, one standard of excellence. Whether Mumbai or Mysore, VAASTU delivers without compromise.",
  },
  {
    num: "04",
    title: "Legacy of Trust",
    desc: "Two decades. 500+ families. ₹3200 Crores of real estate crafted with integrity and intention.",
  },
];

export default function Features() {
  return (
    <section id="legacy" className="bg-raat py-24 md:py-44 overflow-hidden border-y border-sona/5">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {features.map((f) => (
            <motion.div
              key={f.num}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="relative mb-8">
                <span className="text-6xl md:text-8xl font-serif text-sona/10 transition-colors duration-500 group-hover:text-sona/20">
                  {f.num}
                </span>
                <div className="absolute bottom-4 left-0 w-full h-px bg-sona/20 transition-all duration-700 group-hover:bg-sona/60 group-hover:scale-x-110 origin-left" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif text-accent-text mb-6">
                {f.title}
              </h3>
              <p className="text-accent-text/60 leading-relaxed text-sm md:text-base font-light">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
