"use client";

import Image from "next/image";
import { Check, X, Bell, ToggleRight, CheckSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { Marquee } from "../ui/Marquee";

/* ── Data ──────────────────────────────────────────────── */

const skills = [
  { name: "Rust", matched: true },
  { name: "TypeScript", matched: true },
  { name: "Next.js", matched: true },
  { name: "PostgreSQL", matched: false },
  { name: "Docker", matched: true },
  { name: "GraphQL", matched: false },
];

const applications = [
  { title: "Senior Rust Engineer", status: "Auto-Applied", color: "bg-emerald-500", location: "Perth · Remote friendly" },
  { title: "Full Stack Developer", status: "Match Found", color: "bg-sky-500", location: "Sydney · Hybrid" },
  { title: "Backend Engineer", status: "Email Sent", color: "bg-indigo-500", location: "Melbourne · Remote" },
];

const criteria = [
  { label: "Remote only", on: true },
  { label: "Min $80k AUD", on: true },
  { label: "Rust or TypeScript", on: true },
  { label: "No cover letter required", on: false },
];

const logos = [
  { name: "LinkedIn", src: "/linkedin.svg" },
  { name: "Indeed", src: "/indeed.svg" },
  { name: "Seek", src: "/seek.svg" },
  { name: "Y Combinator", src: "/y-combinator.svg" },
];

/* ── Circular score ────────────────────────────────────── */

function CircularScore({ percent }: { percent: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;

  return (
    <div className="relative w-[72px] h-[72px] shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 68 68">
        <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(99,102,241,0.12)" strokeWidth="5" />
        <circle
          cx="34" cy="34" r={r} fill="none"
          stroke="#6366f1" strokeWidth="5" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-indigo-600">{percent}%</span>
      </div>
    </div>
  );
}

/* ── Animation variants ────────────────────────────────── */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ── Component ─────────────────────────────────────────── */

export function Features() {
  return (
    <section id="features" className="bg-[#f8f9fa] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Built for people who hate job hunting
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            We do the boring stuff so you don&apos;t have to.
          </p>
        </motion.div>

        {/* 2x2 Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >

          {/* Card 1 – Smart Matching */}
          <motion.div variants={fadeUp}>
            <Card variant="light" className="p-6 lg:p-8 h-full">
              <h3 className="text-lg font-bold text-slate-900 mb-1">Smart Matching</h3>
              <p className="text-sm text-slate-500 mb-5">
                We actually read your resume and match skills to real job requirements.
              </p>
              <div className="flex items-start gap-5">
                <div className="flex-1 flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span
                      key={s.name}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium border ${
                        s.matched
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : "bg-slate-50 border-slate-200 text-slate-400"
                      }`}
                    >
                      {s.matched ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                      {s.name}
                    </span>
                  ))}
                </div>
                <CircularScore percent={95} />
              </div>
            </Card>
          </motion.div>

          {/* Card 2 – Active Applications */}
          <motion.div variants={fadeUp}>
            <Card variant="light" className="p-6 lg:p-8 h-full">
              <h3 className="text-lg font-bold text-slate-900 mb-1">Active Applications</h3>
              <p className="text-sm text-slate-500 mb-5">
                Track every application in real-time.
              </p>
              <div className="space-y-2.5">
                {applications.map((app) => (
                  <div
                    key={app.title}
                    className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100 hover:shadow-sm transition-all"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900 text-sm truncate">{app.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{app.location}</p>
                    </div>
                    <span className={`${app.color} text-white text-xs font-semibold px-2.5 py-1 rounded-lg shrink-0 ml-3`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Card 3 – Auto-Apply */}
          <motion.div variants={fadeUp}>
            <Card variant="light" className="p-6 lg:p-8 h-full">
              <h3 className="text-lg font-bold text-slate-900 mb-1">Auto-Apply</h3>
              <p className="text-sm text-slate-500 mb-5">
                Set it and forget it. We apply while you sleep.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50 border border-indigo-100">
                  <span className="text-sm font-semibold text-indigo-700">Auto-Apply Enabled</span>
                  <ToggleRight className="h-6 w-6 text-indigo-500" />
                </div>
                <div className="space-y-2">
                  {criteria.map((c) => (
                    <label key={c.label} className="flex items-center gap-2.5 text-sm cursor-default">
                      <CheckSquare className={`h-4 w-4 shrink-0 ${c.on ? "text-indigo-500" : "text-slate-300"}`} />
                      <span className={c.on ? "text-slate-700" : "text-slate-400"}>{c.label}</span>
                    </label>
                  ))}
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-sky-50 border border-sky-100">
                  <div className="relative">
                    <Bell className="h-4 w-4 text-sky-500" />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
                  </div>
                  <span className="text-xs text-sky-700 font-medium">3 new auto-applications sent</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Card 4 – Multi-Source */}
          <motion.div variants={fadeUp}>
            <Card variant="light" className="p-6 lg:p-8 h-full flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 mb-1">Multi-Source Scraping</h3>
              <p className="text-sm text-slate-500 mb-5">
                We check everywhere so you don&apos;t have to.
              </p>
              <div className="flex-1 flex flex-col justify-center">
                <div className="overflow-hidden rounded-xl">
                  <Marquee pauseOnHover speed={22}>
                    {[...logos, ...logos].map((logo, i) => (
                      <div
                        key={`${logo.name}-${i}`}
                        className="flex items-center justify-center w-[72px] h-[52px] rounded-lg bg-white border border-slate-100 shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
                      >
                        <Image
                          src={logo.src}
                          alt={logo.name}
                          width={36}
                          height={36}
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </Marquee>
                </div>
                <p className="text-center text-xs text-slate-400 mt-4">
                  LinkedIn, Indeed, Seek, Y&nbsp;Combinator &amp; more
                </p>
              </div>
            </Card>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
