import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { SlideUp } from "@/components/motion/SlideUp";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <Section className="relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-32">
      <Container className="relative z-10 flex flex-col items-center text-center">
        <FadeIn>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
            Visibility into AI spend.
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Gauge audits your team's AI tooling subscriptions, API consumption, and seat 
            inefficiencies to generate deterministic optimization recommendations.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/audit">
              <Button size="lg" className="h-12 px-8 text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                Run your first audit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="ghost" className="h-12 px-8 text-base">
              View documentation
            </Button>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
