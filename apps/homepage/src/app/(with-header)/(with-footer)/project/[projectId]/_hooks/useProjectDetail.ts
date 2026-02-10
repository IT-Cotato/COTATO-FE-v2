import {useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/query-keys';
import {getProjectDetail} from '@/services/api/project/project.api';
import {
  Position,
  ProjectDetail,
  ProjectDetailResponse,
} from '@/schemas/project/project.schema';

export const useProjectDetail = (projectId: number) => {
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
        position: m.position as Position,
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

  return {
    data: mappedData,
    groupedMembers,
    isLoading,
    isError,
    positions: ['PM', 'DE', 'FE', 'BE'] as Position[],
  };
};
