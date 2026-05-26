import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { SlideUp } from "@/components/motion/SlideUp";

export default function Home() {
  return (
    <PageShell>
      <Section className="py-24">
        <Container>
          <FadeIn>
            <div className="max-w-2xl">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Observe your AI spending with precision.
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Gauge provides deep, analytical insights into your generative AI costs, 
                helping you optimize performance without sacrificing quality.
              </p>
            </div>
          </FadeIn>
          <SlideUp delay={0.1}>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Placeholder for future analytical components */}
              <div className="h-48 rounded-md border border-border bg-card p-6 shadow-soft">
                <div className="h-4 w-1/3 rounded-full bg-muted" />
                <div className="mt-4 h-8 w-1/2 rounded-full bg-primary/10" />
              </div>
              <div className="h-48 rounded-md border border-border bg-card p-6 shadow-soft">
                <div className="h-4 w-1/3 rounded-full bg-muted" />
                <div className="mt-4 h-8 w-1/2 rounded-full bg-primary/10" />
              </div>
              <div className="h-48 rounded-md border border-border bg-card p-6 shadow-soft">
                <div className="h-4 w-1/3 rounded-full bg-muted" />
                <div className="mt-4 h-8 w-1/2 rounded-full bg-primary/10" />
              </div>
            </div>
          </SlideUp>
        </Container>
      </Section>
    </PageShell>
  );
}
