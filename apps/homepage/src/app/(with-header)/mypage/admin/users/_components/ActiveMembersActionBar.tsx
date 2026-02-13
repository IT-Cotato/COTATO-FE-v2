import {AddGenerationContainer} from './add-generation/AddGenerationContainer';
import {GenerationInfoSection} from './GenerationInfoSection';

interface ActiveMembersActionBarProps {
  generations: number[];
  selectedGeneration: number | null;
  onGenerationChange: (id: number) => void;
  onAddGeneration: () => void;
}

export const ActiveMembersActionBar = ({
  generations,
  selectedGeneration,
  onGenerationChange,
  onAddGeneration,
}: ActiveMembersActionBarProps) => {
  return (
    <div className='flex flex-col gap-3.5 mt-2.5'>
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
