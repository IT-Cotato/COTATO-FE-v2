import {create} from 'zustand';

interface AdminApplicationFormState {
  generation: string;

  setGeneration: (gen: string) => void;
}

export const useAdminApplicationFormStore = create<AdminApplicationFormState>(
  (set) => ({
    generation: '13',

    setGeneration: (gen) => set({generation: gen}),
  })
);
