'use client';

import {useRouter} from 'next/navigation';
import ChevronLeft from '@/assets/chevrons/chevron-left.svg';
import {Button} from '@repo/ui/components/buttons/Button';
import {ProjectDetailImage} from '@/app/(with-header)/(with-footer)/project/[projectId]/_components/ProjectDetailImage';
import {Position, ProjectDetail} from '@/schemas/project/project.schema';
import {ProjectInfoMobile} from '@/app/(with-header)/(with-footer)/project/[projectId]/_mobile/ProjectInfoMobile';
import {ProjectHeaderMobile} from '@/app/(with-header)/(with-footer)/project/[projectId]/_mobile/ProjectHeaderMobile';

interface ProjectDetailMobileProps {
  data: ProjectDetail;
  groupedMembers: Record<Position, string[]>;
  positions: Position[];
  isAdmin: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export const ProjectDetailMobile = ({
  data,
  groupedMembers,
  positions,
  isAdmin,
  onEdit,
  onDelete,
}: ProjectDetailMobileProps) => {
  const router = useRouter();
  const hasLink = !!data.projectLink && data.projectLink.trim() !== '';
  const normalizedLink = hasLink
    ? data.projectLink.startsWith('http://') ||
      data.projectLink.startsWith('https://')
      ? data.projectLink
      : `https://${data.projectLink}`
    : '';

  return (
    <div className='flex w-full flex-col bg-white px-6 py-7.5 lg:hidden'>
      <div className='flex items-center justify-between py-2.5'>
        <button
          onClick={() => router.push('/project')}
          className='text-h3 flex items-center gap-2 font-bold text-neutral-800'>
          <ChevronLeft className='h-6 w-6' />
          Project
        </button>
      </div>
      <div className='my-2.5 flex items-center justify-end'>
        {isAdmin && (
          <nav className='flex gap-2.5'>
            <Button
              variant='outline'
              label='수정하기'
              width={60}
              height={32}
              textColor='neutral-600'
              labelTypo='body_m'
              onClick={onEdit}
              borderColor='neutral-200'
            />
            <Button
              variant='primary'
              label='삭제하기'
              width={60}
              height={32}
              backgroundColor='alert'
              labelTypo='body_m'
              onClick={onDelete}
            />
          </nav>
        )}
      </div>
      <ProjectDetailImage data={data} isSingle />
      <div className='mt-5 flex flex-col gap-5 bg-neutral-50 p-5'>
        <ProjectHeaderMobile
          data={data}
          hasLink={hasLink}
          normalizedLink={normalizedLink}
        />
        <ProjectInfoMobile
          data={data}
          positions={positions}
          groupedMembers={groupedMembers}
        />
      </div>
      <section>
        <h2 className='text-h5 mt-7.5 mb-3 font-bold text-neutral-800'>
          프로젝트 소개
        </h2>
        <div className='text-h5 min-h-35 min-w-65.5 rounded-[10px] border border-neutral-200 bg-white px-6 py-2.5 leading-relaxed text-neutral-600'>
          {data.introduction}
        </div>
      </section>
    </div>
  );
};
