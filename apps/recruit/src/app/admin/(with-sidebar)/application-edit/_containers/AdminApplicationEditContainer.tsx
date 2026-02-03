'use client';

import {AdminApplicationQuestionsContainer} from '@/app/admin/(with-sidebar)/application-edit/_containers/AdminApplicationQuestionsContainer';
import {AdminRecruitmentInformationContainer} from '@/app/admin/(with-sidebar)/application-edit/_containers/AdminRecruitmentInformationContainer';
import {useAdminGenerationsQuery} from '@/hooks/queries/useAdminGeneration.query';
import {PartType} from '@/schemas/admin/admin-application-questions.schema';
import {useGenerationStore} from '@/store/useGenerationStore';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect} from 'react';

export const AdminApplicationEditContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  /** 기수 목록 조회 */
  const {data: generationsData} = useAdminGenerationsQuery();
  const {generations, setGenerations} = useGenerationStore();
  const generationList = generations.map((g) => String(g.generationId));
  const generationId = searchParams.get('generationId');
  const questionType = searchParams.get('questionType');
  const currentGeneration =
    searchParams.get('generationId') ?? generationList[0];

  useEffect(() => {
    if (!generationsData) return;

    setGenerations(generationsData.data);
  }, [generationsData, setGenerations]);

  /** 쿼리 파라미터 초기화 */
  useEffect(() => {
    if (generations.length === 0) return;

    const params = new URLSearchParams(searchParams.toString());
    let changed = false;

    if (!generationId) {
      params.set('generationId', String(generations[0].generationId));
      changed = true;
    }

    if (!questionType) {
      params.set('questionType', 'PM');
      changed = true;
    }

    if (changed) {
      router.replace(`?${params.toString()}`, {scroll: false});
    }
  }, [generations, generationId, questionType, router, searchParams]);

  if (!currentGeneration) {
    return (
      <div className='flex h-100 w-full items-center justify-center'>
        <p className='text-neutral-500'>등록된 기수 정보가 없습니다.</p>
      </div>
    );
  }

  if (!generationId || !questionType) return null;

  const generationIdNum = Number(generationId);
  const questionTypeEnum = questionType as PartType;

  return (
    <>
      <AdminRecruitmentInformationContainer
        generations={generationList}
        generationId={generationIdNum}
      />
      <AdminApplicationQuestionsContainer
        key={`${generationId}-${questionType}`}
        generationId={generationIdNum}
        questionType={questionTypeEnum}
      />
    </>
  );
};
