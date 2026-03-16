'use client';

import {ProjectDetailHeader} from '@/app/(with-header)/(with-footer)/project/[projectId]/_components/ProjectDetailHeader';
import {ProjectDetailImage} from '@/app/(with-header)/(with-footer)/project/[projectId]/_components/ProjectDetailImage';
import {ProjectDetailInfo} from '@/app/(with-header)/(with-footer)/project/[projectId]/_components/ProjectDetailInfo';
import {ProjectDetail, Position} from '@/schemas/project/project.schema';

interface ProjectDetailDesktopProps {
  data: ProjectDetail;
  groupedMembers: Record<Position, string[]>;
  positions: Position[];
  isAdmin: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export const ProjectDetailDesktop = ({
  data,
  groupedMembers,
  positions,
  isAdmin,
  onEdit,
  onDelete,
}: ProjectDetailDesktopProps) => {
  return (
    <div className='hidden w-full flex-col items-center px-42.5 py-7.5 lg:flex'>
      <div className='flex w-full flex-col gap-15.25'>
        <div className='flex flex-col gap-10.75'>
          <ProjectDetailHeader
            data={data}
            isAdmin={isAdmin}
            onEdit={onEdit}
            onDelete={onDelete}
          />
          <ProjectDetailInfo
            data={data}
            groupedMembers={groupedMembers}
            positions={positions}
          />
        </div>
        <ProjectDetailImage data={data} />
      </div>
    </div>
  );
};
