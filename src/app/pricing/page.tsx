import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { SlideUp } from "@/components/motion/SlideUp";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <PageShell>
      <Section className="py-24 sm:py-32">
        <Container className="text-center">
          <FadeIn>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Simple, transparent pricing.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Gauge pays for itself within the first month by identifying wasted AI spend. 
            </p>
          </FadeIn>

          <SlideUp delay={0.1}>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto text-left">
              <div className="rounded-2xl border border-white/5 bg-zinc-900/20 p-8 sm:p-10">
                <h3 className="text-2xl font-medium text-zinc-100">Pro</h3>
                <p className="mt-4 text-sm text-zinc-400">
                  For startups and engineering teams optimizing their stack.
                </p>
                <div className="mt-8 flex items-baseline text-5xl font-semibold tracking-tight text-foreground">
                  $49
                  <span className="ml-2 text-lg font-normal text-muted-foreground">/mo</span>
                </div>
                <Button className="mt-8 w-full shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                  Start 14-day free trial
                </Button>
              </div>
              
              <div className="rounded-2xl border border-emerald-500/20 bg-zinc-900/50 p-8 sm:p-10 relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                <h3 className="text-2xl font-medium text-zinc-100">Enterprise</h3>
                <p className="mt-4 text-sm text-zinc-400">
                  For large organizations needing SAML SSO and custom API integrations.
                </p>
                <div className="mt-8 flex items-baseline text-5xl font-semibold tracking-tight text-foreground">
                  Custom
                </div>
                <Button variant="secondary" className="mt-8 w-full">
                  Contact Sales
                </Button>
              </div>
            </div>
          </SlideUp>
        </Container>
      </Section>
    </PageShell>
  );
}
