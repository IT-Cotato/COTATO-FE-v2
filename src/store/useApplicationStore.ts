import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface ApplicationState {
  applicationId: number | null;
  setApplicationId: (id: number) => void;
}

export const useApplicationStore = create<ApplicationState>()(
  persist(
    (set) => ({
      applicationId: null,
      setApplicationId: (id: number) => set({applicationId: id}),
    }),
    {
      name: 'application-storage',
    }
  )
);
