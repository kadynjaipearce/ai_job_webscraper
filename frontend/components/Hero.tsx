import { Sparkles, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#bcd7f5] via-[#e6ecf5] to-[#f6f1e8]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.6),transparent_35%),radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.5),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.35),transparent_35%)]" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 pb-24 pt-28 md:pt-20 text-center">
        <div className="flex max-w-3xl flex-col gap-6">
          <h1 className="text-5xl font-bold leading-tight text-neutral-950 sm:text-6xl lg:text-7xl">
            Run your job search like a pro.
          </h1>
          <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
            All-in-one AI agent for sourcing, matching, and auto-applying to
            roles you love. From finding openings to hitting submit, we&apos;ve
            got your back.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button className="hover:cursor-pointer flex items-center gap-2 rounded-full bg-neutral-950 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-950/20 transition hover:-translate-y-0.5 hover:shadow-xl">
            Try for free
            <Sparkles className="h-4 w-4" />
          </button>
          <button className="hover:cursor-pointer flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-7 py-3 text-sm font-semibold text-neutral-950 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
            See features
            <Play className="h-4 w-4" />
          </button>
        </div>

        <div className="w-full max-w-5xl rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl shadow-neutral-950/10 ring-1 ring-white/70 backdrop-blur-xl">
          <div className="flex flex-col gap-6 rounded-2xl border border-white/60 bg-white/90 p-8 text-left text-neutral-950 shadow-inner backdrop-blur">
            <div className="flex flex-wrap items-center gap-4">
              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                Job Command Center
              </div>
              <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                New Matches Today: 55
              </div>
              <div className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
                Applications Sent: 12
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1.3fr,1fr]">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                  <span>Matches</span>
                  <span>Confidence</span>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    { title: "Rust Backend Engineer", score: 95 },
                    { title: "Full Stack (Next.js)", score: 88 },
                    { title: "React Developer", score: 82 },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between rounded-xl bg-white border border-slate-200 px-4 py-3 text-sm shadow-sm"
                    >
                      <span className="font-medium text-neutral-950">
                        {item.title}
                      </span>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                        {item.score}% Match
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
                <div>
                  <div className="text-sm font-semibold text-slate-700">
                    Interview requests
                  </div>
                  <div className="mt-3 h-32 rounded-xl bg-gradient-to-br from-sky-100 via-sky-50 to-white border border-slate-200 shadow-sm" />
                </div>
                <div className="mt-4 flex items-center justify-between text-sm font-semibold text-slate-700">
                  <span>Resume Match</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    95% Match
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
