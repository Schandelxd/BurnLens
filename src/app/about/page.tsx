import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/motion/FadeIn";

export default function AboutPage() {
  return (
    <PageShell>
      <Section className="py-24 sm:py-32">
        <Container>
          <FadeIn>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              About Gauge
            </h1>
            <div className="mt-10 max-w-2xl space-y-8 text-lg text-muted-foreground">
              <p>
                We built Gauge because we saw the exact same problem across dozens of 
                startups: generative AI tooling is being adopted at breakneck speed, 
                but visibility into those costs is nonexistent.
              </p>
              <p>
                Engineering teams are double-paying for GitHub Copilot and Cursor. 
                Marketing teams have overlapping ChatGPT Plus and Claude Pro subscriptions. 
                And hidden API costs are eating into margins.
              </p>
              <p>
                Our mission is to bring deterministic visibility to AI spend. We don't 
                build generic dashboards; we build precise optimization engines that 
                calculate exact usage and recommend actionable savings.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </PageShell>
  );
}
