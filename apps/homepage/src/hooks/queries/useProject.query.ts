import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/query-keys';
import {
  getProjectDetail,
  getProjects,
} from '@/services/api/project/project.api';
import {ProjectListParams} from '@/schemas/project/project-type';

export const useProjectListQuery = (params: ProjectListParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.PROJECT.LIST(params),
    queryFn: () => getProjects(params),
  });
};

/**
 * 프로젝트 상세 조회 훅
 */
export const useProjectDetailQuery = (projectId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.PROJECT.DETAIL(projectId),
    queryFn: () => getProjectDetail(projectId),
    enabled: !!projectId,
  });
};
