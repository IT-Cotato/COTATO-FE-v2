import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/query-keys';
import {getProjects} from '@/services/api/project/project.api';
import {ProjectListParams} from '@/schemas/project/project-type';

export const useProjectListQuery = (params: ProjectListParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.PROJECT.LIST(params),
    queryFn: () => getProjects(params),
    enabled: !!params.generationId,
  });
};
