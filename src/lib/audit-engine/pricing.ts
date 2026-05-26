import { ToolPricing } from './types';

export const TOOL_CATALOG: Record<string, ToolPricing> = {
  'github-copilot': {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'development',
    basePricePerSeat: 19,
    enterprisePricePerSeat: 39,
  },
  'cursor': {
    id: 'cursor',
    name: 'Cursor Pro',
    category: 'development',
    basePricePerSeat: 20,
  },
  'chatgpt-plus': {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus',
    category: 'general',
    basePricePerSeat: 20,
  },
  'chatgpt-enterprise': {
    id: 'chatgpt-enterprise',
    name: 'ChatGPT Enterprise',
    category: 'general',
    basePricePerSeat: 60,
  },
  'claude-pro': {
    id: 'claude-pro',
    name: 'Claude Pro',
    category: 'general',
    basePricePerSeat: 20,
  },
  'midjourney': {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'marketing',
    basePricePerSeat: 30,
  },
};
