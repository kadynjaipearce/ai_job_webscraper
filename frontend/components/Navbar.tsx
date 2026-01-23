"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <nav
          className={`flex items-center justify-between rounded-2xl border px-4 py-3 sm:px-6 transition-all duration-300 ${
            isScrolled
              ? "bg-zinc-950/80 backdrop-blur-xl border-zinc-800"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Brand */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-white"
          >
            please<span className="text-violet-400">hire</span>me
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="#features"
              className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition"
            >
              Pricing
            </Link>
          </div>

          {/* Auth */}
          <div className="flex items-center gap-3">
            <SignedOut>
              <Link
                href="/sign-in"
                className="hidden sm:block px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="group flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition"
              >
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Start</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="hidden sm:block px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition"
              >
                Dashboard
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 ring-2 ring-violet-500/50",
                  },
                }}
              />
            </SignedIn>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-zinc-400 hover:text-white transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 rounded-2xl bg-zinc-900 border border-zinc-800 p-4">
            <div className="flex flex-col gap-1">
              <Link
                href="#features"
                className="px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-xl transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-xl transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <SignedOut>
                <div className="mt-3 pt-3 border-t border-zinc-800 flex flex-col gap-2">
                  <Link
                    href="/sign-in"
                    className="px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-xl transition text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    className="px-4 py-3 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </SignedOut>
              <SignedIn>
                <div className="mt-3 pt-3 border-t border-zinc-800">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-3 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
