"use client";

import {
  Brain,
  Zap,
  Search,
  Mail,
  CheckCircle2,
  Globe,
  Clock,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "AI that knows what you're good at",
    description:
      "We read your resume (yes, actually read it) and match you with jobs that make sense. No more applying to senior roles when you're junior.",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Zap,
    title: "Set it and forget it",
    description:
      'Tell us what you want: "Junior Rust dev, remote, $80k+". We\'ll hunt 24/7 and apply the moment we find something good.',
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Search,
    title: "We check everywhere",
    description:
      "LinkedIn, Indeed, Seek, YC Jobs, and all the other places you're too lazy to check manually. We got you covered.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Mail,
    title: "Never miss an opportunity",
    description:
      "Real-time alerts when we find matches. We'll even remind you about interviews. You're welcome.",
    gradient: "from-sky-500 to-blue-500",
  },
];

const skills = [
  { name: "Rust", matched: true },
  { name: "TypeScript", matched: true },
  { name: "Next.js", matched: true },
  { name: "PostgreSQL", matched: false },
];

export function Features() {
  return (
    <section id="features" className="relative bg-zinc-950 py-24 lg:py-32">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-950" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Built for people who{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              hate job hunting
            </span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            We do the boring stuff so you don&apos;t have to. Find jobs, match skills,
            and apply automatically—all while you sleep.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-16 lg:mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl bg-zinc-900 border border-zinc-800 p-6 lg:p-8 hover:border-zinc-700 transition-all"
            >
              {/* Icon */}
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Skill Matching Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-2 rounded-2xl bg-zinc-900 border border-zinc-800 p-6 lg:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Skill Match</h3>
              <span className="text-sm font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg">
                95% Match
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between p-4 rounded-xl bg-zinc-800 border border-zinc-700/50"
                >
                  <span className="font-medium text-white">{skill.name}</span>
                  <span
                    className={`flex items-center gap-1.5 text-sm font-medium ${
                      skill.matched ? "text-emerald-400" : "text-amber-400"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {skill.matched ? "Found" : "Missing"}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-violet-500/20 p-6 lg:p-8"
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              Why Us?
            </h3>
            <div className="space-y-4">
              {[
                { icon: Clock, label: "20+ hours saved weekly" },
                { icon: Globe, label: "50+ job boards covered" },
                { icon: Shield, label: "Your data stays private" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-violet-500/20">
                    <item.icon className="h-4 w-4 text-violet-400" />
                  </div>
                  <span className="text-zinc-300 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
