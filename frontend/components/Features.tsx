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
      className="bg-gradient-to-b from-[#f6f1e8] via-[#f5f1ed] to-[#f6f1e8] py-12 sm:py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-3 sm:gap-8 sm:px-4 md:gap-12 md:px-6">
        <div className="flex flex-col items-center gap-2 text-center sm:gap-3">
          <h2 className="text-xl font-bold text-neutral-950 sm:text-2xl md:text-3xl lg:text-4xl">
            Built for freelancers, powered by simplicity
          </h2>
          <p className="max-w-2xl text-xs text-slate-700 sm:text-sm md:text-base">
            Keep your sourcing, matching, and applications aligned. Calm, glassy
            surfaces that still deliver the details you need.
          </p>
        </div>

        <div className="grid gap-3 sm:gap-4 md:gap-6 md:grid-cols-2">
          <div className="flex h-full flex-col gap-3 rounded-2xl bg-[#e3ded5] p-3 shadow-xl shadow-neutral-950/5 backdrop-blur-xl backdrop-saturate-150 sm:gap-4 sm:rounded-3xl sm:p-4 md:gap-5 md:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3 md:items-center md:gap-4">
              <h3 className="min-w-0 flex-1 break-words text-base font-semibold leading-tight text-neutral-950 sm:text-lg md:text-xl">
                Smart, flexible, and built around your workflow
              </h3>
              <span className="w-fit flex-shrink-0 whitespace-nowrap rounded-full bg-emerald-50/80 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200/50 backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-xs">
                Smart Matching
              </span>
            </div>

            <div className="rounded-xl border border-white/60 bg-white p-2.5 shadow-inner shadow-neutral-950/5 backdrop-blur-md backdrop-saturate-150 sm:rounded-2xl sm:p-3 md:p-4">
              <div className="flex flex-col gap-1.5 text-[10px] text-slate-800 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:text-xs md:gap-3 md:text-sm">
                <span>Skill Match</span>
                <span className="w-fit rounded-full bg-emerald-50/80 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200/50 backdrop-blur-sm sm:px-3 sm:py-1 sm:text-xs">
                  95% Match
                </span>
              </div>
              <div className="mt-2 grid gap-1.5 sm:mt-3 sm:grid-cols-2 sm:gap-2 md:mt-4 md:gap-3">
                {skillMatches.map((item) => (
                  <div
                    key={item.skill}
                    className="flex flex-col gap-1.5 rounded-lg border border-white/70 bg-white px-2 py-1.5 text-[10px] shadow-sm backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:rounded-xl sm:px-3 sm:py-2 sm:text-xs md:px-4 md:py-3 md:text-sm"
                  >
                    <span className="font-semibold text-neutral-950">
                      {item.skill}
                    </span>
                    <span
                      className={`w-fit flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm sm:gap-2 sm:px-3 sm:py-1 sm:text-xs ${
                        item.match
                          ? "bg-emerald-50/80 text-emerald-700 ring-1 ring-emerald-200/50"
                          : "bg-amber-50/80 text-amber-700 ring-1 ring-amber-200/50"
                      }`}
                    >
                      <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" />
                      {item.match ? "Found" : "Missing"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/60 bg-white px-2.5 py-1.5 text-[10px] leading-relaxed text-slate-700 shadow-inner shadow-neutral-950/5 backdrop-blur-md backdrop-saturate-150 sm:rounded-2xl sm:px-3 sm:py-2 sm:text-xs md:px-4 md:py-3 md:text-sm">
              Personalize every detail: from resume parsing to application
              order, pleasehireme feels like an extension of your workflow.
            </div>
          </div>

          <div className="rounded-2xl bg-[#e3ded5] p-3 shadow-xl shadow-neutral-950/5 backdrop-blur-xl backdrop-saturate-150 sm:rounded-3xl sm:p-4 md:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3 md:items-center md:gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold text-slate-700 sm:text-xs md:text-sm">
                  Active Applications
                </p>
                <h3 className="text-base font-semibold leading-tight text-neutral-950 sm:text-lg md:text-xl">
                  Never miss a matching role.
                </h3>
              </div>
              <div className="w-fit flex-shrink-0 whitespace-nowrap rounded-full bg-sky-50/80 px-2.5 py-1 text-[10px] font-semibold text-sky-700 ring-1 ring-sky-200/50 backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-xs">
                Live
              </div>
            </div>

            <div className="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2 md:mt-6 md:space-y-3">
              {jobs.map((job) => (
                <div
                  key={job.title}
                  className="flex flex-col gap-1.5 rounded-xl border border-white/70 bg-white px-2.5 py-1.5 shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl sm:px-3 sm:py-2 md:px-4 md:py-3"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-slate-700 shadow-inner backdrop-blur-sm sm:h-8 sm:w-8 sm:rounded-xl md:h-10 md:w-10">
                      <BadgeCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] font-semibold text-neutral-950 sm:text-xs md:text-sm">
                        {job.title}
                      </p>
                      <p className="text-[9px] text-slate-500 sm:text-[10px] md:text-xs">
                        Perth · Remote friendly
                      </p>
                    </div>
                  </div>
                  <span
                    className={`w-fit rounded-full px-2 py-0.5 text-[9px] font-semibold backdrop-blur-sm sm:px-2.5 sm:py-1 sm:text-[10px] md:px-3 md:py-1 md:text-xs ${
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

        <div className="grid gap-3 sm:gap-4 md:gap-6 lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-2 rounded-2xl bg-[#e3ded5] p-3 shadow-xl shadow-neutral-950/5 backdrop-blur-xl backdrop-saturate-150 sm:gap-2.5 sm:rounded-3xl sm:p-4 md:gap-3 md:p-6">
            <span className="inline-flex w-fit flex-shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-sky-50/80 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-sky-700 ring-1 ring-sky-200/50 backdrop-blur-sm sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[10px] md:gap-2 md:px-3 md:py-1.5 md:text-xs">
              <Rocket className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" />
              Auto-Apply
            </span>
            <h3 className="text-base font-bold leading-tight text-neutral-950 sm:text-lg md:text-xl lg:text-2xl">
              Define your parameters and automate the follow-through.
            </h3>
            <p className="text-[11px] leading-relaxed text-slate-700 sm:text-xs md:text-sm lg:text-base">
              Define your parameters: &quot;Junior Software Engineer in
              Perth&quot;. We scrape 24/7. When a high-confidence match is
              found, we apply instantly or send you a digest.
            </p>
            <div className="flex flex-wrap items-start gap-1 text-[10px] text-slate-800 sm:items-center sm:gap-1.5 sm:text-[11px] md:gap-2 md:text-xs lg:gap-3 lg:text-sm">
              <MailCheck className="mt-0.5 h-3 w-3 flex-shrink-0 text-sky-600 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-5 lg:w-5" />
              <span className="flex-1 min-w-0">
                Instant digests, follow-ups, and interview reminders included.
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-2xl bg-[#e3ded5] p-3 shadow-xl shadow-neutral-950/5 backdrop-blur-xl backdrop-saturate-150 sm:gap-2.5 sm:rounded-3xl sm:p-4 md:gap-3 md:p-6">
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-2 md:items-center md:gap-3 lg:gap-4">
              <h3 className="min-w-0 flex-1 break-words text-sm font-semibold leading-tight text-neutral-950 sm:text-base md:text-lg lg:text-xl">
                Integrates seamlessly with the sources you already use
              </h3>
              <span className="w-fit flex-shrink-0 whitespace-nowrap rounded-full bg-purple-50/80 px-2 py-0.5 text-[9px] font-semibold text-purple-700 ring-1 ring-purple-200/50 backdrop-blur-sm sm:px-2.5 sm:py-1 sm:text-[10px] md:px-3 md:py-1.5 md:text-xs">
                Multi-Source
              </span>
            </div>
            <div className="rounded-lg border border-white/60 bg-white p-1.5 shadow-inner shadow-neutral-950/5 backdrop-blur-md backdrop-saturate-150 sm:rounded-xl sm:p-2 md:rounded-2xl md:p-3 lg:p-4">
              <Marquee speed={20} pauseOnHover>
                {marqueeLogos.map((logo) => (
                  <div
                    key={logo.name}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/80 p-1 backdrop-blur-sm sm:h-10 sm:w-10 sm:p-1.5 md:h-12 md:w-12 md:rounded-xl md:p-2 lg:h-16 lg:w-16 lg:p-3"
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
            <div className="rounded-lg border border-white/60 bg-white px-2 py-1 text-[10px] leading-relaxed text-slate-700 shadow-inner shadow-neutral-950/5 backdrop-blur-md backdrop-saturate-150 sm:rounded-xl sm:px-2.5 sm:py-1.5 sm:text-[11px] md:rounded-2xl md:px-3 md:py-2 md:text-xs lg:px-4 lg:py-3 lg:text-sm">
              Seamless integrations. Plug into the boards that matter: LinkedIn,
              Indeed, Seek, YC Jobs, Jora, and more—so your matches stay
              relevant.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
