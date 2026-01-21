'use client';

import {useCallback, useEffect, useState} from 'react';
import {PlusButton} from '@/app/admin/recruitment/_components/add-generation/PlusButton';
import {AddGenerationModal} from './AddGenerationModal';
import {useGenerationStore} from '@/store/useGenerationStore';
import {getGenerations} from '@/services/api/admin/admin-generation.api';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';

export const AddGenerationContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    generations,
    selectedGenerationId,
    setGenerations,
    setSelectedGenerationId,
  } = useGenerationStore();
  const {isRecruiting, setGeneration} = useRecruitmentStore();

  const fetchGenerations = useCallback(async () => {
    const res = await getGenerations();
    if (res?.data) {
      setGenerations(res.data);
      if (res.data.length > 0 && !selectedGenerationId && !isRecruiting) {
        setGeneration(String(res.data[0].generationId));
      }
    }
  }, [setGenerations, setGeneration, selectedGenerationId, isRecruiting]);

  useEffect(() => {
    fetchGenerations();
  }, [fetchGenerations]);

  const handleSelect = (genId: number) => {
    setSelectedGenerationId(genId);
    if (!isRecruiting) setGeneration(String(genId)); // 모집 중 아닐 때만 동기화
  };

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
            return (
              <button
                key={gen.generationId}
                onClick={() => !isRecruiting && handleSelect(gen.generationId)}
                disabled={isRecruiting}
                className={`flex h-[38px] w-[63px] shrink-0 items-center justify-center rounded-[5px] bg-white text-body-l font-semibold text-neutral-600 transition-all ${
                  isRecruiting
                    ? 'cursor-default opacity-50'
                    : 'cursor-pointer hover:bg-neutral-200'
                } `}>
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
