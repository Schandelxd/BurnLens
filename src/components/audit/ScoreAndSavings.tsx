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
      <div className="grid gap-12 sm:grid-cols-2 rounded-[2rem] border border-white/5 bg-zinc-950 p-12 shadow-[0_0_100px_-20px_rgba(0,0,0,1)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col justify-center border-b border-white/5 pb-12 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-12">
          <div className="text-sm font-medium text-zinc-500 tracking-wide uppercase">Gauge Score</div>
          <div className="mt-4 text-8xl font-medium tracking-tighter text-zinc-100">
            {score}
            <span className="text-4xl text-zinc-700 font-normal">/100</span>
          </div>
          <div className="mt-6">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border border-white/5 ${statusColor} bg-white/[0.02]`}>
              {status}
            </span>
          </div>
        </div>
        <div className="relative z-10 flex flex-col justify-center space-y-12 sm:pl-4">
          <div>
            <div className="text-sm font-medium text-zinc-500 tracking-wide uppercase">Potential Monthly Savings</div>
            <div className="mt-2 text-5xl font-medium tracking-tighter text-emerald-400">
              ${monthlySavings.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-500 tracking-wide uppercase">Annualized Impact</div>
            <div className="mt-2 text-3xl font-medium tracking-tight text-zinc-200">
              ${annualSavings.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
          </div>
        </div>
      </div>
    </SlideUp>
  );
}
