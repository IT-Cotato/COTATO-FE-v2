'use client';

import {useParams} from 'next/navigation';
import {PROJECT_DETAIL_MOCK} from '@/mocks/project/mock-project';
import {Position, ProjectDetail} from '@/schemas/project/project.schema';
import {ProjectDetailHeader} from '@/app/(with-header)/(with-footer)/project/[projectId]/_components/ProjectDetailHeader';
import {ProjectDetailInfo} from '@/app/(with-header)/(with-footer)/project/[projectId]/_components/ProjectDetailInfo';
import {ProjectDetailImage} from '@/app/(with-header)/(with-footer)/project/[projectId]/_components/ProjectDetailImage';

export const ProjectDetailContainer = () => {
  const params = useParams();

  const projectId = params?.projectId;
  const data = (PROJECT_DETAIL_MOCK[Number(projectId)] ||
    PROJECT_DETAIL_MOCK[1]) as ProjectDetail;

  const groupedMembers = data.members.reduce(
    (acc, member) => {
      const pos = member.position;
      if (!acc[pos]) acc[pos] = [];
      acc[pos].push(member.name);
      return acc;
    },
    {PM: [], DE: [], FE: [], BE: []} as Record<Position, string[]>
  );

  const positions: Position[] = ['PM', 'DE', 'FE', 'BE'];

  return (
    <main className='flex w-275 flex-col py-7.5'>
      <div className='flex flex-col gap-15.25'>
        <div className='flex flex-col gap-10.75'>
          <ProjectDetailHeader data={data} />
          <ProjectDetailInfo
            data={data}
            groupedMembers={groupedMembers}
            positions={positions}
          />
        </div>
        <ProjectDetailImage data={data} />
      </div>
    </main>
  );
};
