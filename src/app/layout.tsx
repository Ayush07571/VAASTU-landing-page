import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VAASTU | India's Finest Luxury Real Estate Experience",
  description: "Discover a curated portfolio of India's most exclusive residences. From Mumbai's soaring penthouses to Goa's heritage estates, VAASTU aligns luxury with architectural excellence and spiritual harmony.",
  keywords: ["Luxury Real Estate India", "Vastu Shastra", "High-end Homes", "Mumbai Penthouses", "Delhi Farmhouses", "Premium Property India"],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

import SmoothScroll from "@/components/SmoothScroll";
import CurtainLoader from "@/components/CurtainLoader";
import CustomCursor from "@/components/CustomCursor";
import AudioPlayer from "@/components/AudioPlayer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="antialiased bg-raat text-accent-text cursor-none overflow-x-hidden">
        <CustomCursor />
        <AudioPlayer />
        <CurtainLoader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
