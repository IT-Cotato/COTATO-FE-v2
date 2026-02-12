'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {ProjectDetail} from '@/schemas/project/project.schema';
import LinkIcon from '@/assets/link/link.svg';
import {Button} from '@repo/ui/components/buttons/Button';
import {ROUTES} from '@/constants/routes';
import {useDeleteProjectMutation} from '@/hooks/mutations/useProject.mutation';
import {ProjectDeleteModal} from '@/app/(with-header)/(with-footer)/project/[projectId]/_components/ProjectDeleteModal';
import {useAuthStore} from '@/store/useAuthStore';

export const ProjectDetailHeader = ({data}: {data: ProjectDetail}) => {
  const router = useRouter();
  const {user} = useAuthStore();

  const {mutate: deleteProject, isPending: isDeleting} =
    useDeleteProjectMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAdmin = user?.isAdmin === true;

  const handleEdit = () => {
    router.push(ROUTES.ADD_PROJECT(data.projectId));
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (isDeleting) return;
    deleteProject(data.projectId, {
      onSuccess: () => {
        setIsModalOpen(false);
        router.push(ROUTES.PROJECT);
      },
      onError: () => {
        setIsModalOpen(false);
      },
    });
  };

  const hasLink = !!data.projectLink && data.projectLink.trim() !== '';

  const normalizedLink = hasLink
    ? data.projectLink.startsWith('http://') ||
      data.projectLink.startsWith('https://')
      ? data.projectLink
      : `https://${data.projectLink}`
    : '';

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
              href={normalizedLink}
              target='_blank'
              rel='noopener noreferrer'
              className='shadow-default flex items-center gap-2.5 rounded-[10px] px-3.75 py-2.25 text-neutral-400'>
              <span className='text-h5'>LINK</span>
              <LinkIcon className='h-5 w-5 text-neutral-400' />
            </a>
          )}
        </div>
      </div>
      {isAdmin && (
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
            onClick={handleDeleteClick}
          />
        </div>
      )}
      <ProjectDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        projectName={data.name}
      />
    </header>
  );
};
