'use client';

import type {
  ProjectContentKind,
  ProjectType,
} from '@/schemas/project/project-type';
import {useSearchParams} from 'next/navigation';
import {useState, useMemo, useEffect} from 'react';
import {AddProjectForm} from '../_components/AddProjectForm';
import {Dropdown} from '@/components/dropdown/Dropdown';
import {useGenerationQuery} from '@/hooks/queries/useGeneration.query';
import {useProjectDetailQuery} from '@/hooks/queries/useProject.query';
import {Spinner} from '@repo/ui/components/spinner/Spinner';

export const AddProjectFormContainer = ({
  kind = 'project',
}: {
  kind?: ProjectContentKind;
}) => {
  const isStudy = kind === 'study';
  const label = isStudy ? '스터디' : '프로젝트';
  const searchParams = useSearchParams();
  const rawEditId = searchParams.get('edit');
  const editId = rawEditId && !isNaN(Number(rawEditId)) ? rawEditId : null;

  const {
    data: generationList,
    isLoading: isGenLoading,
    isError: isGenError,
  } = useGenerationQuery();

  const {
    data: editData,
    isLoading: isDetailLoading,
    isError,
  } = useProjectDetailQuery(Number(editId));

  const generations = useMemo(() => {
    if (!generationList) return [];
    return [...generationList]
      .sort((a, b) => b.generationId - a.generationId)
      .map((item) => `${item.generationId}기`);
  }, [generationList]);

  const [selectedGeneration, setSelectedGeneration] = useState<string>('');
  const [selectedActivity, setSelectedActivity] = useState<string>('데모데이');

  useEffect(() => {
    if (!editId && generations.length > 0 && !selectedGeneration) {
      setSelectedGeneration(generations[0]);
    }
  }, [generations, editId, selectedGeneration]);

  useEffect(() => {
    if (editData) {
      setSelectedGeneration(`${editData.generationId}기`);
      setSelectedActivity(
        editData.projectType === 'DEMODAY' ? '데모데이' : '해커톤'
      );
    }
  }, [editData]);

  const activities = ['데모데이', '해커톤'];

  const getGenerationId = (gen: string) => parseInt(gen.replace('기', '')) || 0;
  const getProjectType = (act: string): ProjectType =>
    isStudy ? 'STUDY' : act === '데모데이' ? 'DEMODAY' : 'HACKATHON';

  if (isGenLoading || (editId && isDetailLoading)) {
    return (
      <div
        className='flex min-h-screen items-center justify-center'
        role='status'
        aria-live='polite'
        aria-busy='true'>
        <Spinner />
        <span className='sr-only'>데이터를 불러오는 중입니다.</span>
      </div>
    );
  }

  if (isGenError || (editId && isError)) {
    return (
      <div
        className='flex min-h-100 items-center justify-center text-neutral-400'
        role='alert'>
        데이터를 불러오는 중 문제가 발생했습니다.
      </div>
    );
  }

  if (editData && (editData.projectType === 'STUDY') !== isStudy) {
    return (
      <p role='alert' className='p-10 text-neutral-500'>
        해당 콘텐츠의 관리 화면에서 수정해 주세요.
      </p>
    );
  }

  return (
    <section
      className='flex w-full min-w-0 flex-col gap-7.5 overflow-x-hidden px-6 py-7.5 lg:gap-8.5 lg:px-42.5 lg:py-7.5'
      aria-labelledby='add-project-heading'>
      <h2 id='add-project-heading' className='sr-only'>
        {label} {editId ? '수정' : '추가'} 설정
      </h2>
      <div className='flex justify-between'>
        <div
          className='flex w-full gap-6 lg:w-auto lg:gap-6.25'
          role='group'
          aria-label='기본 정보 설정'>
          <Dropdown
            placeholder='기수'
            className='flex-1 lg:flex-none'
            value={selectedGeneration}
            options={generations}
            onSelect={(value) => setSelectedGeneration(value)}
            isBorder
          />
          {!isStudy && (
            <Dropdown
              placeholder='활동'
              className='flex-1 lg:flex-none'
              value={selectedActivity}
              options={activities}
              onSelect={(value) => setSelectedActivity(value)}
              isBorder
            />
          )}
        </div>
      </div>
      <div role='region' aria-label='프로젝트 상세 정보 입력 폼'>
        <AddProjectForm
          generationId={getGenerationId(selectedGeneration)}
          projectType={getProjectType(selectedActivity)}
          initialData={editData}
        />
      </div>
    </section>
  );
};
