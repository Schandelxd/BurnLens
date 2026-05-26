import { ToolState } from '../store/audit-store';

export type ToolCategory = 'development' | 'marketing' | 'general' | 'api';

export interface ToolPricing {
  id: string;
  name: string;
  category: ToolCategory;
  basePricePerSeat: number; // monthly
  enterprisePricePerSeat?: number;
  apiCostPer1kTokens?: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  impactMonthly: number;
  category: 'overlap' | 'inactive' | 'downgrade';
}

export interface AuditResults {
  currentMonthlySpend: number;
  currentAnnualSpend: number;
  optimalMonthlySpend: number;
  optimalAnnualSpend: number;
  monthlySavings: number;
  annualSavings: number;
  gaugeScore: number;
  recommendations: Recommendation[];
}
