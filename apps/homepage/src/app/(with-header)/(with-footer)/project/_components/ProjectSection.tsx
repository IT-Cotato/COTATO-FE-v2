'use client';

import {useSearchParams, useRouter, usePathname} from 'next/navigation';
import {ProjectCard} from './ProjectCard';
import {Pagination} from '@repo/ui/components/pagination/Pagination';
import {useProjectListQuery} from '@/hooks/queries/useProject.queries';
import {ProjectType} from '@/schemas/project/project-type';
import {Spinner} from '@repo/ui/components/spinner/Spinner';

interface ProjectSectionProps {
  generation: string;
  activity: string;
}

const ITEMS_PER_PAGE = 9;

export const ProjectSection = ({generation, activity}: ProjectSectionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const {data: projects = [], isLoading} = useProjectListQuery({
    generationId: Number(generation),
    projectType: activity.toUpperCase() as ProjectType,
  });

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const currentItems = projects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className='flex min-h-100 items-center justify-center'>
        <Spinner />
      </div>
    );
  }

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
      {projects.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
