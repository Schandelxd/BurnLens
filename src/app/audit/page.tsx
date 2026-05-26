import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { WizardSteps } from "@/components/audit/WizardSteps";

export default function AuditPage() {
  return (
    <PageShell>
      <Section className="min-h-[80vh]">
        <Container>
          <WizardSteps />
        </Container>
      </Section>
    </PageShell>
  );
}
