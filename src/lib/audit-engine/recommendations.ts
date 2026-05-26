import { ToolState } from '../store/audit-store';
import { TOOL_CATALOG } from './pricing';
import { Recommendation } from './types';

export function generateRecommendations(toolDetails: Record<string, ToolState>): Recommendation[] {
  const recommendations: Recommendation[] = [];
  
  const toolIds = Object.keys(toolDetails);
  const detailsArray = Object.values(toolDetails);

  // 1. Inactive Seats Check
  detailsArray.forEach((tool) => {
    if (tool.inactiveSeats > 0) {
      const pricing = TOOL_CATALOG[tool.id];
      if (!pricing) return;
      const cost = tool.isEnterprise && pricing.enterprisePricePerSeat ? pricing.enterprisePricePerSeat : pricing.basePricePerSeat;
      recommendations.push({
        id: `inactive-${tool.id}`,
        title: `Revoke Inactive ${pricing.name} Seats`,
        description: `You have ${tool.inactiveSeats} seats that haven't been used in 30+ days.`,
        impactMonthly: tool.inactiveSeats * cost,
        category: 'inactive',
      });
    }
  });

  // 2. Developer Tool Overlap (Copilot + Cursor)
  if (toolIds.includes('github-copilot') && toolIds.includes('cursor')) {
    const cursorSeats = toolDetails['cursor'].activeSeats;
    const copilotSeats = toolDetails['github-copilot'].activeSeats;
    const overlapSeats = Math.min(cursorSeats, copilotSeats);
    if (overlapSeats > 0) {
      const copilotPricing = TOOL_CATALOG['github-copilot'];
      const cost = toolDetails['github-copilot'].isEnterprise && copilotPricing.enterprisePricePerSeat ? copilotPricing.enterprisePricePerSeat : copilotPricing.basePricePerSeat;
      recommendations.push({
        id: 'overlap-dev-tools',
        title: 'Developer Tool Overlap',
        description: `${overlapSeats} engineers have both Copilot and Cursor. Consolidate to a single assistant.`,
        impactMonthly: overlapSeats * cost,
        category: 'overlap',
      });
    }
  }

  // 3. General AI Tool Overlap (ChatGPT + Claude)
  if (toolIds.includes('chatgpt-plus') && toolIds.includes('claude-pro')) {
    const chatGptSeats = toolDetails['chatgpt-plus'].activeSeats;
    const claudeSeats = toolDetails['claude-pro'].activeSeats;
    const overlapSeats = Math.min(chatGptSeats, claudeSeats);
    if (overlapSeats > 0) {
      const claudePricing = TOOL_CATALOG['claude-pro'];
      recommendations.push({
        id: 'overlap-general-tools',
        title: 'Redundant Chat Assistants',
        description: `${overlapSeats} users have overlapping ChatGPT Plus and Claude Pro licenses.`,
        impactMonthly: overlapSeats * claudePricing.basePricePerSeat,
        category: 'overlap',
      });
    }
  }

  return recommendations.sort((a, b) => b.impactMonthly - a.impactMonthly);
}
