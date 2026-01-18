import {
  GetAdminApplicationBasicInfoResponse,
  GetAdminApplicationBasicInfoResponseSchema,
  GetAdminApplicationEtcQuestionsResponse,
  GetAdminApplicationEtcQuestionsResponseSchema,
  GetAdminApplicationPartQuestionsResponse,
  GetAdminApplicationPartQuestionsResponseSchema,
} from '@/schemas/admin/admin-application.schema';
import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';

/**
 * 지원서 기본 인적 사항을 조회하는 API 요청 함수
 * - 어드민 지원서 상세 조회 시 사용
 * @param applicationId 지원서 id
 * @returns 지원서 기본 정보 API 응답 데이터
 */

export const getAdminApplicationBasicInfo = async (
  applicationId: number
): Promise<GetAdminApplicationBasicInfoResponse> => {
  try {
    const response = await privateAxios.get(
      ENDPOINT.ADMIN.APPLICATION_BASIC_INFO(applicationId)
    );

    return GetAdminApplicationBasicInfoResponseSchema.parse(response.data);
  } catch (error: unknown) {
    return handleApiError(error);
  }
};

/**
 * 지원서 파트별 질문 및 답변을 조회하는 API 요청 함수
 * - 파트 공통 질문, 지원자의 답변 내용 함께 조회
 * - pdf 포트폴리오 메타 정보를 포함할 수 있음
 * @param applicationId 지원서 id
 * @returns 지원서 파트별 질문 API 응답 데이터
 */
export const getAdminApplicationPartQuestions = async (
  applicationId: number
): Promise<GetAdminApplicationPartQuestionsResponse> => {
  try {
    const response = await privateAxios.get(
      ENDPOINT.ADMIN.APPLICATION_PART_QUESTIONS(applicationId)
    );

    return GetAdminApplicationPartQuestionsResponseSchema.parse(response.data);
  } catch (error: unknown) {
    return handleApiError(error);
  }
};

/**
 * 지원서 기타 질문 및 답변을 조회하는 API 요청 함수
 * @param applicationId 지원서 id
 * @returns 지원서 기타 질문 API 응답 데이터
 */
export const getAdminApplicationEtcQuestions = async (
  applicationId: number
): Promise<GetAdminApplicationEtcQuestionsResponse> => {
  try {
    const response = await privateAxios.get(
      ENDPOINT.ADMIN.APPLICATION_ETC_QUESTIONS(applicationId)
    );

    return GetAdminApplicationEtcQuestionsResponseSchema.parse(response.data);
  } catch (error: unknown) {
    return handleApiError(error);
  }
};
