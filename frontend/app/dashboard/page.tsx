"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Settings,
  Bell,
  Search,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  Zap,
} from "lucide-react";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-zinc-800" />
          <div className="h-4 w-32 rounded bg-zinc-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/dashboard"
              className="text-xl font-bold tracking-tight text-white"
            >
              please<span className="text-violet-400">hire</span>me
            </Link>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search jobs, applications..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-500 rounded-full" />
              </button>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 ring-2 ring-violet-500/50",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 min-h-[calc(100vh-4rem)] bg-zinc-950 border-r border-zinc-900 p-4">
          <nav className="space-y-1">
            {[
              { icon: LayoutDashboard, label: "Dashboard", active: true },
              { icon: Briefcase, label: "Jobs", active: false },
              { icon: FileText, label: "Applications", active: false },
              { icon: Settings, label: "Settings", active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  item.active
                    ? "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            {/* Welcome */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-2xl lg:text-3xl font-bold text-white">
                Welcome back, {user?.firstName || "there"}!
              </h1>
              <p className="mt-1 text-zinc-500">
                Here&apos;s what&apos;s happening with your job search.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8"
            >
              {[
                {
                  label: "Jobs Matched",
                  value: "0",
                  change: "+0 this week",
                  icon: TrendingUp,
                  color: "violet",
                },
                {
                  label: "Applications Sent",
                  value: "0",
                  change: "+0 this week",
                  icon: CheckCircle2,
                  color: "emerald",
                },
                {
                  label: "Interview Requests",
                  value: "0",
                  change: "+0 this week",
                  icon: Briefcase,
                  color: "amber",
                },
                {
                  label: "Time Saved",
                  value: "0h",
                  change: "This month",
                  icon: Clock,
                  color: "fuchsia",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-zinc-500">{stat.label}</span>
                    <div
                      className={`p-2 rounded-lg ${
                        stat.color === "violet"
                          ? "bg-violet-500/10"
                          : stat.color === "emerald"
                          ? "bg-emerald-500/10"
                          : stat.color === "amber"
                          ? "bg-amber-500/10"
                          : "bg-fuchsia-500/10"
                      }`}
                    >
                      <stat.icon
                        className={`h-4 w-4 ${
                          stat.color === "violet"
                            ? "text-violet-400"
                            : stat.color === "emerald"
                            ? "text-emerald-400"
                            : stat.color === "amber"
                            ? "text-amber-400"
                            : "text-fuchsia-400"
                        }`}
                      />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-zinc-600 mt-1">{stat.change}</p>
                </div>
              ))}
            </motion.div>

            {/* Coming Soon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden"
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-violet-600/20 blur-xl" />

              <div className="relative rounded-2xl bg-zinc-900 border border-zinc-800 p-8 lg:p-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
                  </span>
                  <span className="text-sm font-medium text-violet-300">
                    Coming Soon
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  Your command center is being built
                </h2>
                <p className="text-zinc-400 max-w-lg mx-auto mb-8">
                  We&apos;re working hard to bring you AI-powered job matching,
                  auto-apply features, and real-time application tracking. Stay
                  tuned!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/"
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold text-sm transition"
                  >
                    Explore Features
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm border border-zinc-700 transition">
                    <Zap className="h-4 w-4" />
                    Get Notified
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
