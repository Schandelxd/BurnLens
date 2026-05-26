import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { SlideUp } from "@/components/motion/SlideUp";
import { AlertCircle } from "lucide-react";

export function ProblemVisualizationSection() {
  return (
    <Section className="py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SlideUp>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                The AI sprawl is real.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Startups adopt AI tools rapidly—ChatGPT, Claude, Cursor, GitHub Copilot, and hidden API services. Without centralized visibility, subscriptions overlap, seats go unused, and budgets leak.
              </p>
            </SlideUp>
          </div>
          
          <SlideUp delay={0.2} className="relative">
            <div className="absolute -inset-y-px -left-px -right-px rounded-xl border border-white/5 bg-zinc-950/50 p-8 shadow-2xl backdrop-blur-3xl" />
            <div className="relative grid gap-4">
              {[ 
                { tool: "GitHub Copilot", status: "3 Inactive Seats", amount: "-$57/mo" },
                { tool: "ChatGPT Plus", status: "Overlapping Plan", amount: "-$120/mo" },
                { tool: "Claude Pro", status: "Overlapping Plan", amount: "-$100/mo" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-white/5 bg-zinc-900/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-800">
                      <div className="h-5 w-5 rounded-sm bg-zinc-700" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-200">{item.tool}</p>
                      <div className="flex items-center gap-1.5 text-xs text-amber-500/80">
                        <AlertCircle className="h-3 w-3" />
                        <span>{item.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-mono text-sm text-zinc-400">{item.amount}</div>
                </div>
              ))}
            </div>
          </SlideUp>
        </div>
      </Container>
    </Section>
  );
}
