'use client';

import {PlusButton} from './PlusButton';
import clsx from 'clsx';

interface AddGenerationContainerProps {
  generations: number[];
  selectedGeneration: number | null;
  onGenerationChange: (id: number) => void;
  onAddGeneration: () => void;
}

export const AddGenerationContainer = ({
  generations,
  selectedGeneration,
  onGenerationChange,
  onAddGeneration,
}: AddGenerationContainerProps) => {
  return (
    <div className='flex w-full flex-col items-start gap-2.5 rounded-[10px] bg-neutral-100 px-8 py-3'>
      <div className='flex items-center gap-5.75 self-stretch'>
        <p className='text-body-l shrink-0 font-medium text-neutral-600'>
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
                  'text-body-l flex h-9.5 w-15.75 shrink-0 cursor-pointer items-center justify-center rounded-[5px] font-semibold transition-all',
                  isSelected
                    ? 'bg-neutral-600 text-white'
                    : 'bg-white text-neutral-600'
                )}>
                {generationId}기
              </button>
            );
          })}
          <div className='shrink-0 cursor-pointer' onClick={onAddGeneration}>
            <PlusButton />
          </div>
        </div>
      </div>
    </div>
  );
};
