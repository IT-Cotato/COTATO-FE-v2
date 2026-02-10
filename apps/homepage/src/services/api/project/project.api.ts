import {
  ProjectListItem,
  ProjectListParams,
} from '@/schemas/project/project-type';
import {
  ProjectDetailResponse,
  ProjectRegistration,
} from '@/schemas/project/project.schema';
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

/**
 * 프로젝트 상세 조회
 */
export const getProjectDetail = async (
  projectId: number
): Promise<ProjectDetailResponse> => {
  try {
    const response = await publicAxios.get(ENDPOINT.PROJECT.DETAIL(projectId));
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * 프로젝트 수정
 */
export const updateProject = async (
  projectId: number,
  data: ProjectRegistration
) => {
  try {
    const response = await publicAxios.patch(
      ENDPOINT.PROJECT.EDIT(projectId),
      data
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * 프로젝트 등록
 */
export const createProject = async (data: ProjectRegistration) => {
  try {
    const response = await publicAxios.post(ENDPOINT.PROJECT.CREATE, data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * 프로젝트 이미지 PresignedUrl 발급
 */
export const getPresignedUrl = async (params: {
  fileName: string;
  contentType: string;
}) => {
  try {
    const response = await publicAxios.post(
      ENDPOINT.PROJECT.PRESIGNED_URL,
      params
    );
    return response.data as {
      presignedUrl: string;
      s3Key: string;
      expireAt: string;
    };
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * S3로 직접 파일 업로드
 */
export const uploadFileToS3 = async (presignedUrl: string, file: File) => {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  if (!response.ok) {
    throw new Error('S3 업로드 실패');
  }

  return true;
};

/**
 * 프로젝트 삭제
 */
export const deleteProject = async (projectId: number) => {
  try {
    const response = await publicAxios.delete(
      ENDPOINT.PROJECT.EDIT(projectId) // edit과 동일한 엔드포인트 사용함
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
