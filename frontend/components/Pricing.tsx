"use client";

import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    tagline: "For people who like free stuff",
    price: 0,
    features: [
      "50 job scrapes per day",
      "Basic skill matching",
      "Email alerts",
      "Manual applications only",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    tagline: "For people who want results",
    price: 10,
    features: [
      "Unlimited job scrapes",
      "AI-powered resume matching",
      "Auto-apply (10/day)",
      "Priority support",
      "Interview reminders",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative bg-zinc-950 py-24 lg:py-32">
      {/* Gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Pricing that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              doesn&apos;t suck
            </span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto">
            No hidden fees, no BS. Just pick a plan and go.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? "bg-gradient-to-b from-violet-600/20 via-zinc-900 to-zinc-900 border-2 border-violet-500/50"
                  : "bg-zinc-900 border border-zinc-800"
              }`}
            >
              {/* Popular badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-semibold">
                    <Sparkles className="h-4 w-4" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan info */}
              <div className="mb-6">
                <p className="text-sm text-zinc-500 mb-1">{plan.tagline}</p>
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold text-white">
                  ${plan.price}
                </span>
                <span className="text-zinc-500">/month</span>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.highlighted
                          ? "bg-violet-500/20"
                          : "bg-zinc-800"
                      }`}
                    >
                      <Check
                        className={`h-3 w-3 ${
                          plan.highlighted ? "text-violet-400" : "text-zinc-400"
                        }`}
                      />
                    </div>
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <SignedOut>
                <Link
                  href="/sign-up"
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white"
                      : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </SignedOut>
              <SignedIn>
                <Link
                  href="/dashboard"
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white"
                      : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                  }`}
                >
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </SignedIn>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-zinc-500 mt-12"
        >
          14-day money-back guarantee. Cancel anytime. No questions asked.
        </motion.p>
      </div>
    </section>
  );
}
