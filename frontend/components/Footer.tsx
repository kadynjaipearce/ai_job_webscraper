"use client";

import Link from "next/link";
import { ArrowRight, Github, Twitter } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export function Footer() {
  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-900">
      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/20 rounded-full blur-[128px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to stop being unemployed?
          </h2>
          <p className="text-lg text-zinc-400 mb-8">
            Sign up for free. No credit card required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <SignedOut>
              <Link
                href="/sign-up"
                className="group flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-violet-500/25"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/sign-in"
                className="px-8 py-4 text-zinc-400 hover:text-white font-semibold transition"
              >
                Sign In
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="group flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-violet-500/25"
              >
                Go to Dashboard
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link
                href="/"
                className="text-xl font-bold tracking-tight text-white"
              >
                please<span className="text-violet-400">hire</span>me
              </Link>
              <p className="mt-4 text-zinc-500 max-w-sm">
                Your AI job-hunting sidekick. We do the work, you get the offers.
                Built for people who are tired of applying manually.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#features"
                    className="text-zinc-500 hover:text-white transition"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-zinc-500 hover:text-white transition"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Account</h3>
              <ul className="space-y-3">
                <SignedOut>
                  <li>
                    <Link
                      href="/sign-in"
                      className="text-zinc-500 hover:text-white transition"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sign-up"
                      className="text-zinc-500 hover:text-white transition"
                    >
                      Sign Up
                    </Link>
                  </li>
                </SignedOut>
                <SignedIn>
                  <li>
                    <Link
                      href="/dashboard"
                      className="text-zinc-500 hover:text-white transition"
                    >
                      Dashboard
                    </Link>
                  </li>
                </SignedIn>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-600 text-sm">
              © 2025 pleasehireme. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-zinc-600 hover:text-zinc-400 text-sm transition"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-zinc-600 hover:text-zinc-400 text-sm transition"
              >
                Terms
              </Link>
              <div className="flex items-center gap-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-zinc-400 transition"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-zinc-400 transition"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
