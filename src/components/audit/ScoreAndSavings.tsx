import { SlideUp } from "@/components/motion/SlideUp";

interface Props {
  score: number;
  monthlySavings: number;
  annualSavings: number;
}

export function ScoreAndSavings({ score, monthlySavings, annualSavings }: Props) {
  let status = "Highly Optimized";
  let statusColor = "text-emerald-500";
  let bgStatus = "bg-emerald-500/10";
  
  if (score < 50) {
    status = "Critical Inefficiencies";
    statusColor = "text-red-500";
    bgStatus = "bg-red-500/10";
  } else if (score < 80) {
    status = "Moderately Optimized";
    statusColor = "text-amber-500";
    bgStatus = "bg-amber-500/10";
  }

  return (
    <SlideUp>
      <div className="grid gap-8 sm:grid-cols-2 rounded-2xl border border-white/5 bg-zinc-950/50 p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col justify-center border-b border-white/5 pb-8 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-8">
          <div className="text-sm font-medium text-zinc-400">Gauge Score</div>
          <div className="mt-2 text-7xl font-semibold tracking-tighter text-zinc-100">
            {score}
            <span className="text-3xl text-zinc-600">/100</span>
          </div>
          <div className="mt-4">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor} ${bgStatus}`}>
              {status}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <div className="text-sm font-medium text-zinc-400">Potential Monthly Savings</div>
            <div className="mt-1 text-4xl font-semibold tracking-tight text-emerald-400">
              ${monthlySavings.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-400">Annualized Impact</div>
            <div className="mt-1 text-2xl font-medium tracking-tight text-zinc-200">
              ${annualSavings.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
          </div>
        </div>
      </div>
    </SlideUp>
  );
}
