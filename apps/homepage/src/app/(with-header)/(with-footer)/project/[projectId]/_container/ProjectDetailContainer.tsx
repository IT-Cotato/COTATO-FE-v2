'use client';

import {useParams} from 'next/navigation';
import {ProjectDetailHeader} from '../_components/ProjectDetailHeader';
import {ProjectDetailInfo} from '../_components/ProjectDetailInfo';
import {ProjectDetailImage} from '../_components/ProjectDetailImage';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {useProjectDetail} from '@/app/(with-header)/(with-footer)/project/[projectId]/_hooks/useProjectDetail';

export const ProjectDetailContainer = () => {
  const params = useParams();
  const projectId = Number(params?.projectId);

  const {data, groupedMembers, positions, isLoading, isError} =
    useProjectDetail(projectId);

  if (isLoading) {
    return (
      <div
        className='flex min-h-100 items-center justify-center'
        role='status'
        aria-live='polite'
        aria-busy='true'>
        <Spinner />
        <span className='sr-only'>프로젝트 상세 정보를 불러오는 중입니다.</span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div
        className='flex min-h-100 items-center justify-center text-neutral-400'
        role='alert'>
        정보를 불러올 수 없습니다.
      </div>
    );
  }

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
