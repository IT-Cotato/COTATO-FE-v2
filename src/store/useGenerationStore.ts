import {create} from 'zustand';
import {Generation} from '@/schemas/admin/admin-generation.schema';

interface GenerationState {
  generations: Generation[];
  selectedGenerationId: number | null;
  setGenerations: (generations: Generation[]) => void;
  addGeneration: (newGen: Generation) => void;
  setSelectedGenerationId: (id: number) => void;
}

export const useGenerationStore = create<GenerationState>((set) => ({
  generations: [],
  selectedGenerationId: null,
  setGenerations: (generations) => set({generations}),
  addGeneration: (newGen) =>
    set((state) => ({
      generations: [...state.generations, newGen],
    })),
  setSelectedGenerationId: (id) => set({selectedGenerationId: id}),
}));
