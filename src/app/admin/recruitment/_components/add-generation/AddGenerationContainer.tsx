'use client';

import {useCallback, useEffect, useState} from 'react';
import {useGenerationStore} from '@/store/useGenerationStore';
import {getGenerations} from '@/services/api/admin/admin-generation.api';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {useRecruitmentStatusQuery} from '@/hooks/queries/useRecruitmentStatus.query';
import {PlusButton} from '@/app/admin/recruitment/_components/add-generation/PlusButton';
import {AddGenerationModal} from './AddGenerationModal';

export const AddGenerationContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {data: statusData, isLoading: isStatusLoading} =
    useRecruitmentStatusQuery();

  const {
    generations,
    selectedGenerationId,
    setGenerations,
    setSelectedGenerationId,
  } = useGenerationStore();

  const {setGeneration} = useRecruitmentStore();

  const fetchGenerations = useCallback(async () => {
    if (isStatusLoading || !statusData) return;

    const res = await getGenerations();
    if (res?.data) {
      setGenerations(res.data);
      const {isActive, generationId} = statusData.data;

      if (isActive) {
        setSelectedGenerationId(generationId);
        setGeneration(String(generationId));
      } else if (res.data.length > 0 && !selectedGenerationId) {
        setSelectedGenerationId(res.data[0].generationId);
        setGeneration(String(res.data[0].generationId));
      }
    }
  }, [
    isStatusLoading,
    statusData,
    selectedGenerationId,
    setGenerations,
    setSelectedGenerationId,
    setGeneration,
  ]);

  useEffect(() => {
    fetchGenerations();
  }, [fetchGenerations]);

  const isRecruiting = statusData?.data.isActive ?? false;
  const currentGeneration = statusData?.data.generationId;

  return (
    <div className='flex w-full flex-col items-start gap-[10px] rounded-[10px] bg-neutral-100 px-8 py-3'>
      <div className='flex items-center gap-[23px] self-stretch'>
        <p className='shrink-0 text-body-l font-medium text-neutral-600'>
          기수 추가하기
        </p>
        <div className='scrollbar-hide flex items-center gap-2.5 overflow-x-auto pb-1'>
          <div
            onClick={() => !isRecruiting && setIsModalOpen(true)}
            className='shrink-0'>
            <PlusButton disabled={isRecruiting} />
          </div>
          {generations.map((gen) => {
            const isSelected = isRecruiting
              ? currentGeneration === gen.generationId
              : selectedGenerationId === gen.generationId;
            return (
              <button
                key={gen.generationId}
                onClick={() =>
                  !isRecruiting &&
                  (setSelectedGenerationId(gen.generationId),
                  setGeneration(String(gen.generationId)))
                }
                disabled={isRecruiting}
                className={`flex h-[38px] w-[63px] shrink-0 items-center justify-center rounded-[5px] text-body-l font-semibold transition-all ${isSelected ? 'bg-neutral-200 text-neutral-800' : 'bg-white text-neutral-600'} ${isRecruiting ? 'cursor-default opacity-50' : 'cursor-pointer hover:bg-neutral-200'} `}>
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
