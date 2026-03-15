'use client';

import {useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {useProjectDetail} from '@/app/(with-header)/(with-footer)/project/[projectId]/_hooks/useProjectDetail';
import {useAuthStore} from '@/store/useAuthStore';
import {useDeleteProjectMutation} from '@/hooks/mutations/useProject.mutation';
import {ProjectDeleteModal} from '@/app/(with-header)/(with-footer)/project/[projectId]/_components/ProjectDeleteModal';
import {ROUTES} from '@/constants/routes';
import {ProjectDetailMobile} from '@/app/(with-header)/(with-footer)/project/[projectId]/mobile/ProjectDetailMobile';
import {ProjectDetailWeb} from '@/app/(with-header)/(with-footer)/project/[projectId]/_container/ProjectDetailWeb';

export const ProjectDetailContainer = () => {
  const params = useParams();
  const router = useRouter();
  const {user} = useAuthStore();
  const projectId = Number(params?.projectId);

  const {data, groupedMembers, positions, isLoading, isError} =
    useProjectDetail(projectId);
  const {mutate: deleteProject, isPending: isDeleting} =
    useDeleteProjectMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAdmin = user?.isAdmin === true;

  const handleEdit = () => {
    if (!data) return;
    router.push(ROUTES.ADD_PROJECT(data.projectId));
  };

  const handleConfirmDelete = () => {
    if (isDeleting) return;
    deleteProject(projectId, {
      onSuccess: () => {
        setIsModalOpen(false);
        router.push(ROUTES.PROJECT);
      },
      onError: () => setIsModalOpen(false),
    });
  };

  if (isLoading)
    return (
      <div className='flex min-h-100 items-center justify-center'>
        <Spinner />
      </div>
    );
  if (isError || !data)
    return (
      <div className='flex min-h-100 items-center justify-center text-neutral-400'>
        정보를 불러올 수 없습니다.
      </div>
    );

  const commonProps = {
    data,
    groupedMembers,
    positions,
    isAdmin,
    onEdit: handleEdit,
    onDelete: () => setIsModalOpen(true),
  };

  return (
    <>
      <main className='w-full'>
        {/* 모바일 */}
        <div className='block lg:hidden'>
          <ProjectDetailMobile {...commonProps} />
        </div>
        {/* 데스크탑 */}
        <ProjectDetailWeb {...commonProps} />
      </main>
      <ProjectDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        projectName={data.name}
      />
    </>
  );
};
