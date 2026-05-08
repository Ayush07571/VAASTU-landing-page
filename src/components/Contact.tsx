"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Contact() {
  return (
    <section id="contact" className="bg-raat overflow-hidden border-t border-sona/5">
      <div className="flex flex-col lg:flex-row min-h-[800px]">
        {/* Left: Image */}
        <div className="relative w-full lg:w-1/2 min-h-[400px]">
          <Image
            src="/images/contact.png"
            alt="VAASTU Consultant Office"
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-raat/20" />
        </div>

        {/* Right: Form */}
        <div className="w-full lg:w-1/2 p-10 md:p-24 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-sona text-xs uppercase tracking-[0.4em] mb-4 block">
              BOOK A CONSULTATION
            </span>
            <h2 className="text-5xl md:text-7xl font-serif text-accent-text mb-12">
              Begin Your <br />
              <span className="italic font-light">Destiny.</span>
            </h2>

            <form 
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                const btn = e.currentTarget.querySelector('button');
                if (btn) {
                  const originalText = btn.innerText;
                  btn.innerText = "S E N T  S U C C E S S F U L L Y";
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col space-y-2 group">
                  <label className="text-[10px] uppercase tracking-widest text-accent-text/40 transition-colors group-focus-within:text-sona">Full Name</label>
                  <input
                    type="text"
                    required
                    className="bg-transparent border-b border-white/10 py-3 outline-none focus:border-sona transition-all text-accent-text"
                    placeholder="Rahul Sharma"
                  />
                </div>
                <div className="flex flex-col space-y-2 group">
                  <label className="text-[10px] uppercase tracking-widest text-accent-text/40 transition-colors group-focus-within:text-sona">Phone Number</label>
                  <input
                    type="tel"
                    required
                    className="bg-transparent border-b border-white/10 py-3 outline-none focus:border-sona transition-all text-accent-text"
                    placeholder="+91 98000 00000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col space-y-2 group">
                  <label className="text-[10px] uppercase tracking-widest text-accent-text/40 transition-colors group-focus-within:text-sona">City of Interest</label>
                  <select className="bg-transparent border-b border-white/10 py-3 outline-none focus:border-sona transition-all text-accent-text appearance-none">
                    <option className="bg-raat">Mumbai</option>
                    <option className="bg-raat">Delhi</option>
                    <option className="bg-raat">Goa</option>
                    <option className="bg-raat">Hyderabad</option>
                    <option className="bg-raat">Bangalore</option>
                    <option className="bg-raat">Jaipur</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-2 group">
                  <label className="text-[10px] uppercase tracking-widest text-accent-text/40 transition-colors group-focus-within:text-sona">Property Type</label>
                  <select className="bg-transparent border-b border-white/10 py-3 outline-none focus:border-sona transition-all text-accent-text appearance-none">
                    <option className="bg-raat">Apartment</option>
                    <option className="bg-raat">Villa</option>
                    <option className="bg-raat">Penthouse</option>
                    <option className="bg-raat">Farmhouse</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-2 group">
                  <label className="text-[10px] uppercase tracking-widest text-accent-text/40 transition-colors group-focus-within:text-sona">Budget Range</label>
                  <select className="bg-transparent border-b border-white/10 py-3 outline-none focus:border-sona transition-all text-accent-text appearance-none">
                    <option className="bg-raat">₹1–3 Cr</option>
                    <option className="bg-raat">₹3–7 Cr</option>
                    <option className="bg-raat">₹7–15 Cr</option>
                    <option className="bg-raat">₹15 Cr+</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col space-y-2 group">
                <label className="text-[10px] uppercase tracking-widest text-accent-text/40 transition-colors group-focus-within:text-sona">Message</label>
                <textarea
                  rows={4}
                  className="bg-transparent border-b border-white/10 py-3 outline-none focus:border-sona transition-all text-accent-text resize-none"
                  placeholder="Tell us about the space you're looking for..."
                />
              </div>

              <button type="submit" className="w-full py-6 bg-sona text-raat uppercase tracking-[0.4em] text-xs font-bold hover:bg-sona/80 transition-all duration-700 mt-8">
                E N Q U I R E  N O W
              </button>
            </form>

            <div className="mt-16 pt-12 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 text-[10px] uppercase tracking-widest text-accent-text/40">
              <p>+91 98000 00000</p>
              <p>hello@vaastu.in</p>
              <p>New Delhi · Mumbai · Bangalore</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
