'use client';

import {useSearchParams} from 'next/navigation';
import {useState, useMemo, useEffect} from 'react';
import {PROJECT_DETAIL_MOCK} from '@/mocks/project/mock-project';
import {ProjectDetail} from '@/schemas/project/project.schema';
import {AddProjectForm} from '../_components/AddProjectForm';
import {Dropdown} from '@/components/dropdown/Dropdown';
import {useGenerationQuery} from '@/hooks/queries/useGeneration.queries';

export const AddProjectFormContainer = () => {
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');

  const {data: generationList} = useGenerationQuery();

  const generations = useMemo(() => {
    if (!generationList) return [];
    return generationList.map((item) => `${item.generationId}기`);
  }, [generationList]);

  const editData = useMemo(() => {
    if (!editId) return undefined;
    const data = PROJECT_DETAIL_MOCK[Number(editId)];
    return data as ProjectDetail;
  }, [editId]);

  const [selectedGeneration, setSelectedGeneration] = useState<string>('');
  const [selectedActivity, setSelectedActivity] = useState<string>('데모데이');

  useEffect(() => {
    if (!editId && generations.length > 0 && !selectedGeneration) {
      setSelectedGeneration(generations[0]); // 가장 최신 기수를 기본값으로
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
  const getProjectType = (act: string): 'DEMODAY' | 'HACKATHON' =>
    act === '데모데이' ? 'DEMODAY' : 'HACKATHON';

  return (
    <section className='flex w-full flex-col gap-8.5 py-7.5'>
      <div className='flex justify-between'>
        <div className='flex gap-6.25'>
          <Dropdown
            placeholder='기수'
            value={selectedGeneration}
            options={generations}
            onSelect={(value) => setSelectedGeneration(value)}
          />
          <Dropdown
            placeholder='활동'
            value={selectedActivity}
            options={activities}
            onSelect={(value) => setSelectedActivity(value)}
          />
        </div>
      </div>
      <AddProjectForm
        generationId={getGenerationId(selectedGeneration)}
        projectType={getProjectType(selectedActivity)}
        initialData={editData}
      />
    </section>
  );
};
