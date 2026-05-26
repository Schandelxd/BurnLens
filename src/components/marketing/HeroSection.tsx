import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { SlideUp } from "@/components/motion/SlideUp";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <Section className="relative overflow-hidden pt-40 pb-32 md:pt-64 md:pb-48">
      <Container className="relative z-10 flex flex-col items-center text-center">
        <FadeIn>
          <h1 className="max-w-4xl text-5xl font-medium tracking-tighter text-foreground sm:text-7xl lg:text-8xl">
            Visibility into AI spend.
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
            Gauge audits your team's AI tooling subscriptions, API consumption, and seat 
            inefficiencies to generate deterministic optimization recommendations.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/audit">
              <Button size="lg" className="h-12 px-8 text-base bg-white text-zinc-950 hover:bg-zinc-200 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)]">
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
