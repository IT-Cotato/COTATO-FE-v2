'use client';

import {ProjectDetail} from '@/schemas/project/project.schema';
import LinkIcon from '@/assets/link/link.svg';
import {Button} from '@repo/ui/components/buttons/Button';

interface ProjectDetailHeaderProps {
  data: ProjectDetail;
  isAdmin: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export const ProjectDetailHeader = ({
  data,
  isAdmin,
  onEdit,
  onDelete,
}: ProjectDetailHeaderProps) => {
  const hasLink = !!data.projectLink && data.projectLink.trim() !== '';
  const normalizedLink = hasLink
    ? data.projectLink.startsWith('http://') ||
      data.projectLink.startsWith('https://')
      ? data.projectLink
      : `https://${data.projectLink}`
    : '';

  return (
    <header className='flex w-full flex-col gap-2.5'>
      <div
        className='flex gap-4.5'
        role='group'
        aria-label='프로젝트 분류 정보'>
        <span className='bg-disabled text-body-m flex h-7.5 w-17.75 items-center justify-center rounded-[5px] text-white'>
          <span className='sr-only'>기수: </span>
          {data.generationId}기
        </span>
        <span className='bg-primary text-body-m flex h-7.5 w-17.75 items-center justify-center rounded-[5px] text-white'>
          <span className='sr-only'>활동: </span>
          {data.projectType === 'DEMODAY' ? '데모데이' : '해커톤'}
        </span>
      </div>
      <div className='flex w-full items-start justify-between gap-4.5'>
        <div className='flex items-start gap-4.5'>
          <h1 className='text-h1 max-w-150 text-neutral-800'>{data.name}</h1>
          {hasLink && (
            <a
              href={normalizedLink}
              target='_blank'
              rel='noopener noreferrer'
              className='shadow-default flex items-center gap-2.5 rounded-[10px] px-3.75 py-2.25 text-neutral-400'
              aria-label={`${data.name} 프로젝트 외부 링크 바로가기`}>
              <span className='text-h5 font-bold'>LINK</span>
              <LinkIcon className='h-5 w-5' />
            </a>
          )}
        </div>
        {isAdmin && (
          <nav className='flex gap-2.5' aria-label='프로젝트 관리'>
            <Button
              variant='outline'
              label='수정하기'
              width={127}
              height={40}
              textColor='neutral-600'
              labelTypo='body_l_sb'
              onClick={onEdit}
              borderColor='neutral-200'
            />
            <Button
              variant='primary'
              label='삭제하기'
              width={127}
              height={40}
              backgroundColor='alert'
              labelTypo='body_l_sb'
              onClick={onDelete}
            />
          </nav>
        )}
      </div>
    </header>
  );
};
