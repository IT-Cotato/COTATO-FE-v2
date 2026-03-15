'use client';

import {useState, useEffect} from 'react';
import {useSearchParams, useRouter, usePathname} from 'next/navigation';
import {ProjectCard} from './ProjectCard';
import {Pagination} from '@repo/ui/components/pagination/Pagination';
import {useProjectListQuery} from '@/hooks/queries/useProject.query';
import {ProjectType} from '@/schemas/project/project-type';
import {Spinner} from '@repo/ui/components/spinner/Spinner';

interface ProjectSectionProps {
  generation?: string;
  activity?: string;
}

export const ProjectSection = ({generation, activity}: ProjectSectionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const [itemsPerPage, setItemsPerPage] = useState(9);

  useEffect(() => {
    const handleResize = () => {
      // lg(1024px) 미만일 때 6개, 이상일 때 9개
      if (window.innerWidth < 1024) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(9);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const {data: projects = [], isLoading} = useProjectListQuery({
    generationId: generation ? Number(generation) : undefined,
    projectType: activity ? (activity.toUpperCase() as ProjectType) : undefined,
  });

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const currentItems = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div
        className='flex min-h-100 items-center justify-center'
        aria-live='polite'
        aria-busy='true'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col items-center gap-10'>
      {currentItems.length > 0 ? (
        <>
          <ul className='grid w-full list-none grid-cols-1 gap-y-8 p-0 lg:grid-cols-3 lg:gap-x-13.75 lg:gap-y-7.5'>
            {currentItems.map((project) => (
              <li key={project.projectId} className='flex justify-center'>
                <ProjectCard {...project} />
              </li>
            ))}
          </ul>
          <nav aria-label='프로젝트 목록 페이지네이션'>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </nav>
        </>
      ) : (
        <div
          className='flex min-h-100 w-full items-center justify-center text-neutral-400'
          role='status'
          aria-live='polite'>
          조건에 맞는 프로젝트가 없습니다.
        </div>
      )}
    </div>
  );
};
