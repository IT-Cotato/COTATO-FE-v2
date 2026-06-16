'use client';

import {AddGenerationContainer} from './add-generation/AddGenerationContainer';
import dynamic from 'next/dynamic';

const GenerationInfoSection = dynamic(
  () => import('./GenerationInfoSection').then((m) => m.GenerationInfoSection),
  {ssr: false}
);

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
    <div className='flex flex-col gap-3.5 lg:mt-2.5'>
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
