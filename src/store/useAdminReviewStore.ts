import {create} from 'zustand';
import {ReviewerType} from '@/schemas/admin/admin-application-type';

const STORAGE_KEY = 'admin-review-draft';
let saveTimeout: NodeJS.Timeout | null = null;

interface AdminReviewState {
  reviews: Record<ReviewerType, string>;
  saveState: 'saving' | 'saved';
  setReview: (reviewer: ReviewerType, value: string) => void;
}

export const useAdminReviewStore = create<AdminReviewState>((set, get) => ({
  reviews: {
    admin1: '',
    admin2: '',
    admin3: '',
    admin4: '',
  },
  saveState: 'saved',

  setReview: (reviewer, value) => {
    set((state) => ({
      reviews: {
        ...state.reviews,
        [reviewer]: value,
      },
      saveState: 'saving',
    }));

    if (saveTimeout) clearTimeout(saveTimeout);

    saveTimeout = setTimeout(() => {
      const {reviews} = get();

      /**
       * TODO: 나중에 API 호출
       * saveReviewAPI(reviews)
       */
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));

      set({saveState: 'saved'});
    }, 600);
  },
}));
