'use client';

import {ProjectSection} from '@/app/(with-header)/(with-footer)/project/_components/ProjectSection';
import {Dropdown} from '@/components/dropdown/Dropdown';
import {useState} from 'react';

export const ProjectContainer = () => {
  const [selectedGeneration, setSelectedGeneration] = useState<string>('');

  const generations = ['12기', '11기', '10기', '9기'];
  return (
    <>
      <div className='flex w-full'>
        <Dropdown
          placeholder='기수'
          value={selectedGeneration}
          options={generations}
          onSelect={(value) => setSelectedGeneration(value)}
        />
      </div>
      <ProjectSection generation={selectedGeneration} />
    </>
  );
};
