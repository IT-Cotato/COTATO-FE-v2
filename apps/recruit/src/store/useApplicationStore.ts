import {create} from 'zustand';

/**
 * 마이페이지 지원서 id를 저장하는 스토어
 */
interface ApplicationStore {
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
}

export const useApplicationStore = create<ApplicationStore>((set) => ({
  selectedId: null,
  setSelectedId: (id) => set({selectedId: id}),
}));
