import { Features } from "../components/Features";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { Pricing } from "../components/Pricing";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#bcd7f5]">
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
