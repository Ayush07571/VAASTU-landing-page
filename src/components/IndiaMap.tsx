"use client";

import dynamic from "next/dynamic";

const RealMap = dynamic(() => import("./RealMap"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-charcoal animate-pulse flex items-center justify-center text-sona/20">Initialising Luxury Map...</div>
});

export default function IndiaMap() {
  return (
    <section id="cities" className="bg-raat py-24 md:py-44 overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="max-w-xl text-left">
            <span className="text-sona text-xs md:text-sm uppercase tracking-[0.4em] mb-4 block">
              Global Footprint
            </span>
            <h2 className="text-4xl md:text-7xl font-serif text-accent-text mb-8 leading-tight">
              &quot;From the Hills of <br />
              Chandigarh to the <br />
              Shores of Kochi&quot;
            </h2>
            <p className="text-accent-text/60 text-lg mb-12 leading-relaxed">
              Experience our portfolio through a real-time interactive lens. VAASTU operates across 22 major Indian cities, offering properties that align with architectural excellence and spiritual harmony.
            </p>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-sona text-3xl font-serif">22+</p>
                <p className="text-accent-text/40 text-[10px] uppercase tracking-widest">Cities</p>
              </div>
              <div>
                <p className="text-sona text-3xl font-serif">600+</p>
                <p className="text-accent-text/40 text-[10px] uppercase tracking-widest">Properties</p>
              </div>
              <div>
                <p className="text-sona text-3xl font-serif">₹3200Cr+</p>
                <p className="text-accent-text/40 text-[10px] uppercase tracking-widest">AUM</p>
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-2xl aspect-square bg-charcoal/30 rounded-2xl border border-sona/10 overflow-hidden shadow-3xl">
            {/* The Real Interactive Map */}
            <div className="absolute inset-0">
               <RealMap />
            </div>

            <div className="absolute bottom-6 left-6 bg-raat/80 backdrop-blur-md border border-sona/20 p-4 rounded-sm z-1000 pointer-events-none">
               <p className="text-sona text-[8px] uppercase tracking-widest mb-1">Live Map Protocol</p>
               <p className="text-accent-text/60 text-[10px]">Real-time property alignment active</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-charcoal/20 -skew-x-12 pointer-events-none" />
    </section>
  );
}
