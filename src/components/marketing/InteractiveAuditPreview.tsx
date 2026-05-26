import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SlideUp } from "@/components/motion/SlideUp";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function InteractiveAuditPreview() {
  return (
    <Section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Subtle radial gradient background to simulate focus */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-background to-background" />
      
      <Container className="relative">
        <div className="text-center">
          <SlideUp>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Deterministic Cost Analysis
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Input your current stack and let Gauge calculate your exact optimization potential.
            </p>
          </SlideUp>
        </div>

        <SlideUp delay={0.2} className="mt-16">
          <Card className="mx-auto max-w-4xl overflow-hidden border-white/5 bg-zinc-950/50 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center border-b border-white/5 bg-zinc-900/50 px-4 py-3">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-zinc-700" />
                <div className="h-3 w-3 rounded-full bg-zinc-700" />
                <div className="h-3 w-3 rounded-full bg-zinc-700" />
              </div>
              <div className="mx-auto rounded-md bg-zinc-800/50 px-24 py-1 text-xs text-zinc-500">
                gauge.sh/audit
              </div>
            </div>
            
            <div className="p-8 sm:p-12">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="col-span-1 flex flex-col justify-center border-r border-white/5 pr-8">
                  <div className="text-sm text-zinc-400">Gauge Score</div>
                  <div className="mt-2 text-6xl font-semibold tracking-tighter text-zinc-100">64</div>
                  <div className="mt-4 inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-500">
                    Moderately Optimized
                  </div>
                </div>
                <div className="col-span-2 grid gap-6">
                  <div className="flex items-end justify-between border-b border-white/5 pb-6">
                    <div>
                      <div className="text-sm text-zinc-400">Potential Annual Savings</div>
                      <div className="mt-2 text-4xl font-semibold tracking-tight text-emerald-400/90">$3,240</div>
                    </div>
                    <Button className="shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                      View Full Report
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-4">
                     {/* Skeleton blocks representing insights */}
                     <div className="h-12 w-full max-w-[200px] rounded border border-white/5 bg-zinc-900/30" />
                     <div className="h-12 w-full max-w-[150px] rounded border border-white/5 bg-zinc-900/30" />
                     <div className="h-12 w-full max-w-[240px] rounded border border-white/5 bg-zinc-900/30" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </SlideUp>
      </Container>
    </Section>
  );
}
