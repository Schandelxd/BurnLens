"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { useAuditStore } from "@/lib/store/audit-store";
import { calculateAuditResults, AuditResults } from "@/lib/audit-engine";
import { ExecutiveSummary } from "@/components/audit/ExecutiveSummary";
import { ScoreAndSavings } from "@/components/audit/ScoreAndSavings";
import { OptimizationCards } from "@/components/audit/OptimizationCards";
import { SlideUp } from "@/components/motion/SlideUp";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ResultsPage() {
  const router = useRouter();
  const { toolDetails, monthlyApiSpend, companySize, selectedToolIds } = useAuditStore();
  const [results, setResults] = useState<AuditResults | null>(null);

  useEffect(() => {
    if (selectedToolIds.length === 0 && monthlyApiSpend === 0) {
      // Redirect back if accessed directly without data
      router.push('/audit');
      return;
    }
    
    const calculated = calculateAuditResults(toolDetails, monthlyApiSpend, companySize);
    setResults(calculated);
  }, [toolDetails, monthlyApiSpend, companySize, selectedToolIds, router]);

  if (!results) return null;

  const totalSeats = Object.values(toolDetails).reduce((acc, t) => acc + t.activeSeats + t.inactiveSeats, 0);
  const topIssue = results.recommendations.length > 0 ? results.recommendations[0].title : undefined;

  return (
    <PageShell>
      <Section className="py-16 sm:py-24">
        <Container className="max-w-4xl">
          <ExecutiveSummary 
            toolCount={selectedToolIds.length}
            totalSeats={totalSeats}
            savings={results.annualSavings}
            topIssue={topIssue}
          />
          
          <ScoreAndSavings 
            score={results.gaugeScore}
            monthlySavings={results.monthlySavings}
            annualSavings={results.annualSavings}
          />

          <div className="mt-16">
            <OptimizationCards recommendations={results.recommendations} />
          </div>

          <SlideUp delay={0.4}>
            <div className="mt-16 flex items-center justify-between border-t border-border/50 pt-8">
              <p className="text-sm text-muted-foreground">
                These recommendations are fully deterministic based on your input.
              </p>
              <div className="flex gap-4">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
                <Button>
                  Create Account to Automate
                </Button>
              </div>
            </div>
          </SlideUp>
        </Container>
      </Section>
    </PageShell>
  );
}
