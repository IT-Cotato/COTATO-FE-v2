'use client';

import {useState} from 'react';
import {AddGenerationContainer} from './add-generation/AddGenerationContainer';
import {GenerationInfoSection} from './GenerationInfoSection';

interface GenerationDates {
  startDate: Date;
  endDate: Date;
}

interface ActiveMembersActionBarProps {
  generations: number[];
  selectedGeneration: number | null;
  onGenerationChange: (id: number) => void;
  onAddGeneration: (data: {
    generation: number;
    startDate: Date;
    endDate: Date;
  }) => void;
}

export const ActiveMembersActionBar = ({
  generations,
  selectedGeneration,
  onGenerationChange,
  onAddGeneration,
}: ActiveMembersActionBarProps) => {
  const [generationDatesMap, setGenerationDatesMap] = useState<
    Record<number, GenerationDates>
  >({});

  const handleAddGeneration = (data: {
    generation: number;
    startDate: Date;
    endDate: Date;
  }) => {
    setGenerationDatesMap((prev) => ({
      ...prev,
      [data.generation]: {
        startDate: data.startDate,
        endDate: data.endDate,
      },
    }));
    onAddGeneration(data);
  };

  const currentDates = selectedGeneration
    ? generationDatesMap[selectedGeneration]
    : undefined;

  return (
    <div className='mt-2.5 flex flex-col gap-3.5'>
      <AddGenerationContainer
        generations={generations}
        selectedGeneration={selectedGeneration}
        onGenerationChange={onGenerationChange}
        onAddGeneration={handleAddGeneration}
      />
      {selectedGeneration && (
        <GenerationInfoSection
          selectedGeneration={selectedGeneration}
          initialStartDate={currentDates?.startDate ?? null}
          initialEndDate={currentDates?.endDate ?? null}
        />
      )}
    </div>
  );
};
