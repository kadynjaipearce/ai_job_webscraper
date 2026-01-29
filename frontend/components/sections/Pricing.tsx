"use client";

import Link from "next/link";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

/* ── Data ──────────────────────────────────────────────── */

interface Feature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  tagline: string;
  price: number;
  features: Feature[];
  cta: string;
  highlighted: boolean;
}

const plans: Plan[] = [
  {
    name: "Free",
    tagline: "For people who like free stuff",
    price: 0,
    features: [
      { text: "50 Scrapes/day", included: true },
      { text: "Email alerts", included: true },
      { text: "Basic skill matching", included: true },
      { text: "No Auto-apply", included: false },
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    tagline: "For people who want results",
    price: 10,
    features: [
      { text: "Unlimited Scrapes", included: true },
      { text: "AI Resume Matching", included: true },
      { text: "Auto-Apply (10/day)", included: true },
      { text: "Priority support", included: true },
      { text: "Interview reminders", included: true },
    ],
    cta: "Sign Me Up",
    highlighted: true,
  },
];

/* ── Component ─────────────────────────────────────────── */

export function Pricing() {
  return (
    <section id="pricing" className="bg-slate-900 py-24 lg:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px]">
        <div className="w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-[100px] opacity-[0.08]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-overlay grid-overlay-mask" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
            Pricing that doesn&apos;t suck
          </h2>
          <p className="text-lg text-slate-400 max-w-lg mx-auto leading-relaxed">
            No hidden fees, no BS. Just pick a plan and go.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto items-start">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative glass-strong p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${
                plan.highlighted ? "glow-indigo md:scale-[1.03]" : ""
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 right-6">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25">
                    <Sparkles className="h-3.5 w-3.5" />
                    Most Popular
                  </span>
                </div>
              )}

              <p className="text-sm text-slate-500 mb-0.5">{plan.tagline}</p>
              <h3 className="text-2xl font-bold text-white mb-5">{plan.name}</h3>

              <div className="flex items-baseline gap-2 mb-8">
                <span className={`font-bold text-white ${plan.highlighted ? "text-6xl" : "text-5xl"}`}>
                  ${plan.price}
                </span>
                <span className="text-slate-500 text-sm">/month</span>
              </div>

              <ul className="space-y-3.5 mb-8">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-3">
                    <div
                      className={`shrink-0 w-5 h-5 rounded-lg flex items-center justify-center ${
                        f.included
                          ? "bg-indigo-500/20 text-indigo-400"
                          : "bg-white/[.04] text-slate-600"
                      }`}
                    >
                      {f.included ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    </div>
                    <span className={f.included ? "text-slate-300" : "text-slate-600"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <SignedOut>
                <Link href="/sign-up" className="block">
                  <Button
                    variant={plan.highlighted ? "primary" : "secondary"}
                    size="lg"
                    className="w-full"
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="block">
                  <Button
                    variant={plan.highlighted ? "primary" : "secondary"}
                    size="lg"
                    className="w-full"
                  >
                    Go to Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </SignedIn>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          viewport={{ once: true }}
          className="text-center text-slate-600 text-sm mt-10"
        >
          14-day money-back guarantee. Cancel anytime. No questions asked.
        </motion.p>
      </div>
    </section>
  );
}
