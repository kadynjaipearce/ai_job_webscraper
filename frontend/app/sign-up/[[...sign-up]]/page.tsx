"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Rocket,
  ArrowLeft,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 xl:w-[45%] flex flex-col bg-zinc-900">
        {/* Mobile Header */}
        <div className="lg:hidden p-6 flex items-center justify-between border-b border-zinc-800">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-white"
          >
            please<span className="text-violet-400">hire</span>me
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <Rocket className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-300">
                  Start for free
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white">
                Create your account
              </h2>
              <p className="mt-2 text-zinc-500">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-semibold text-violet-400 hover:text-violet-300 transition"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Clerk Sign Up */}
            <div className="w-full flex justify-center">
              <SignUp
                appearance={{
                  elements: {
                    rootBox: "w-full flex justify-center",
                    cardBox: "w-full",
                    card: "bg-transparent shadow-none p-0 w-full mx-auto",
                    header: "hidden",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    main: "w-full",
                    form: "w-full",
                    socialButtonsBlockButton:
                      "bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 text-white font-medium rounded-xl py-3",
                    socialButtonsBlockButtonText: "font-medium",
                    dividerLine: "bg-zinc-800",
                    dividerText: "text-zinc-500 text-sm",
                    formFieldLabel: "text-zinc-400 font-medium text-sm",
                    formFieldInput:
                      "rounded-xl border-zinc-700 bg-zinc-800 text-white focus:border-violet-500 focus:ring-violet-500/20 py-3",
                    formButtonPrimary:
                      "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl py-3",
                    footerActionLink:
                      "text-violet-400 hover:text-violet-300 font-semibold",
                    identityPreviewEditButton:
                      "text-violet-400 hover:text-violet-300",
                    formFieldAction:
                      "text-violet-400 hover:text-violet-300 font-medium",
                    footer: "hidden",
                    footerAction: "hidden",
                  },
                  layout: {
                    socialButtonsPlacement: "top",
                    socialButtonsVariant: "blockButton",
                  },
                }}
                routing="path"
                path="/sign-up"
                signInUrl="/sign-in"
                forceRedirectUrl="/dashboard"
              />
            </div>

            {/* Terms */}
            <p className="mt-8 text-center text-xs text-zinc-600">
              By creating an account, you agree to our{" "}
              <Link
                href="/terms"
                className="underline hover:text-zinc-400 transition"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline hover:text-zinc-400 transition"
              >
                Privacy Policy
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] flex-col justify-between p-12 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px]" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fuchsia-600/20 rounded-full blur-[128px]" />
        </div>

        {/* Header */}
        <div className="relative flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-white"
          >
            please<span className="text-violet-400">hire</span>me
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>

        {/* Content */}
        <div className="relative flex flex-col gap-8 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
              Stop job hunting.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                Start getting hired.
              </span>
            </h1>
            <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
              Join thousands of job seekers who&apos;ve automated their way to their
              dream roles. Let AI do the heavy lifting.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {[
              {
                icon: CheckCircle2,
                stat: "10x",
                label: "More Applications",
                description: "Apply to more jobs with less effort",
              },
              {
                icon: Clock,
                stat: "20hrs",
                label: "Saved Per Week",
                description: "Stop wasting time on manual applications",
              },
              {
                icon: TrendingUp,
                stat: "3x",
                label: "Interview Rate",
                description: "Better matching means more callbacks",
              },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-500/20">
                  <item.icon className="h-6 w-6 text-violet-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">
                      {item.stat}
                    </span>
                    <span className="font-semibold text-zinc-400">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="relative flex items-center gap-4 text-sm text-zinc-600">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-950"
              />
            ))}
          </div>
          <p>Join 5,000+ job seekers already using pleasehireme</p>
        </div>
      </div>
    </div>
  );
}
