import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SlideUp } from "@/components/motion/SlideUp";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <Section className="py-24 sm:py-32 border-t border-white/5">
      <Container className="text-center">
        <SlideUp>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Stop guessing. Start measuring.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Join the engineering teams who have already optimized their AI stack 
            and reclaimed their budgets.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="h-12 px-8 text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
              Get started for free
            </Button>
            <Button size="lg" variant="ghost" className="h-12 px-8 text-base">
              Talk to sales
            </Button>
          </div>
        </SlideUp>
      </Container>
    </Section>
  );
}
