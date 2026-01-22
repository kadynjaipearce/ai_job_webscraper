"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsScrolled(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      if (window.innerWidth < 768) {
        setIsScrolled(true);
      } else {
        setIsScrolled(window.scrollY > 10);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full md:sticky"
      style={{ WebkitTransform: "translateZ(0)" }}
    >
      <div className="mx-auto px-3 pt-3 pb-2 md:px-4 md:pt-4">
        <div
          className={`mx-auto flex items-center justify-between border border-slate-200 will-change-[max-width,border-radius,border-color,background-color,padding] transition-[max-width,border-radius,border-color,background-color,padding,backdrop-filter] duration-500 ease-out ${
            isScrolled
              ? "max-w-3xl rounded-full border-slate-200 px-4 py-2 backdrop-blur-md md:px-6 md:py-3"
              : "max-w-6xl rounded-none border-transparent px-4 py-2 backdrop-blur-md md:px-6 md:py-3 md:backdrop-blur-sm"
          }`}
        >
          <div className="flex items-center gap-1.5 md:gap-2">
            <Link href="/" className="flex items-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl text-white transition-all duration-500 ease-out md:h-8 md:w-8">
                <Image
                  src="/icon.svg"
                  alt="pleasehireme"
                  width={24}
                  height={24}
                  className="h-5 w-5 md:h-6 md:w-6"
                />
              </div>
            </Link>
            <span className="text-xs font-semibold tracking-tight text-neutral-950 md:text-base">
              pleasehireme.app
            </span>
          </div>

          <nav className="hidden items-center gap-4 text-sm font-semibold text-slate-800 md:flex">
            <Link
              href="#features"
              className="rounded-full border border-transparent px-4 py-2 transition hover:border-slate-300 hover:bg-white/50 hover:backdrop-blur-sm hover:text-slate-950"
            >
              Home
            </Link>
            <Link
              href="#features"
              className="rounded-full border border-transparent px-4 py-2 transition hover:border-slate-300 hover:bg-white/50 hover:backdrop-blur-sm hover:text-slate-950"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="rounded-full border border-transparent px-4 py-2 transition hover:border-slate-300 hover:bg-white/50 hover:backdrop-blur-sm hover:text-slate-950"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center gap-1.5 rounded-full bg-neutral-950 px-3 py-1.5 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:cursor-pointer md:gap-2 md:px-5 md:py-2.5 md:text-sm">
                  <span className="hidden sm:inline">Stop Being Unemployed</span>
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
