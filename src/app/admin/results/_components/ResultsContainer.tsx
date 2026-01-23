'use client';

import {useState, useEffect, useCallback} from 'react';
import {ManageResult} from './result-manage/ManageResult';
import {ManageResultMail} from './mail-manage/ManageResultMail';
import {useGenerationStore} from '@/store/useGenerationStore';
import {useRecruitmentStatusQuery} from '@/hooks/queries/useRecruitmentStatus.query';
import {getGenerations} from '@/services/api/admin/admin-generation.api';
import {Spinner} from '@/components/ui/Spinner';

export const ResultsContainer = () => {
  const {isLoading: isStatusLoading} = useRecruitmentStatusQuery();
  const {generations, setGenerations} = useGenerationStore();

  const [selectedGen, setSelectedGen] = useState<string | null>(null);
  const [isGenLoading, setIsGenLoading] = useState(true);

  const fetchInitialData = useCallback(async () => {
    try {
      const res = await getGenerations();
      if (res?.data) {
        setGenerations(res.data);
      }
    } catch (error) {
      console.error('기수 정보 불러오기 실패:', error);
    } finally {
      setIsGenLoading(false);
    }
  }, [setGenerations]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // 상태 조회 중이거나 기수 목록 조회 중일 때
  if (isStatusLoading || isGenLoading) {
    return (
      <div className='flex h-100 w-full items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  const currentGeneration =
    selectedGen ||
    (generations.length > 0 ? String(generations[0].generationId) : '');

  // 기수 정보가 아예 없는 경우
  if (!currentGeneration) {
    return (
      <div className='flex h-100 w-full items-center justify-center'>
        <p className='text-neutral-500'>등록된 기수 정보가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-13.5'>
      <ManageResult
        generation={currentGeneration}
        onGenerationChange={setSelectedGen}
      />
      <ManageResultMail generationId={Number(currentGeneration)} />
    </div>
  );
};
