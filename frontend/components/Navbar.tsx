"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // On mobile, always keep it scrolled. On desktop, check scroll position
          if (window.innerWidth < 768) {
            setIsScrolled(true);
          } else {
            setIsScrolled(window.scrollY > 10);
          }
          ticking = false;
        });
        ticking = true;
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
      <div className="mx-auto px-4 pt-4 pb-2">
        <div
          className={`mx-auto flex items-center justify-between border border-slate-200 will-change-[max-width,border-radius,border-color,background-color,padding] transition-[max-width,border-radius,border-color,background-color,padding,backdrop-filter] duration-500 ease-out ${
            isScrolled
              ? "max-w-2xl rounded-full border-slate-200 bg-white/10 px-6 py-3 backdrop-blur-md"
              : "max-w-4xl rounded-none border-transparent bg-white/80 backdrop-blur-md md:bg-white/5 md:backdrop-blur-sm"
          }`}
        >
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl text-white shadow-md transition-all duration-500 ease-out ${
                  isScrolled
                    ? "bg-neutral-950/0 shadow-neutral-950/0"
                    : "bg-neutral-950 shadow-neutral-950/15"
                }`}
              >
                <Image
                  src="/icon.svg"
                  alt="pleasehireme"
                  width={24}
                  height={24}
                  className="h-4 w-4 hidden md:block"
                />
              </div>
            </Link>
            <span className="text-xs md:text-base font-semibold tracking-tight text-neutral-950">
              pleasehireme
            </span>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-800 md:flex">
            <Link href="#features" className="transition hover:text-slate-950">
              Home
            </Link>
            <Link href="#features" className="transition hover:text-slate-950">
              Features
            </Link>
            <Link href="#pricing" className="transition hover:text-slate-950">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-neutral-950/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:cursor-pointer">
              Get started
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
