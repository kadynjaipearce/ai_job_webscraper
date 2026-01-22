import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-sky-100 via-sky-50 to-sky-100 text-neutral-950">
      <div className="absolute left-[-10%] top-0 h-48 w-48 rounded-full bg-white/60 blur-3xl" />
      <div className="absolute right-[-5%] bottom-10 h-48 w-48 rounded-full bg-white/60 blur-3xl" />

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 text-center">
        <div className="flex flex-col gap-3">
          <h3 className="text-4xl font-bold text-neutral-950 sm:text-5xl">
            Ready to stop being unemployed?
          </h3>
          <p className="text-base text-slate-600">
            Sign up for free. No credit card required (yet).
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button className="hover:cursor-pointer flex items-center gap-2 rounded-full bg-neutral-950 px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
            Sign Me Up
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="rounded-3xl border border-white/50 bg-white/80 p-8">
          <div className="grid gap-8 md:grid-cols-[1.5fr,1fr,1fr]">
            <div className="text-left">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 text-white">
                  <Image src="/icon.svg" alt="logo" width={20} height={20} />
                </div>
                <div className="text-lg font-semibold">pleasehireme.app</div>
              </div>
              <p className="mt-4 max-w-sm text-sm text-slate-600">
                Your AI job-hunting sidekick. We do the work, you get the
                offers. Built for people who are tired of applying manually.
              </p>
            </div>

            <div className="text-left text-sm">
              <p className="text-base font-semibold text-slate-800">Pages</p>
              <div className="mt-4 flex flex-col gap-2 text-slate-600">
                <Link href="/" className="transition hover:text-neutral-950">
                  Home
                </Link>
                <a
                  href="#features"
                  className="transition hover:text-neutral-950"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="transition hover:text-neutral-950"
                >
                  Pricing
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 h-px bg-slate-200" />

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <span>© 2026 pleasehireme.app</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
