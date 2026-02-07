'use client';

import {PROJECTS_MOCK_DATA} from '@/mocks/project/mock-project';
import {ProjectCard} from './ProjectCard';
import {useMemo, useState, useEffect} from 'react';
import {Pagination} from '@repo/ui/components/pagination/Pagination';

interface ProjectSectionProps {
  generation?: string;
  activity?: string;
}

const ITEMS_PER_PAGE = 9;

export const ProjectSection = ({generation, activity}: ProjectSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [generation, activity]);

  const filteredProjects = useMemo(() => {
    return PROJECTS_MOCK_DATA.filter((project) => {
      const genMatch = generation
        ? project.generationId === parseInt(generation.replace('기', ''))
        : true;

      const activityType = activity === '해커톤' ? 'HACKATHON' : 'DEMODAY';
      const activityMatch = project.projectType === activityType;

      return genMatch && activityMatch;
    });
  }, [generation, activity]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const currentItems = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className='flex w-full flex-col items-center gap-10'>
      {currentItems.length > 0 ? (
        <div className='grid grid-cols-3 gap-x-13.75 gap-y-7.5'>
          {currentItems.map((project) => (
            <ProjectCard key={project.projectId} {...project} />
          ))}
        </div>
      ) : (
        <div className='flex min-h-100 w-full items-center justify-center text-neutral-400'>
          조건에 맞는 프로젝트가 없습니다.
        </div>
      )}
      {currentItems.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};
