import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import GamePreview from "@/components/landing/GamePreview";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <GamePreview />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}