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
  title: "VAASTU | Spaces Aligned With Your Destiny",
  description: "Ultra-luxury Indian real estate. Penthouses, Farmhouses, and Heritage Bungalows across India's most coveted locations.",
  keywords: ["Luxury Real Estate India", "Vastu Shastra", "High-end Homes", "Mumbai Real Estate", "Delhi Farmhouses"],
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
