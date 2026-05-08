"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LegalPage() {
  return (
    <main className="bg-raat min-h-screen text-accent-text">
      <Navbar />
      <section className="py-44 container mx-auto px-6 md:px-12">
        <h1 className="text-5xl md:text-7xl font-serif mb-12">Legal Information</h1>
        <div className="max-w-3xl space-y-12 opacity-80 leading-relaxed">
          <div>
            <h2 className="text-2xl font-serif text-sona mb-4">Privacy Policy</h2>
            <p>Your privacy is of the utmost importance to VAASTU. We collect and manage your data with the same precision and integrity we apply to our properties. We do not share your information with third parties without your explicit consent.</p>
          </div>
          <div>
            <h2 className="text-2xl font-serif text-sona mb-4">Terms of Service</h2>
            <p>By accessing our private collection, you agree to the confidentiality standards of the VAASTU network. All property data is for informational purposes and subject to verification through our concierge.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
