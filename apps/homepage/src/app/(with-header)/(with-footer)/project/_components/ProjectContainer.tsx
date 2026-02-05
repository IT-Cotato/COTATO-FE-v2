'use client';

import {useState} from 'react';
import {ProjectSection} from '@/app/(with-header)/(with-footer)/project/_components/ProjectSection';
import {Dropdown} from '@/components/dropdown/Dropdown';
import {Button} from '@repo/ui/components/buttons/Button';

export const ProjectContainer = () => {
  const [selectedGeneration, setSelectedGeneration] = useState<string>('');
  const [selectedActivity, setSelectedActivity] = useState<string>('');

  const generations = ['12기', '11기', '10기', '9기']; //나중에 API 데이터로 연동하기
  const activities = ['전체', '데모데이', '해커톤'];
  return (
    <section className='flex w-full max-w-275 flex-col gap-7.5 py-7.5'>
      <div className='flex justify-between'>
        <div className='flex gap-6 px-6'>
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
        <Button label='추가하기' labelTypo='body_l' width={127} height={40} />
      </div>
      <ProjectSection
        generation={selectedGeneration}
        activity={selectedActivity}
      />
    </section>
  );
};
