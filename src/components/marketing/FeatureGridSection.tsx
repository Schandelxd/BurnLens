import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SlideUp } from "@/components/motion/SlideUp";
import { Layers, Zap, Shield, Search } from "lucide-react";

const features = [
  {
    title: "Instant Visibility",
    description: "Connect your tools and instantly see where every dollar of your AI budget is going.",
    icon: Search,
  },
  {
    title: "Detect Inefficiencies",
    description: "Automatically identify overlapping capabilities and redundant subscriptions.",
    icon: Layers,
  },
  {
    title: "Deterministic Analysis",
    description: "We don't guess. We calculate exact seat allocation and API usage costs.",
    icon: Zap,
  },
  {
    title: "Trustworthy Recommendations",
    description: "Actionable insights that don't compromise your team's engineering velocity.",
    icon: Shield,
  },
];

export function FeatureGridSection() {
  return (
    <Section className="py-24 sm:py-32 bg-zinc-950/50">
      <Container>
        <SlideUp>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-center">
            Everything you need. Nothing you don't.
          </h2>
        </SlideUp>
        
        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {features.map((feature, i) => (
            <SlideUp key={i} delay={0.1 * (i + 1)}>
              <div className="h-full rounded-2xl border border-white/5 bg-zinc-900/20 p-8 sm:p-10 transition hover:bg-zinc-900/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/5 bg-zinc-800/50">
                  <feature.icon className="h-5 w-5 text-zinc-300" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-zinc-100">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base text-zinc-400">
                  {feature.description}
                </p>
              </div>
            </SlideUp>
          ))}
        </div>
      </Container>
    </Section>
  );
}
