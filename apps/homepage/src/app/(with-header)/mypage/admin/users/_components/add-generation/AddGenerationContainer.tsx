'use client';

import {useState} from 'react';
import {PlusButton} from './PlusButton';
import {AddGenerationModal} from './AddGenerationModal';
import clsx from 'clsx';
import {useCreateGenerationMutation} from '@/hooks/mutations/useGeneration.mutation';

interface AddGenerationContainerProps {
  generations: number[];
  selectedGeneration: number | null;
  onGenerationChange: (id: number) => void;
  onAddGeneration: (generationId: number) => void;
}

export const AddGenerationContainer = ({
  generations,
  selectedGeneration,
  onGenerationChange,
  onAddGeneration,
}: AddGenerationContainerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {mutate: createGeneration} = useCreateGenerationMutation();

  const handleSave = (data: {
    generation: number;
    startDate: Date;
    endDate: Date;
  }) => {
    createGeneration(
      {
        generationNumber: data.generation,
        startDate: data.startDate.toLocaleDateString('sv-SE'),
        endDate: data.endDate.toLocaleDateString('sv-SE'),
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          onAddGeneration(data.generation);
        },
      }
    );
  };

  return (
    <>
      <div className='-mt-1 flex w-full flex-col items-start gap-2.5 rounded-[10px] bg-neutral-100 px-5 py-3 lg:mt-0 lg:px-8'>
        <div className='flex items-center gap-2.5 self-stretch lg:gap-5.75'>
          <p className='text-body-l shrink-0 font-bold text-neutral-600'>
            기수 추가하기
          </p>
          <div className='scrollbar-hide flex items-center gap-2.5 overflow-x-auto'>
            {generations.map((generationId) => {
              const isSelected = selectedGeneration === generationId;
              return (
                <button
                  key={generationId}
                  type='button'
                  onClick={() => onGenerationChange(generationId)}
                  className={clsx(
                    'text-body-m lg:text-body-l flex h-7 w-12.5 shrink-0 cursor-pointer items-center justify-center rounded-[5px] font-semibold transition-all lg:h-9.5 lg:w-15.75',
                    isSelected
                      ? 'bg-neutral-600 text-white'
                      : 'bg-white text-neutral-600'
                  )}>
                  {generationId}기
                </button>
              );
            })}
            <div
              className='shrink-0 cursor-pointer'
              onClick={() => setIsModalOpen(true)}>
              <PlusButton />
            </div>
          </div>
        </div>
      </div>

      <AddGenerationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};
