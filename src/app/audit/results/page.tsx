"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { useAuditStore } from "@/lib/store/audit-store";
import { calculateAuditResults } from "@/lib/audit-engine";
import { ExecutiveSummary } from "@/components/audit/ExecutiveSummary";
import { ScoreAndSavings } from "@/components/audit/ScoreAndSavings";
import { OptimizationCards } from "@/components/audit/OptimizationCards";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { saveAudit } from "@/lib/actions/audit.actions";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function ResultsPage() {
  const router = useRouter();
  const { toolDetails, monthlyApiSpend, companySize } = useAuditStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);

  useEffect(() => {
    if (!companySize || companySize === 0) {
      router.replace("/audit");
      return;
    }

    async function checkAuthAndSave() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setIsLoggedIn(true);
        const res = await saveAudit({ toolDetails, monthlyApiSpend, companySize });
        if (res?.success) {
          setIsSaved(true);
        }
      }
      setIsLoading(false);
    }

    // Cinematic calculation sequence
    const phases = [
      { timeout: 0, text: "Analyzing API endpoints..." },
      { timeout: 800, text: "Cross-referencing seat overlap..." },
      { timeout: 1600, text: "Calculating deterministic savings..." }
    ];

    phases.forEach((phase, index) => {
      setTimeout(() => {
        setLoadingPhase(index);
      }, phase.timeout);
    });

    const timer = setTimeout(() => {
      checkAuthAndSave();
    }, 2800);

    return () => clearTimeout(timer);
  }, [companySize, toolDetails, monthlyApiSpend, router]);

  if (isLoading) {
    const loadingTexts = [
      "Analyzing API endpoints...",
      "Cross-referencing seat overlap...",
      "Calculating deterministic savings..."
    ];

    return (
      <PageShell>
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-zinc-500 mb-6" />
          <h2 className="text-xl font-medium tracking-tighter text-zinc-300 transition-opacity duration-300">
            {loadingTexts[loadingPhase]}
          </h2>
          <p className="mt-2 text-sm text-zinc-500 tracking-widest uppercase">
            Gauge Audit Engine
          </p>
        </div>
      </PageShell>
    );
  }

  const results = calculateAuditResults(toolDetails, monthlyApiSpend, companySize);

  return (
    <PageShell>
      <div className="pt-32 pb-24 relative overflow-hidden">
        {/* Minimal background ambient */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.015] rounded-full blur-[120px] pointer-events-none" />

        <Container className="relative z-10 max-w-4xl">
          <div className="space-y-16">
            <ExecutiveSummary 
              toolCount={Object.keys(toolDetails).length} 
              totalSeats={companySize}
              savings={results.annualSavings}
              topIssue={results.recommendations[0]?.title}
            />

            <ScoreAndSavings 
              score={results.score} 
              monthlySavings={results.monthlySavings} 
              annualSavings={results.annualSavings} 
            />

            <OptimizationCards 
              recommendations={results.recommendations} 
            />

            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16">
                {isLoggedIn ? (
                  <Button size="lg" disabled className="w-full sm:w-auto h-12 px-8 bg-zinc-800 text-zinc-400 font-medium">
                    {isSaved ? 'Audit Saved to Dashboard' : 'Saving...'}
                  </Button>
                ) : (
                  <Button size="lg" asChild className="w-full sm:w-auto h-12 px-8 bg-zinc-100 text-zinc-900 hover:bg-zinc-300 font-medium">
                    <Link href="/login">
                      Create Account to Automate Savings <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </FadeIn>
          </div>
        </Container>
      </div>
    </PageShell>
  );
}
