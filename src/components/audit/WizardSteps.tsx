"use client";

import { useState, useEffect } from "react";
import { useRouter } from "navigation"; // Note: using next/navigation
import { useRouter as useNextRouter } from "next/navigation";
import { useAuditStore } from "@/lib/store/audit-store";
import { TOOL_CATALOG } from "@/lib/audit-engine/pricing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FadeIn } from "@/components/motion/FadeIn";
import { SlideUp } from "@/components/motion/SlideUp";

export function WizardSteps() {
  const router = useNextRouter();
  const { 
    step, setStep, 
    companySize, setCompanySize, 
    selectedToolIds, toggleTool,
    toolDetails, updateToolDetails,
    monthlyApiSpend, setMonthlyApiSpend
  } = useAuditStore();

  const [isProcessing, setIsProcessing] = useState(false);

  // Need to ensure client-side rendering for Zustand store hydration if needed, but safe here.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Start Processing
      setIsProcessing(true);
      setTimeout(() => {
        router.push('/audit/results');
      }, 3000);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <FadeIn>
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary mx-auto" />
          <h2 className="mt-8 text-2xl font-semibold tracking-tight text-foreground">
            Analyzing Stack Inefficiencies
          </h2>
          <p className="mt-4 text-muted-foreground">
            Calculating deterministic overlap vectors and idle seat allocations...
          </p>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl pt-16">
      <SlideUp>
        <div className="mb-8 flex items-center justify-between text-sm font-medium text-muted-foreground">
          <span>Step {step} of 3</span>
          <span>
            {step === 1 && "Tool Selection"}
            {step === 2 && "Seat Allocation"}
            {step === 3 && "API Usage"}
          </span>
        </div>

        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Select your AI stack</h2>
              <p className="mt-2 text-muted-foreground">Which generative AI tools is your team currently paying for?</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {Object.values(TOOL_CATALOG).map((tool) => (
                <div 
                  key={tool.id} 
                  onClick={() => toggleTool(tool.id)}
                  className={`cursor-pointer rounded-xl border p-4 transition-all ${
                    selectedToolIds.includes(tool.id) 
                      ? "border-primary bg-primary/5" 
                      : "border-border/50 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{tool.name}</span>
                    <div className={`h-4 w-4 rounded-full border ${selectedToolIds.includes(tool.id) ? "border-primary bg-primary" : "border-muted-foreground"}`} />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground capitalize">{tool.category}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Seat Allocation</h2>
              <p className="mt-2 text-muted-foreground">How many seats do you have, and how many are actually active?</p>
            </div>
            
            <div className="space-y-6">
               <div>
                  <Label>Total Company Size (Engineers + Operators)</Label>
                  <Input 
                    type="number" 
                    value={companySize} 
                    onChange={(e) => setCompanySize(Number(e.target.value))}
                    className="mt-2 max-w-[200px]"
                  />
               </div>
               <div className="border-t border-white/5 pt-6 space-y-6">
                {selectedToolIds.length === 0 && <p className="text-muted-foreground">No tools selected.</p>}
                {selectedToolIds.map(toolId => {
                  const tool = TOOL_CATALOG[toolId];
                  const details = toolDetails[toolId];
                  if (!details) return null;
                  return (
                    <div key={toolId} className="rounded-lg border border-border/50 p-4 bg-muted/10">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">{tool.name}</h4>
                        {tool.enterprisePricePerSeat && (
                          <div className="flex items-center gap-2">
                            <Label htmlFor={`ent-${toolId}`} className="text-xs">Enterprise Plan</Label>
                            <Switch 
                              id={`ent-${toolId}`} 
                              checked={details.isEnterprise}
                              onCheckedChange={(checked) => updateToolDetails(toolId, { isEnterprise: checked })}
                            />
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">Active Seats</Label>
                          <Input 
                            type="number" 
                            value={details.activeSeats} 
                            onChange={(e) => updateToolDetails(toolId, { activeSeats: Number(e.target.value) })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Inactive Seats (>30d idle)</Label>
                          <Input 
                            type="number" 
                            value={details.inactiveSeats} 
                            onChange={(e) => updateToolDetails(toolId, { inactiveSeats: Number(e.target.value) })}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">API & Infrastructure</h2>
              <p className="mt-2 text-muted-foreground">Estimate your monthly raw API spend (OpenAI, Anthropic, etc).</p>
            </div>
            
            <div className="space-y-6">
               <div>
                  <Label>Average Monthly API Spend ($)</Label>
                  <Input 
                    type="number" 
                    value={monthlyApiSpend} 
                    onChange={(e) => setMonthlyApiSpend(Number(e.target.value))}
                    className="mt-2 max-w-[200px] text-lg"
                  />
               </div>
            </div>
          </div>
        )}

        <div className="mt-12 flex items-center justify-between border-t border-border/50 pt-6">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={step === 1}
          >
            Back
          </Button>
          <Button onClick={handleNext} className="px-8">
            {step === 3 ? "Run Audit" : "Continue"}
          </Button>
        </div>
      </SlideUp>
    </div>
  );
}
