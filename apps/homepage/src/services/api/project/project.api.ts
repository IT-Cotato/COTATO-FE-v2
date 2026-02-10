import {
  ProjectListItem,
  ProjectListParams,
} from '@/schemas/project/project-type';
import {publicAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';

/**
 * 프로젝트 전체 조회
 */
export const getProjects = async (params: ProjectListParams) => {
  try {
    const response = await publicAxios.get(ENDPOINT.PROJECT.LIST, {params});
    return response.data as ProjectListItem[];
  } catch (error) {
    return handleApiError(error);
  }
};
