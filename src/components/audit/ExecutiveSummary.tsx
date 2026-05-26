import { FadeIn } from "@/components/motion/FadeIn";

interface Props {
  toolCount: number;
  totalSeats: number;
  savings: number;
  topIssue?: string;
}

export function ExecutiveSummary({ toolCount, totalSeats, savings, topIssue }: Props) {
  return (
    <FadeIn>
      <div className="mb-12 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Audit Complete
        </h1>
        <div className="mt-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Gauge analyzed your stack of {toolCount} AI tools across {totalSeats} provisioned seats. 
            {savings > 0 ? (
              <>
                We identified <span className="text-foreground font-medium">${savings.toLocaleString()}/yr</span> in wasted spend, 
                primarily driven by {topIssue ? <span className="text-foreground font-medium">{topIssue.toLowerCase()}</span> : 'inactive licenses'}.
              </>
            ) : (
              <> Your team's AI subscriptions are highly optimized with no immediate redundancies detected. </>
            )}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}
