'use client';

import {useSearchParams} from 'next/navigation';
import {useState, useMemo, useEffect} from 'react';
import {PROJECT_DETAIL_MOCK} from '@/mocks/project/mock-project';
import {ProjectDetail} from '@/schemas/project/project.schema';
import {AddProjectForm} from '../_components/AddProjectForm';
import {Dropdown} from '@/components/dropdown/Dropdown';

export const AddProjectFormContainer = () => {
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit'); // url에서 ID 추출

  // editId가 있을 때만 데이터를 찾음
  const editData = useMemo(() => {
    if (!editId) return undefined;
    const data = PROJECT_DETAIL_MOCK[Number(editId)];
    if (!data) {
      console.warn(`Project with id ${editId} not found`);
      return undefined;
    }
    return data as ProjectDetail;
  }, [editId]);

  const [selectedGeneration, setSelectedGeneration] = useState<string>('12기');
  const [selectedActivity, setSelectedActivity] = useState<string>('데모데이');

  // editData가 바뀔 때 드롭다운 상태 동기화
  useEffect(() => {
    if (editData) {
      setSelectedGeneration(`${editData.generationId}기`);
      setSelectedActivity(
        editData.projectType === 'DEMODAY' ? '데모데이' : '해커톤'
      );
    } else {
      setSelectedGeneration('12기');
      setSelectedActivity('데모데이');
    }
  }, [editData]);

  const generations = ['12기', '11기', '10기', '9기']; //나중에 API 데이터로 연동하기
  const activities = ['데모데이', '해커톤'];

  const getGenerationId = (gen: string) => parseInt(gen.replace('기', ''));
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
