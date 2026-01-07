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
            Ready to get started
          </h3>
          <p className="text-base text-slate-600">
            Sign-up to pleasehireme for free.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button className="hover:cursor-pointer flex items-center gap-2 rounded-full bg-neutral-950 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-950/20 transition hover:-translate-y-0.5 hover:shadow-xl">
            Try for free
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="rounded-3xl border border-white/50 bg-white/60 p-8 shadow-2xl shadow-neutral-950/10 backdrop-blur-xl">
          <div className="grid gap-8 md:grid-cols-[1.5fr,1fr,1fr]">
            <div className="text-left">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 text-white shadow-md shadow-neutral-950/15">
                  <Image src="/icon.svg" alt="logo" width={20} height={20} />
                </div>
                <div className="text-lg font-semibold">pleasehireme.app</div>
              </div>
              <p className="mt-4 max-w-sm text-sm text-slate-600">
                Your favourite AI job-matching and auto-apply copilot. Built for
                early career engineers and scrappy teams.
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
