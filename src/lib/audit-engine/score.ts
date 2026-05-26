import { ToolState } from '../store/audit-store';
import { TOOL_CATALOG } from './pricing';
import { generateRecommendations } from './recommendations';
import { AuditResults } from './types';

export function calculateAuditResults(
  toolDetails: Record<string, ToolState>,
  monthlyApiSpend: number,
  companySize: number
): AuditResults {
  let currentMonthlySpend = monthlyApiSpend;

  // Calculate current spend
  Object.values(toolDetails).forEach((tool) => {
    const pricing = TOOL_CATALOG[tool.id];
    if (pricing) {
      const price = tool.isEnterprise && pricing.enterprisePricePerSeat ? pricing.enterprisePricePerSeat : pricing.basePricePerSeat;
      currentMonthlySpend += (tool.activeSeats + tool.inactiveSeats) * price;
    }
  });

  // Calculate savings from recommendations
  const recommendations = generateRecommendations(toolDetails);
  const monthlySavings = recommendations.reduce((acc, rec) => acc + rec.impactMonthly, 0);

  const optimalMonthlySpend = currentMonthlySpend - monthlySavings;

  // Calculate Gauge Score (0-100)
  // A score of 100 means 0 savings found. Lower score = more waste.
  let gaugeScore = 100;
  if (currentMonthlySpend > 0) {
    const efficiencyRatio = optimalMonthlySpend / currentMonthlySpend;
    gaugeScore = Math.max(0, Math.round(efficiencyRatio * 100));
  }

  return {
    currentMonthlySpend,
    currentAnnualSpend: currentMonthlySpend * 12,
    optimalMonthlySpend,
    optimalAnnualSpend: optimalMonthlySpend * 12,
    monthlySavings,
    annualSavings: monthlySavings * 12,
    gaugeScore,
    recommendations,
  };
}
