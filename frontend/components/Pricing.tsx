import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    tagline: "For people who like free stuff.",
    price: 0,
    features: ["50 Scrapes/day", "Email alerts", "No Auto-apply"],
  },
  {
    name: "Pro",
    tagline: "For people who want results.",
    price: 10,
    features: [
      "Unlimited Scrapes",
      "AI Resume Matching",
      "Auto-Apply (10/day)",
    ],
    highlighted: true,
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="bg-gradient-to-b from-[#f6f1e8] via-[#eef1f6] to-sky-100 py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="flex flex-col gap-3 text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Pricing
          </span>
          <h2 className="text-4xl font-bold text-neutral-950 sm:text-5xl">
            Pricing that doesn&apos;t suck
          </h2>
          <p className="text-base text-slate-700">
            No hidden fees, no BS. Just pick a plan and go.
          </p>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-2 md:max-w-3xl md:mx-auto">
          {plans.map((plan) => {
            const isHighlight = Boolean(plan.highlighted);

            return (
              <div
                key={plan.name}
                className={`flex min-h-[400px] md:min-h-[500px] flex-col rounded-2xl md:rounded-3xl border p-4 md:p-6 ${
                  isHighlight
                    ? "border-2 border-white/80 bg-gradient-to-b from-[#cde0ff] via-white to-[#f3e7d9] ring-1 ring-white/80"
                    : "border-white/80 bg-white/90"
                }`}
              >
                <div className="mb-3 md:mb-4 h-2" />

                <div className="flex flex-col gap-1.5 md:gap-2">
                  <p className="text-xs md:text-sm font-semibold text-slate-700">
                    {plan.tagline}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-neutral-950">
                    {plan.name}
                  </h3>
                </div>

                <div className="mt-3 md:mt-4 flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-neutral-950">
                    ${plan.price}
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-slate-600">
                    /mo
                  </span>
                </div>

                <div className="mt-2 text-xs md:text-sm text-slate-700">
                  {plan.name === "Free" &&
                    "Try before you buy (or don&apos;t buy)."}
                  {plan.name === "Pro" &&
                    "The one that actually gets you hired."}
                </div>

                <div className="mt-4 md:mt-6 flex-1 space-y-2 md:space-y-3 text-xs md:text-sm text-slate-800">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 md:h-4 md:w-4 text-slate-800 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="mt-auto w-full rounded-full px-4 py-2.5 md:px-5 md:py-3 text-xs md:text-sm font-semibold transition bg-neutral-950 text-white hover:-translate-y-0.5 hover:cursor-pointer">
                  {plan.name === "Free" && "I'm In"}
                  {plan.name === "Pro" && "Let's Do This"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
