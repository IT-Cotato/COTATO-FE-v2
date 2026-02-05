import {PROJECTS_MOCK_DATA} from '@/mocks/project/mock-project';
import {ProjectCard} from './ProjectCard';
import {useMemo, useState} from 'react';

interface ProjectSectionProps {
  generation?: string;
  activity?: string;
}

const ITEMS_PER_PAGE = 9;

export const ProjectSection = ({generation, activity}: ProjectSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 기수와 활동 타입에 따라 필터링
  const filteredProjects = useMemo(() => {
    return PROJECTS_MOCK_DATA.filter((project) => {
      // 기수 필터링
      const genMatch = generation
        ? project.generationId === parseInt(generation.replace('기', ''))
        : true;

      const activityType =
        activity === '데모데이'
          ? 'DEMODAY'
          : activity === '해커톤'
            ? 'HACKATHON'
            : 'ALL';
      const activityMatch =
        activity && activity !== '전체'
          ? project.projectType === activityType
          : true;

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
        <div className='py-20 text-neutral-400'>
          조건에 맞는 프로젝트가 없습니다.
        </div>
      )}
      {totalPages > 0 && (
        <div className='text-body-m flex items-center gap-4 text-neutral-400'>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className='hover:text-neutral-700 disabled:opacity-30'>
            Previous
          </button>
          <div className='flex gap-3'>
            {Array.from({length: totalPages}).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={
                  currentPage === i + 1
                    ? 'text-neutral-700'
                    : 'hover:text-neutral-700'
                }>
                {i + 1}
              </button>
            ))}
          </div>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className='hover:text-neutral-700 disabled:opacity-30'>
            Next
          </button>
        </div>
      )}
    </div>
  );
};
