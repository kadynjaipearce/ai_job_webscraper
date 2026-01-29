"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/Button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`mx-auto transition-all duration-500 ease-in-out ${
          isScrolled
            ? "max-w-3xl px-3 pt-3"
            : "max-w-7xl px-4 sm:px-6 lg:px-8 pt-5"
        }`}
      >
        <nav
          className={`flex items-center justify-between transition-all duration-500 ease-in-out ${
            isScrolled
              ? "glass-strong rounded-2xl px-4 py-2.5 border-0"
              : "px-5 py-3"
          }`}
        >
          {/* Logo – Space Grotesk */}
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight text-white select-none"
          >
            please<span className="text-indigo-400">hire</span>me
          </Link>

          {/* Center pill – desktop */}
          <div className="hidden md:flex items-center bg-white/10 backdrop-blur-md rounded-xl px-1 py-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-1.5 text-sm font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/[.08] transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2.5">
            <SignedOut>
              <Link href="/sign-up" className="hidden sm:block">
                <Button variant="primary" size="sm">
                  Stop Being Unemployed
                </Button>
              </Link>
              <Link href="/sign-up" className="sm:hidden">
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <Link
                href="/dashboard"
                className="hidden sm:block text-sm font-medium text-slate-400 hover:text-white transition-colors px-3 py-2"
              >
                Dashboard
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 ring-2 ring-indigo-400/40",
                  },
                }}
              />
            </SignedIn>

            <button
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
        >
          <div className="glass-strong p-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[.06] rounded-xl transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 pt-3 border-t border-white/10">
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="block px-4 py-3 text-sm font-medium text-slate-400 hover:text-white rounded-xl text-center transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign in
                </Link>
                <Link href="/sign-up" className="block mt-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">
                    Stop Being Unemployed
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="block" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">
                    Go to Dashboard
                  </Button>
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
