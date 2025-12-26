import {create} from 'zustand';

interface RecruitmentState {
  isRecruiting: boolean;
  generation: string;
  setIsRecruiting: (status: boolean) => void;
  setGeneration: (gen: string) => void;
}

export const useRecruitmentStore = create<RecruitmentState>((set) => ({
  isRecruiting: false,
  generation: '13', //초기값 - 13기
  setIsRecruiting: (status) => set({isRecruiting: status}),
  setGeneration: (gen) => set({generation: gen}),
}));
