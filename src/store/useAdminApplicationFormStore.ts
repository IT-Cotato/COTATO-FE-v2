import {create} from 'zustand';

interface AdminApplicationFormState {
  generation: string;
  isEditingRecruitmentInfo: boolean;
  isEditingApplicationForm: boolean;
  isFormValid: boolean;

  setGeneration: (gen: string) => void;
  setIsFormValid: (v: boolean) => void;

  startRecruitEdit: () => void;
  endRecruitEdit: () => void;

  startApplicationEdit: () => void;
  endApplicationEdit: () => void;
}

export const useAdminApplicationFormStore = create<AdminApplicationFormState>(
  (set) => ({
    generation: '13',
    isEditingRecruitmentInfo: false,
    isEditingApplicationForm: false,
    isFormValid: true,

    setGeneration: (gen) => set({generation: gen}),
    setIsFormValid: (v) => set({isFormValid: v}),
    startRecruitEdit: () => set({isEditingRecruitmentInfo: true}),
    endRecruitEdit: () => set({isEditingRecruitmentInfo: false}),

    startApplicationEdit: () => set({isEditingApplicationForm: true}),
    endApplicationEdit: () => set({isEditingApplicationForm: false}),
  })
);
