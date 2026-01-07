"use client";

import Image from "next/image";
import { BadgeCheck, CheckCircle2, MailCheck, Rocket } from "lucide-react";
import Marquee from "./ui/marquee";

const skillMatches = [
  { skill: "Rust", match: true },
  { skill: "TypeScript", match: true },
  { skill: "Next.js", match: true },
  { skill: "PostgreSQL", match: false },
];

const marqueeLogos = [
  { name: "linkedin", src: "/linkedin.svg" },
  { name: "indeed", src: "/indeed.svg" },
  { name: "seek", src: "/seek.svg" },
  { name: "y-combinator", src: "/y-combinator.svg" },
];

const jobs = [
  { title: "Junior Rust Engineer", status: "Auto-Applied", color: "emerald" },
  { title: "Full Stack Dev", status: "Match Found", color: "amber" },
  { title: "React Developer", status: "Email Sent", color: "sky" },
];

const statusClasses: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  amber: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  sky: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
};

export function Features() {
  return (
    <section
      id="features"
      className="bg-gradient-to-b from-[#f6f1e8] via-[#f5f1ed] to-[#f6f1e8] py-8 md:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center md:mb-12 lg:mb-16">
          <h2 className="mb-3 text-2xl font-bold leading-tight text-neutral-950 md:text-3xl lg:text-4xl">
            Built for people who hate job hunting
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-700 md:text-base">
            We do the boring stuff so you don&apos;t have to. Find jobs, match
            skills, and apply automatically—all while you sleep.
          </p>
        </div>

        {/* Features Grid - Mobile First: Single Column */}
        <div className="space-y-6 md:space-y-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
          {/* Card 1: Smart Matching */}
          <div className="flex flex-col gap-4 rounded-2xl bg-[#e3ded5] p-4 md:gap-5 md:rounded-3xl md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
              <h3 className="flex-1 text-lg font-semibold leading-tight text-neutral-950 md:text-xl lg:text-2xl">
                AI that actually knows what you&apos;re good at
              </h3>
              <span className="w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200/50 md:px-4 md:py-2 md:text-sm">
                Smart Matching
              </span>
            </div>

            <div className="rounded-xl border border-white/60 bg-white p-4 md:rounded-2xl md:p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-800 md:text-base">
                  Skill Match
                </span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200/50 md:px-4 md:py-1.5 md:text-sm">
                  95% Match
                </span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 md:gap-3">
                {skillMatches.map((item) => (
                  <div
                    key={item.skill}
                    className="flex items-center justify-between rounded-lg border border-white/70 bg-white px-3 py-2.5 md:rounded-xl md:px-4 md:py-3"
                  >
                    <span className="text-sm font-semibold text-neutral-950 md:text-base">
                      {item.skill}
                    </span>
                    <span
                      className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold md:gap-2 md:px-3 md:py-1.5 md:text-sm ${
                        item.match
                          ? "bg-emerald-50/80 text-emerald-700 ring-1 ring-emerald-200/50"
                          : "bg-amber-50/80 text-amber-700 ring-1 ring-amber-200/50"
                      }`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      {item.match ? "Found" : "Missing"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="rounded-xl border border-white/60 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700 md:rounded-2xl md:px-5 md:py-4 md:text-base">
              We read your resume (yes, actually read it) and match you with
              jobs that make sense. No more applying to senior roles when
              you&apos;re junior.
            </p>
          </div>

          {/* Card 2: Active Applications */}
          <div className="flex flex-col gap-4 rounded-2xl bg-[#e3ded5] p-4 md:gap-5 md:rounded-3xl md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
              <div className="flex-1">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-700 md:text-sm">
                  Active Applications
                </p>
                <h3 className="text-lg font-semibold leading-tight text-neutral-950 md:text-xl lg:text-2xl">
                  Never miss a role that&apos;s actually worth it.
                </h3>
              </div>
              <span className="w-fit rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 ring-1 ring-sky-200/50 md:px-4 md:py-2 md:text-sm">
                Live
              </span>
            </div>

            <div className="space-y-2.5 md:space-y-3">
              {jobs.map((job) => (
                <div
                  key={job.title}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/70 bg-white px-3 py-2.5 md:rounded-2xl md:px-4 md:py-3"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-slate-700 md:h-12 md:w-12 md:rounded-xl">
                      <BadgeCheck className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-neutral-950 md:text-base">
                        {job.title}
                      </p>
                      <p className="text-xs text-slate-500 md:text-sm">
                        Perth · Remote friendly
                      </p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold md:px-4 md:py-1.5 md:text-sm ${
                      statusClasses[job.color]
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Auto-Apply & Integrations */}
        <div className="mt-6 space-y-6 md:mt-8 md:space-y-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
          {/* Card 3: Auto-Apply */}
          <div className="flex flex-col gap-4 rounded-2xl bg-[#e3ded5] p-4 md:gap-5 md:rounded-3xl md:p-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-sky-700 ring-1 ring-sky-200/50 md:px-4 md:py-2 md:text-sm">
              <Rocket className="h-4 w-4 md:h-5 md:w-5" />
              Auto-Apply
            </span>
            <h3 className="text-lg font-bold leading-tight text-neutral-950 md:text-xl lg:text-2xl">
              Set it and forget it (but we&apos;ll remind you).
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 md:text-base">
              Tell us what you want: &quot;Junior Rust dev, remote, $80k+&quot;.
              We&apos;ll hunt 24/7 and apply the moment we find something good.
              Or just send you a digest if you&apos;re picky.
            </p>
            <div className="flex items-start gap-2.5 rounded-lg border border-white/60 bg-white px-3 py-2.5 md:rounded-xl md:px-4 md:py-3">
              <MailCheck className="mt-0.5 h-5 w-5 shrink-0 text-sky-600 md:h-6 md:w-6" />
              <span className="text-sm text-slate-800 md:text-base">
                We&apos;ll even remind you about interviews. You&apos;re
                welcome.
              </span>
            </div>
          </div>

          {/* Card 4: Multi-Source Integrations */}
          <div className="flex flex-col gap-4 rounded-2xl bg-[#e3ded5] p-4  md:gap-5 md:rounded-3xl md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
              <h3 className="flex-1 text-lg font-semibold leading-tight text-neutral-950 md:text-xl lg:text-2xl">
                We check everywhere (so you don&apos;t have to)
              </h3>
              <span className="w-fit rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700 ring-1 ring-purple-200/50 md:px-4 md:py-2 md:text-sm">
                Multi-Source
              </span>
            </div>
            <div className="rounded-xl border border-white/60 bg-white p-4 md:rounded-2xl md:p-5">
              <Marquee speed={20} pauseOnHover>
                {marqueeLogos.map((logo) => (
                  <div
                    key={logo.name}
                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/90 p-2 md:h-14 md:w-14 md:rounded-xl md:p-2.5 lg:h-16 lg:w-16 lg:p-3"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ))}
              </Marquee>
            </div>
            <p className="rounded-xl border border-white/60 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700 md:rounded-2xl md:px-5 md:py-4 md:text-base">
              LinkedIn, Indeed, Seek, YC Jobs, and all the other places
              you&apos;re too lazy to check manually. We got you covered.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
