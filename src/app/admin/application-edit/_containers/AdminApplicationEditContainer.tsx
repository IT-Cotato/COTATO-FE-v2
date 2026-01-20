'use client';

import {AdminApplicationQuestionsContainer} from '@/app/admin/application-edit/_containers/AdminApplicationQuestionsContainer';
import {AdminRecruitmentInformationContainer} from '@/app/admin/application-edit/_containers/AdminRecruitmentInformationContainer';
import {PartType} from '@/schemas/admin/admin-application-questions.schema';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect} from 'react';

export const AdminApplicationEditContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const generationId = searchParams.get('generationId');
  const questionType = searchParams.get('questionType');

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let changed = false;

    if (!generationId) {
      params.set('generationId', '13'); // TODO: 실제 기수 목록 받아와서 세팅하기
      changed = true;
    }

    if (!questionType) {
      params.set('questionType', 'PM');
      changed = true;
    }

    if (changed) {
      router.replace(`?${params.toString()}`, {scroll: false});
    }
  }, [generationId, questionType, router, searchParams]);

  if (!generationId || !questionType) return null;
  const generationIdNum = Number(generationId);
  const questionTypeEnum = questionType as PartType;

  return (
    <>
      <AdminRecruitmentInformationContainer generationId={generationIdNum} />
      <AdminApplicationQuestionsContainer
        generationId={generationIdNum}
        questionType={questionTypeEnum}
      />
    </>
  );
};
