'use client';

import {useEffect, useState} from 'react';
import {useGenerationStore} from '@/store/useGenerationStore';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {useRecruitmentStatusQuery} from '@/hooks/queries/useRecruitmentStatus.query';
import {PlusButton} from '@/app/admin/(with-sidebar)/recruitment/_components/add-generation/PlusButton';
import {AddGenerationModal} from './AddGenerationModal';
import clsx from 'clsx';
import {useAdminGenerationsQuery} from '@/hooks/queries/useAdminGeneration.query';

export const AddGenerationContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {data: statusData, isLoading: isStatusLoading} =
    useRecruitmentStatusQuery();
  const {data: generationsData} = useAdminGenerationsQuery();

  const {
    generations,
    selectedGenerationId,
    setGenerations,
    setSelectedGenerationId,
  } = useGenerationStore();

  const {setGeneration} = useRecruitmentStore();

  useEffect(() => {
    if (!generationsData?.data || isStatusLoading) return;

    const fetchedGenerations = generationsData.data;
    setGenerations(fetchedGenerations);

    const {isActive = false, generationId: activeGenId = null} =
      statusData || {};

    if (!selectedGenerationId) {
      if (isActive && activeGenId !== null) {
        setSelectedGenerationId(activeGenId);
        setGeneration(String(activeGenId));
      } else if (fetchedGenerations.length > 0) {
        const firstGenId = fetchedGenerations[0].generationId;
        setSelectedGenerationId(firstGenId);
        setGeneration(String(firstGenId));
      }
    }
  }, [
    generationsData,
    statusData,
    isStatusLoading,
    setGenerations,
    setSelectedGenerationId,
    setGeneration,
    selectedGenerationId,
  ]);

  const isRecruiting = statusData?.isActive ?? false;
  const currentGeneration = statusData?.generationId;

  return (
    <div className='flex w-full flex-col items-start gap-2.5 rounded-[10px] bg-neutral-100 px-5 py-3 lg:px-8 lg:py-3'>
      <div className='flex items-center gap-2.5 self-stretch lg:gap-5.75'>
        <p className='text-body-l-b lg:text-body-l shrink-0 text-neutral-600 lg:font-medium'>
          기수 추가하기
        </p>
        <div className='scrollbar-hide flex items-center gap-2.5 overflow-x-auto'>
          <div
            onClick={() => !isRecruiting && setIsModalOpen(true)}
            className={clsx(
              'shrink-0',
              isRecruiting ? 'cursor-not-allowed' : 'cursor-pointer'
            )}>
            <PlusButton disabled={isRecruiting} />
          </div>
          {generations.map((gen) => {
            const isSelected = isRecruiting
              ? currentGeneration === gen.generationId
              : selectedGenerationId === gen.generationId;

            return (
              <button
                key={gen.generationId}
                type='button'
                onClick={() => {
                  if (!isRecruiting) {
                    setSelectedGenerationId(gen.generationId);
                    setGeneration(String(gen.generationId));
                  }
                }}
                disabled={isRecruiting}
                className={clsx(
                  'text-body-m lg:text-body-l flex h-7 w-12.5 shrink-0 items-center justify-center rounded-[5px] transition-all lg:h-9.5 lg:w-15.75 lg:font-semibold',
                  isSelected
                    ? 'bg-neutral-200 text-neutral-800'
                    : 'bg-white text-neutral-600',
                  isRecruiting
                    ? 'cursor-default opacity-50'
                    : 'cursor-pointer hover:bg-neutral-200'
                )}>
                {gen.generationId}기
              </button>
            );
          })}
        </div>
      </div>
      <AddGenerationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
