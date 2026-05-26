import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SlideUp } from "@/components/motion/SlideUp";

export function BenchmarkSection() {
  return (
    <Section className="py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <SlideUp className="order-last lg:order-first">
            <div className="rounded-xl border border-white/5 bg-zinc-900/20 p-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Average Startup AI Spend</span>
                    <span className="text-zinc-100">$8,400/mo</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
                    <div className="h-full w-full bg-zinc-500" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Optimized Spend with Gauge</span>
                    <span className="font-medium text-emerald-400">$5,160/mo</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
                    <div className="h-full w-[60%] bg-emerald-500/80" />
                  </div>
                </div>
              </div>
            </div>
          </SlideUp>

          <div>
            <SlideUp>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Benchmark your stack.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                See how your AI tooling spend compares to similar startups in your industry. 
                We analyze thousands of configurations to find the optimal baseline for your team size.
              </p>
            </SlideUp>
          </div>
        </div>
      </Container>
    </Section>
  );
}
