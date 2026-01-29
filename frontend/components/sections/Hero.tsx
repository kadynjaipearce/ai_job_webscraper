"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";

/* ── Data ──────────────────────────────────────────────── */

const jobMatches = [
  { title: "Senior Rust Engineer", company: "Stripe", location: "Remote", match: 95 },
  { title: "Full Stack Developer", company: "Vercel", location: "San Francisco", match: 88 },
  { title: "Backend Engineer", company: "Linear", location: "Remote", match: 82 },
  { title: "Systems Programmer", company: "Cloudflare", location: "Austin, TX", match: 71 },
];

/* ── Helpers ───────────────────────────────────────────── */

function MatchBar({ percent }: { percent: number }) {
  const color =
    percent >= 80 ? "bg-emerald-400" : percent >= 60 ? "bg-amber-400" : "bg-sky-400";
  const text =
    percent >= 80 ? "text-emerald-400" : percent >= 60 ? "text-amber-400" : "text-sky-400";

  return (
    <div className="flex items-center gap-2 mt-1.5">
      <div className="flex-1 h-1.5 rounded-full bg-white/[.06]">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
        />
      </div>
      <span className={`text-xs font-bold tabular-nums ${text}`}>{percent}%</span>
    </div>
  );
}

function CircularProgress({ percent }: { percent: number }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;

  return (
    <div className="relative w-[88px] h-[88px] shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(99,102,241,0.12)" strokeWidth="5.5" />
        <motion.circle
          cx="40" cy="40" r={r}
          fill="none" stroke="#6366f1" strokeWidth="5.5" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-indigo-400">{percent}%</span>
      </div>
    </div>
  );
}

/* ── Component ─────────────────────────────────────────── */

export function Hero() {
  return (
    <section className="relative min-h-[110vh] flex items-center overflow-hidden bg-slate-900">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-transparent" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-overlay grid-overlay-mask" />

      {/* Glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]">
        <div className="w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-[80px] opacity-[0.15] animate-glow-pulse" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* ── Left column (60%) ───────────────────────── */}
          <div className="flex-[3] text-center lg:text-left max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge color="indigo" className="mb-8">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-400" />
                </span>
                New &mdash; AI-Powered Job Hunting
              </Badge>
            </motion.div>

            {/* Headline – Lora serif */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-[2.5rem] sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
            >
              Stop applying manually{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient">
                like a peasant.
              </span>
            </motion.h1>

            {/* Subheadline – Inter */}
            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              All-in-one AI agent for sourcing, matching, and auto-applying to
              roles&nbsp;you actually want
              <span className="inline-block w-[2px] h-5 bg-indigo-400 ml-1 align-middle animate-cursor" />
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <SignedOut>
                <Link href="/sign-up">
                  <Button variant="primary" size="lg">
                    Let&apos;s Gooo
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="secondary" size="lg">
                    Show Me The Magic
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
            </motion.div>
          </div>

          {/* ── Right column (40%) – War Room ──────────── */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex-[2] w-full max-w-lg lg:max-w-none"
          >
            <Card className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-display text-sm font-semibold text-slate-300 tracking-wide uppercase">
                  Job Command Center
                </span>
                <div className="flex gap-2">
                  <Badge color="emerald" pulse>Matches: 55</Badge>
                  <Badge color="sky" pulse>Sent: 12</Badge>
                </div>
              </div>

              {/* Body */}
              <div className="flex gap-5">
                <div className="flex-1 space-y-2.5 min-w-0">
                  {jobMatches.map((job, i) => (
                    <motion.div
                      key={job.title}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.45 + i * 0.08 }}
                      className="p-3 rounded-xl bg-white/[.04] border border-white/[.06] hover:bg-white/[.07] transition-colors"
                    >
                      <p className="font-medium text-white text-sm truncate">{job.title}</p>
                      <p className="text-xs text-slate-500 truncate">
                        {job.company} &middot; {job.location}
                      </p>
                      <MatchBar percent={job.match} />
                    </motion.div>
                  ))}
                </div>

                <div className="hidden sm:flex flex-col items-center justify-center gap-2">
                  <CircularProgress percent={95} />
                  <span className="text-[11px] font-medium text-slate-500 text-center leading-tight">
                    Resume<br />Match
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
