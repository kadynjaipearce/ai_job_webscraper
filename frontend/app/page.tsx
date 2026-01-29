import { Navigation } from "../components/sections/Navigation";
import { Hero } from "../components/sections/Hero";
import { Features } from "../components/sections/Features";
import { Pricing } from "../components/sections/Pricing";
import { Footer } from "../components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
