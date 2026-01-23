"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Zap, Target, Bot } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-zinc-950 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-600/30 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-fuchsia-600/20 rounded-full blur-[128px]" />
        <div className="absolute -bottom-20 right-1/3 w-72 h-72 bg-indigo-600/20 rounded-full blur-[128px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
              </span>
              <span className="text-sm font-medium text-violet-300">
                AI-Powered Job Hunting
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] max-w-5xl"
          >
            Stop applying manually{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400">
              like a peasant
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed"
          >
            All-in-one AI agent for sourcing, matching, and auto-applying to
            roles you love. From finding openings to hitting submit, we&apos;ve got
            your back.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <SignedOut>
              <Link
                href="/sign-up"
                className="group flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-violet-500/25"
              >
                Get Started Free
                <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
              </Link>
              <Link
                href="/sign-in"
                className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold px-8 py-4 rounded-xl border border-zinc-800 transition"
              >
                Sign In
                <ArrowRight className="h-5 w-5" />
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
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-8 sm:gap-16"
          >
            {[
              { value: "10x", label: "Faster Applications" },
              { value: "95%", label: "Match Accuracy" },
              { value: "24/7", label: "Auto-Hunting" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-20 w-full max-w-5xl"
          >
            <div className="relative rounded-2xl bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 border border-zinc-800 p-1">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-violet-600/20 rounded-2xl blur-xl opacity-50" />

              <div className="relative rounded-xl bg-zinc-900 p-4 sm:p-6">
                {/* Window controls */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="ml-4 flex-1 h-6 rounded-lg bg-zinc-800 max-w-xs" />
                </div>

                {/* Content */}
                <div className="grid gap-4 md:grid-cols-[1.5fr,1fr]">
                  {/* Job matches */}
                  <div className="rounded-xl bg-zinc-800/50 border border-zinc-700/50 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-zinc-300">
                        Top Matches
                      </span>
                      <span className="text-xs text-zinc-500">Today</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        {
                          title: "Senior Rust Engineer",
                          company: "Stripe",
                          match: 95,
                        },
                        {
                          title: "Full Stack Developer",
                          company: "Vercel",
                          match: 88,
                        },
                        {
                          title: "Backend Engineer",
                          company: "Linear",
                          match: 82,
                        },
                      ].map((job, i) => (
                        <motion.div
                          key={job.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                          className="flex items-center justify-between p-3 rounded-lg bg-zinc-800 border border-zinc-700/50"
                        >
                          <div>
                            <p className="font-medium text-white text-sm">
                              {job.title}
                            </p>
                            <p className="text-xs text-zinc-500">{job.company}</p>
                          </div>
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                              job.match >= 90
                                ? "bg-emerald-500/20 text-emerald-400"
                                : job.match >= 85
                                ? "bg-violet-500/20 text-violet-400"
                                : "bg-amber-500/20 text-amber-400"
                            }`}
                          >
                            {job.match}%
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Stats panel */}
                  <div className="space-y-4">
                    <div className="rounded-xl bg-zinc-800/50 border border-zinc-700/50 p-4">
                      <div className="text-sm font-medium text-zinc-300 mb-3">
                        This Week
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { icon: Target, value: "55", label: "Matches" },
                          { icon: Zap, value: "12", label: "Applied" },
                        ].map((stat) => (
                          <div
                            key={stat.label}
                            className="p-3 rounded-lg bg-zinc-800 border border-zinc-700/50"
                          >
                            <stat.icon className="h-4 w-4 text-violet-400 mb-2" />
                            <p className="text-xl font-bold text-white">
                              {stat.value}
                            </p>
                            <p className="text-xs text-zinc-500">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-violet-500/20 p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-violet-500/20">
                          <Bot className="h-5 w-5 text-violet-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            AI Active
                          </p>
                          <p className="text-xs text-zinc-400">
                            Hunting for jobs...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
