"use client";

const items = [
  "PENTHOUSES",
  "FARMHOUSES",
  "SEA-FACING VILLAS",
  "SKY SUITES",
  "HERITAGE BUNGALOWS",
  "LUXURY APARTMENTS",
  "HILLTOP ESTATES",
];

export default function Marquee() {
  return (
    <section className="bg-raat py-8 border-y border-sona/10 overflow-hidden relative">
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
        {/* Repeat twice for seamless scroll */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex shrink-0">
            {items.map((item, index) => (
              <span
                key={index}
                className="text-sona text-sm md:text-lg font-sans tracking-[0.4em] mx-12 uppercase flex items-center"
              >
                {item}
                <span className="ml-24 h-1 w-1 bg-sona rounded-full" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
