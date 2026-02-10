'use client';

import {ProjectDetail} from '@/schemas/project/project.schema';
import LinkIcon from '@/assets/link/link.svg';
import {Button} from '@repo/ui/components/buttons/Button';
import {useRouter} from 'next/navigation';
import {ROUTES} from '@/constants/routes';
import {useDeleteProjectMutation} from '@/hooks/mutations/useProject.mutations';

export const ProjectDetailHeader = ({data}: {data: ProjectDetail}) => {
  const router = useRouter();
  const {mutate: deleteProject} = useDeleteProjectMutation();

  const handleEdit = () => {
    router.push(ROUTES.ADD_PROJECT(data.projectId));
  };

  const handleDelete = () => {
    if (!window.confirm('정말 이 프로젝트를 삭제하시겠습니까?')) return;

    deleteProject(data.projectId, {
      onSuccess: () => {
        router.push(ROUTES.PROJECT);
      },
    });
  };

  const hasLink = !!data.projectLink && data.projectLink.trim() !== '';

  return (
    <header className='flex items-end justify-between'>
      <div className='flex flex-col gap-3.75'>
        <div className='flex gap-4.5 text-center'>
          <span className='bg-disabled text-body-m h-7.5 w-17.75 rounded-[5px] p-1.25 text-white'>
            {data.generationId}기
          </span>
          <span className='bg-primary text-body-m h-7.5 w-17.75 rounded-[5px] p-1.25 text-white'>
            {data.projectType === 'DEMODAY' ? '데모데이' : '해커톤'}
          </span>
        </div>
        <div className='flex items-center gap-4.5'>
          <h1 className='text-h1 text-neutral-800'>{data.name}</h1>
          {hasLink && (
            <a
              href={data.projectLink}
              target='_blank'
              rel='noopener noreferrer'
              className='shadow-default flex items-center gap-2.5 rounded-[10px] px-3.75 py-2.25 text-neutral-400'>
              <span className='text-h5'>LINK</span>
              <LinkIcon className='h-5 w-5 text-neutral-400' />
            </a>
          )}
        </div>
      </div>
      <div className='flex gap-3'>
        <Button
          variant='outline'
          label='수정하기'
          width={127}
          height={40}
          textColor='neutral-600'
          labelTypo='body_l_sb'
          onClick={handleEdit}
          borderColor='neutral-200'
        />
        <Button
          variant='primary'
          label='삭제하기'
          width={127}
          height={40}
          backgroundColor='alert'
          labelTypo='body_l_sb'
          onClick={handleDelete}
        />
      </div>
    </header>
  );
};
