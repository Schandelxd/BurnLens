import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SlideUp } from "@/components/motion/SlideUp";
import { Card } from "@/components/ui/card";

export function InteractiveAuditPreview() {
  return (
    <Section className="pb-32 md:pb-48">
      <Container className="relative">
        <div className="text-center mb-16">
          <SlideUp>
            <h2 className="text-3xl font-medium tracking-tight sm:text-5xl">
              Deterministic Cost Analysis
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              Input your current stack and let Gauge calculate your exact optimization potential.
            </p>
          </SlideUp>
        </div>

        <SlideUp delay={0.2}>
          <Card className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/5 bg-zinc-950 shadow-[0_0_100px_-20px_rgba(0,0,0,1)] backdrop-blur-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
            <div className="flex items-center border-b border-white/5 bg-zinc-900/20 px-6 py-4">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-zinc-800" />
                <div className="h-3 w-3 rounded-full bg-zinc-800" />
                <div className="h-3 w-3 rounded-full bg-zinc-800" />
              </div>
              <div className="ml-4 text-xs font-medium text-zinc-500 uppercase tracking-widest">
                Gauge Audit Engine
              </div>
            </div>
            
            <div className="p-8 sm:p-16 grid gap-16 md:grid-cols-2">
                <div className="flex flex-col justify-center border-b border-white/5 pb-16 md:border-b-0 md:border-r md:pb-0 md:pr-16">
                  <div className="text-sm text-zinc-500 font-medium tracking-wide uppercase">Gauge Score</div>
                  <div className="mt-4 text-7xl font-medium tracking-tighter text-zinc-100">64<span className="text-3xl text-zinc-700">/100</span></div>
                  <div className="mt-6 inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300 border border-white/10">
                    Optimization Required
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="space-y-12">
                    <div>
                      <div className="text-sm text-zinc-500 font-medium tracking-wide uppercase">Wasted Spend Found</div>
                      <div className="mt-2 text-4xl font-medium tracking-tight text-emerald-400">$1,420<span className="text-xl text-emerald-400/50">/mo</span></div>
                    </div>
                    <div>
                      <div className="text-sm text-zinc-500 font-medium tracking-wide uppercase">Annualized Impact</div>
                      <div className="mt-2 text-3xl font-medium tracking-tight text-zinc-200">$17,040</div>
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
