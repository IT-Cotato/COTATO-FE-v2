'use client';

import {AddGenerationContainer} from './add-generation/AddGenerationContainer';
import {GenerationInfoSection} from './GenerationInfoSection';

interface ActiveMembersActionBarProps {
  generations: number[];
  selectedGeneration: number | null;
  onGenerationChange: (id: number) => void;
  onAddGeneration: (generationId: number) => void;
}

export const ActiveMembersActionBar = ({
  generations,
  selectedGeneration,
  onGenerationChange,
  onAddGeneration,
}: ActiveMembersActionBarProps) => {
  return (
    <div className='mt-2.5 flex flex-col gap-3.5'>
      <AddGenerationContainer
        generations={generations}
        selectedGeneration={selectedGeneration}
        onGenerationChange={onGenerationChange}
        onAddGeneration={onAddGeneration}
      />
      {selectedGeneration && (
        <GenerationInfoSection selectedGeneration={selectedGeneration} />
      )}
    </div>
  );
};
