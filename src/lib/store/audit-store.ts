import { create } from 'zustand';

export interface ToolState {
  id: string;
  activeSeats: number;
  inactiveSeats: number;
  isEnterprise: boolean;
}

interface AuditState {
  // Wizard State
  step: number;
  companySize: number;
  selectedToolIds: string[];
  toolDetails: Record<string, ToolState>;
  monthlyApiSpend: number;
  
  // Actions
  setStep: (step: number) => void;
  setCompanySize: (size: number) => void;
  toggleTool: (toolId: string) => void;
  updateToolDetails: (toolId: string, details: Partial<ToolState>) => void;
  setMonthlyApiSpend: (spend: number) => void;
  reset: () => void;
}

export const useAuditStore = create<AuditState>((set) => ({
  step: 1,
  companySize: 10,
  selectedToolIds: [],
  toolDetails: {},
  monthlyApiSpend: 0,

  setStep: (step) => set({ step }),
  setCompanySize: (size) => set({ companySize: size }),
  toggleTool: (toolId) => set((state) => {
    const isSelected = state.selectedToolIds.includes(toolId);
    if (isSelected) {
      const newDetails = { ...state.toolDetails };
      delete newDetails[toolId];
      return {
        selectedToolIds: state.selectedToolIds.filter((id) => id !== toolId),
        toolDetails: newDetails,
      };
    }
    return {
      selectedToolIds: [...state.selectedToolIds, toolId],
      toolDetails: {
        ...state.toolDetails,
        [toolId]: { id: toolId, activeSeats: 1, inactiveSeats: 0, isEnterprise: false },
      },
    };
  }),
  updateToolDetails: (toolId, details) => set((state) => ({
    toolDetails: {
      ...state.toolDetails,
      [toolId]: { ...state.toolDetails[toolId], ...details },
    },
  })),
  setMonthlyApiSpend: (spend) => set({ monthlyApiSpend: spend }),
  reset: () => set({ step: 1, companySize: 10, selectedToolIds: [], toolDetails: {}, monthlyApiSpend: 0 }),
}));
