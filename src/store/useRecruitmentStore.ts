import {create} from 'zustand';

interface RecruitmentState {
  isRecruiting: boolean;
  generation: string;
  isAdditional: boolean;
  setIsRecruiting: (status: boolean) => void;
  setGeneration: (gen: string) => void;
  setIsAdditional: (status: boolean) => void;
}

export const useRecruitmentStore = create<RecruitmentState>((set) => ({
  isRecruiting: false,
  generation: '13', //초기값 - 13기
  isAdditional: false,
  setIsRecruiting: (status) => set({isRecruiting: status}),
  setGeneration: (gen) => set({generation: gen}),
  setIsAdditional: (status) => set({isAdditional: status}),
}));
