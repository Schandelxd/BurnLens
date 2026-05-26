import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SlideUp } from "@/components/motion/SlideUp";

const logos = [
  { name: "Acme Corp", width: 100 },
  { name: "Globex", width: 110 },
  { name: "Soylent", width: 95 },
  { name: "Initech", width: 105 },
  { name: "Umbrella", width: 115 },
];

export function SocialProofSection() {
  return (
    <Section className="py-12 border-y border-white/5 bg-background/50">
      <Container>
        <SlideUp>
          <p className="text-center text-sm font-medium text-muted-foreground">
            Trusted by engineering teams at
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-12 sm:gap-20">
            {logos.map((logo, i) => (
              <div 
                key={i} 
                className="flex items-center justify-center opacity-30 grayscale transition hover:opacity-70"
                style={{ width: logo.width }}
              >
                {/* Placeholder for actual SVGs */}
                <span className="font-mono text-xl font-bold tracking-widest text-foreground">
                  {logo.name.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </SlideUp>
      </Container>
    </Section>
  );
}
