import {useMemo} from 'react';
import {Position, ProjectDetail} from '@/schemas/project/project.schema';
import {useProjectDetailQuery} from '@/hooks/queries/useProject.query';

export const useProjectDetail = (projectId: number) => {
  const {data: apiData, isLoading, isError} = useProjectDetailQuery(projectId);

  const mappedData = useMemo<ProjectDetail | null>(() => {
    if (!apiData) return null;
    return {
      projectId: apiData.projectId,
      name: apiData.name,
      shortDescription: apiData.shortDescription,
      introduction: apiData.introduction,
      projectType: apiData.projectType,
      projectLink: apiData.projectLink,
      startDate: apiData.startDate,
      endDate: apiData.endDate,
      generationId: apiData.generationId,
      imageInfos: apiData.imageInfos.map((img) => ({
        imageId: img.imageId,
        imageUrl: img.imageUrl,
        imageOrder: img.imageOrder,
      })),
      memberInfos: apiData.memberInfos.map((m) => ({
        memberId: m.memberId,
        name: m.name,
        position: m.position,
      })),
    };
  }, [apiData]);

  const groupedMembers = useMemo(() => {
    const initialGroups: Record<Position, string[]> = {
      PM: [],
      DESIGN: [],
      FE: [],
      BE: [],
    };
    if (!mappedData) return initialGroups;

    return mappedData.memberInfos.reduce((acc, member) => {
      const pos = member.position;
      if (pos in acc) acc[pos].push(member.name);
      return acc;
    }, initialGroups);
  }, [mappedData]);

  const positions: Position[] = ['PM', 'DESIGN', 'FE', 'BE'];

  return {
    data: mappedData,
    groupedMembers,
    isLoading,
    isError,
    positions,
  };
};
