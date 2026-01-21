'use client';

import {useEffect, useState} from 'react';
import {PlusButton} from '@/app/admin/recruitment/_components/add-generation/PlusButton';
import {AddGenerationModal} from './AddGenerationModal';
import {useGenerationStore} from '@/store/useGenerationStore';
import {getGenerations} from '@/services/api/admin/admin-generation.api';

export const AddGenerationContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    generations,
    selectedGenerationId,
    setGenerations,
    setSelectedGenerationId,
  } = useGenerationStore();

  useEffect(() => {
    const fetchGenerations = async () => {
      const response = await getGenerations();
      if (response && response.data) {
        setGenerations(response.data);

        if (response.data.length > 0 && !selectedGenerationId) {
          setSelectedGenerationId(response.data[0].generationId);
        }
      }
    };

    fetchGenerations();
  }, [setGenerations, setSelectedGenerationId, selectedGenerationId]);

  return (
    <div className='flex w-full flex-col items-start gap-[10px] rounded-[10px] bg-neutral-100 px-8 py-3'>
      <div className='flex items-center gap-[23px] self-stretch'>
        <p className='shrink-0 text-body-l font-medium text-neutral-600'>
          기수 추가하기
        </p>
        <div className='scrollbar-hide flex items-center gap-2.5 overflow-x-auto pb-1'>
          <div
            onClick={() => setIsModalOpen(true)}
            className='shrink-0 cursor-pointer'>
            <PlusButton />
          </div>
          {generations.map((gen) => {
            const isSelected = selectedGenerationId === gen.generationId;
            return (
              <button
                key={gen.generationId}
                onClick={() => setSelectedGenerationId(gen.generationId)}
                className={`flex h-[38px] w-[63px] shrink-0 items-center justify-center rounded-[5px] text-body-l font-semibold ${
                  isSelected
                    ? 'bg-neutral-600 text-white' // 선택된 상태
                    : 'bg-white text-neutral-600' // 기본 상태
                }`}>
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
