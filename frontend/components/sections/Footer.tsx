"use client";

import Link from "next/link";
import { ArrowRight, Github, Twitter } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "../ui/Button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/20 via-transparent to-transparent pointer-events-none" />

      {/* Upper CTA */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to stop being unemployed?
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
            Sign up for free. No credit card required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <SignedOut>
              <Link href="/sign-up">
                <Button variant="primary" size="lg">
                  Sign Me Up
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="primary" size="lg">
                  Go to Dashboard
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Lower info */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
        <div className="border-t border-white/[.06] pt-10">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

            {/* Brand */}
            <div className="text-center md:text-left shrink-0">
              <Link href="/" className="font-display text-lg font-bold tracking-tight text-white">
                please<span className="text-indigo-400">hire</span>me
              </Link>
              <p className="mt-1.5 text-sm text-slate-500">
                Your AI job-hunting sidekick.
              </p>
            </div>

            {/* Links */}
            <nav className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-slate-500 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Social + legal */}
            <div className="flex flex-col items-center md:items-end gap-3">
              <div className="flex items-center gap-3.5">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-400 transition-colors cursor-pointer"
                  aria-label="Twitter"
                >
                  <Twitter className="h-[18px] w-[18px]" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-400 transition-colors cursor-pointer"
                  aria-label="GitHub"
                >
                  <Github className="h-[18px] w-[18px]" />
                </a>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-600">
                <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms</Link>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/[.06] text-center">
            <p className="text-xs text-slate-600">
              &copy; 2026 pleasehireme.app
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
