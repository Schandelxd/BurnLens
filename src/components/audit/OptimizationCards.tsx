import { SlideUp } from "@/components/motion/SlideUp";
import { Recommendation } from "@/lib/audit-engine/types";
import { AlertTriangle, Info, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/motion/SpotlightCard";

interface Props {
  recommendations: Recommendation[];
}

export function OptimizationCards({ recommendations }: Props) {
  if (recommendations.length === 0) {
    return (
      <SlideUp delay={0.2}>
        <div className="rounded-3xl border border-white/5 bg-zinc-950 p-12 text-center shadow-2xl">
          <h3 className="font-medium text-zinc-200">No inefficiencies found</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Your AI tooling stack is highly optimized. We couldn't find any overlapping subscriptions or inactive seats.
          </p>
        </div>
      </SlideUp>
    );
  }

  return (
    <div className="space-y-4 mt-8">
      <SlideUp delay={0.1}>
        <h3 className="text-sm font-medium tracking-widest text-zinc-500 uppercase mb-6 mt-16">Optimization Opportunities</h3>
      </SlideUp>
      
      {recommendations.map((rec, i) => {
        const Icon = rec.severity === 'high' ? AlertTriangle : rec.severity === 'medium' ? Zap : Info;
        const iconColor = rec.severity === 'high' ? 'text-amber-500' : rec.severity === 'medium' ? 'text-emerald-500' : 'text-blue-500';
        const bgIcon = rec.severity === 'high' ? 'bg-amber-500/10' : rec.severity === 'medium' ? 'bg-emerald-500/10' : 'bg-blue-500/10';

        return (
          <SlideUp key={rec.id} delay={0.15 + (i * 0.05)}>
            <SpotlightCard className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6">
              <div className="flex items-start gap-4">
                <div className={`mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02]`}>
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
                <div>
                  <h4 className="font-medium text-zinc-200">{rec.title}</h4>
                  <p className="mt-1 text-sm text-zinc-400">{rec.description}</p>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-4 sm:gap-2 ml-14 sm:ml-0">
                <div className="text-right">
                  <div className="font-medium tracking-tight tabular-nums text-emerald-400">
                    Save ${rec.impactMonthly}/mo
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 text-xs hover:bg-white/5 relative z-20">
                  {rec.category === 'inactive' ? 'Revoke Seats' : 'View Details'}
                </Button>
              </div>
            </SpotlightCard>
          </SlideUp>
        );
      })}
    </div>
  );
}
