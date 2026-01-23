'use client';

import {useState, useEffect} from 'react';
import {ManageResult} from './result-manage/ManageResult';
import {ManageResultMail} from './mail-manage/ManageResultMail';
import {useGenerationStore} from '@/store/useGenerationStore';
import {useRecruitmentStatusQuery} from '@/hooks/queries/useRecruitmentStatus.query';
import {Spinner} from '@/components/ui/Spinner';
import {useAdminGenerationsQuery} from '@/hooks/queries/useAdminGeneration.query';

export const ResultsContainer = () => {
  const {isLoading: isStatusLoading} = useRecruitmentStatusQuery();
  const {data: generationsData, isLoading: isGenerationsLoading} =
    useAdminGenerationsQuery();

  const {setGenerations} = useGenerationStore();
  const [selectedGen, setSelectedGen] = useState<string | null>(null);

  useEffect(() => {
    if (generationsData?.data) {
      setGenerations(generationsData.data);
    }
  }, [generationsData, setGenerations]);

  if (isStatusLoading || isGenerationsLoading) {
    return (
      <div className='flex h-100 w-full items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  const generations = generationsData?.data || [];
  const currentGeneration =
    selectedGen ||
    (generations.length > 0 ? String(generations[0].generationId) : '');

  if (!currentGeneration) {
    return (
      <div className='flex h-100 w-full items-center justify-center'>
        <p className='text-neutral-500'>등록된 기수 정보가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-3.5'>
      <ManageResult
        generation={currentGeneration}
        onGenerationChange={setSelectedGen}
      />
      <ManageResultMail generationId={Number(currentGeneration)} />
    </div>
  );
};
