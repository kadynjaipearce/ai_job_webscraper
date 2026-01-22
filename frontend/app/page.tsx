<<<<<<< HEAD
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
=======
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-4 text-center px-8">
        <h1 className="text-6xl font-bold text-black dark:text-zinc-50">
          🚧 Work in Progress 🚧
        </h1>
        <p className="text-2xl text-zinc-600 dark:text-zinc-400">
          Why are you looking?
        </p>
        <p className="text-lg text-zinc-500 dark:text-zinc-500 mt-4">
          Nothing to see here... yet 👀
        </p>
>>>>>>> main
      </main>
      <Footer />
    </div>
  );
}
