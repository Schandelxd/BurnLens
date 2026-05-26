import { PageShell } from "@/components/layout/PageShell";
import { HeroSection } from "@/components/marketing/HeroSection";
import { SocialProofSection } from "@/components/marketing/SocialProofSection";
import { ProblemVisualizationSection } from "@/components/marketing/ProblemVisualizationSection";
import { InteractiveAuditPreview } from "@/components/marketing/InteractiveAuditPreview";
import { FeatureGridSection } from "@/components/marketing/FeatureGridSection";
import { BenchmarkSection } from "@/components/marketing/BenchmarkSection";
import { CTASection } from "@/components/marketing/CTASection";

export default function Home() {
  return (
    <PageShell>
      <HeroSection />
      <SocialProofSection />
      <ProblemVisualizationSection />
      <InteractiveAuditPreview />
      <FeatureGridSection />
      <BenchmarkSection />
      <CTASection />
    </PageShell>
  );
}
