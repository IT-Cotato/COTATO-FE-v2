'use client';

import {useParams} from 'next/navigation';
import {useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/query-keys';
import {getProjectDetail} from '@/services/api/project/project.api';
import {
  Position,
  ProjectDetail,
  ProjectDetailResponse,
} from '@/schemas/project/project.schema';
import {ProjectDetailHeader} from '@/app/(with-header)/(with-footer)/project/[projectId]/_components/ProjectDetailHeader';
import {ProjectDetailInfo} from '@/app/(with-header)/(with-footer)/project/[projectId]/_components/ProjectDetailInfo';
import {ProjectDetailImage} from '@/app/(with-header)/(with-footer)/project/[projectId]/_components/ProjectDetailImage';
import {Spinner} from '@repo/ui/components/spinner/Spinner';

export const ProjectDetailContainer = () => {
  const params = useParams();
  const projectId = Number(params?.projectId);

  const {
    data: apiData,
    isLoading,
    isError,
  } = useQuery<ProjectDetailResponse>({
    queryKey: QUERY_KEYS.PROJECT.DETAIL(projectId),
    queryFn: () => getProjectDetail(projectId),
    enabled: !!projectId,
  });

  const mappedData = useMemo<ProjectDetail | null>(() => {
    if (!apiData) return null;

    return {
      projectId: apiData.projectId,
      projectName: apiData.name,
      shortDescription: apiData.shortDescription,
      projectIntroduction: apiData.introduction,
      projectType: apiData.projectType,
      projectLink: apiData.projectLink,
      startDate: apiData.startDate,
      endDate: apiData.endDate,
      generationId: apiData.generationId,
      imageInfos: apiData.imageInfos.map((img) => ({
        s3Key: img.imageId.toString(),
        publicUrl: img.imageUrl,
        order: img.imageOrder,
      })),
      members: apiData.memberInfos.map((m) => ({
        name: m.name,
        position: m.position,
      })),
    };
  }, [apiData]);

  const groupedMembers = useMemo(() => {
    const initialGroups: Record<Position, string[]> = {
      PM: [],
      DE: [],
      FE: [],
      BE: [],
    };

    if (!mappedData) return initialGroups;

    return mappedData.members.reduce((acc, member) => {
      const pos = member.position;
      if (acc[pos]) acc[pos].push(member.name);
      return acc;
    }, initialGroups);
  }, [mappedData]);

  const positions: Position[] = ['PM', 'DE', 'FE', 'BE'];

  if (isLoading)
    return (
      <div className='flex min-h-100 items-center justify-center'>
        <Spinner />
      </div>
    );
  if (isError || !mappedData)
    return (
      <div className='flex min-h-100 items-center justify-center text-neutral-400'>
        정보를 불러올 수 없습니다.
      </div>
    );

  return (
    <main className='flex w-275 flex-col py-7.5'>
      <div className='flex flex-col gap-15.25'>
        <div className='flex flex-col gap-10.75'>
          <ProjectDetailHeader data={mappedData} />
          <ProjectDetailInfo
            data={mappedData}
            groupedMembers={groupedMembers}
            positions={positions}
          />
        </div>
        <ProjectDetailImage data={mappedData} />
      </div>
    </main>
  );
};
