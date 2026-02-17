'use client';

import {ROUTES} from '@/constants/routes';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

interface ProjectCardProps {
  projectId: number;
  name: string;
  shortDescription: string;
  projectType: string;
  generationId: number;
  thumbnailUrl: string | null;
}

export const ProjectCard = ({
  projectId,
  name,
  shortDescription,
  projectType,
  generationId,
  thumbnailUrl,
}: ProjectCardProps) => {
  const router = useRouter();

  const hasThumbnail = !!thumbnailUrl && thumbnailUrl.trim() !== '';

  return (
    <div
      className='shadow-project-card flex w-82.5 cursor-pointer flex-col gap-2.75'
      onClick={() => router.push(ROUTES.PROJECT_DETAIL(projectId))}>
      <div className='relative h-50 w-82.5 overflow-hidden rounded-t-[20px] bg-neutral-200'>
        {hasThumbnail && (
          <Image
            src={thumbnailUrl}
            alt={name}
            fill
            className='object-cover'
            sizes='330px'
          />
        )}
      </div>
      <div className='flex flex-col gap-2 p-[0_15px_8px_15px]'>
        <div className='flex items-center justify-between'>
          <h3 className='text-h4 line-clamp-1 w-45 break-keep text-neutral-800'>
            {name}
          </h3>
          <div className='flex h-6 gap-2.5'>
            <span className='text-body-m bg-disabled rounded-[5px] px-2.5 py-0.5 text-white'>
              {generationId}기
            </span>
            <span className='bg-primary text-body-m shadow-default rounded-[5px] px-2 py-0.5 text-white'>
              {projectType === 'DEMODAY' ? '데모데이' : '해커톤'}
            </span>
          </div>
        </div>
        <p className='text-body-m line-clamp-1 break-keep text-neutral-600'>
          {shortDescription}
        </p>
      </div>
    </div>
  );
};
