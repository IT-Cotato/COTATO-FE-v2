import {create} from 'zustand';

interface AdminPenaltiesState {
  selectedGeneration: string;
  selectedGenerationNumber: number | null;
  selectedSession: string;
  sessionId: number | null;
  selectedSessionType: 'FULL' | 'SPECIFIC';
  setSelectedGeneration: (selectedGeneration: string) => void;
  setSelectedSession: (selectedSession: string) => void;
  setSessionId: (sessionId: number | null) => void;
  setSelectedSessionType: (selectedSessionType: 'FULL' | 'SPECIFIC') => void;
}

export const useAdminPenaltiesStore = create<AdminPenaltiesState>((set) => ({
  selectedGeneration: '기수',
  selectedGenerationNumber: null,
  selectedSession: '세션',
  sessionId: null,
  selectedSessionType: 'FULL',

  setSelectedGeneration: (selectedGeneration) => {
    const parsed = Number.parseInt(selectedGeneration.split('기')[0], 10);
    set({
      selectedGeneration,
      selectedGenerationNumber: Number.isNaN(parsed) ? null : parsed,
    });
  },

  setSelectedSession: (selectedSession) => set({selectedSession}),

  setSessionId: (sessionId) =>
    set({
      sessionId,
    }),

  setSelectedSessionType: (selectedSessionType) =>
    set({
      selectedSessionType,
    }),
}));
