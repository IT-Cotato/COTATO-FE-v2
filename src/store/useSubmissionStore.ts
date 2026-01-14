import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface SubmissionState {
  hasSubmitted: boolean;
  setHasSubmitted: (submitted: boolean) => void;
}

export const useSubmissionStore = create<SubmissionState>()(
  persist(
    (set) => ({
      hasSubmitted: false,
      setHasSubmitted: (submitted: boolean) => set({hasSubmitted: submitted}),
    }),

    {
      name: 'submission-storage',
    }
  )
);
