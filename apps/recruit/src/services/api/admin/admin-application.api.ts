import {
  EvaluatorType,
  GetAdminApplicationEvaluationResponse,
  GetAdminApplicationEvaluationResponseSchema,
  PostAdminApplicationEvaluationRequest,
} from '@/schemas/admin/admin-application.schema';
import {
  GetApplicationBasicInfoResponse,
  GetApplicationBasicInfoResponseSchema,
  GetApplicationEtcQuestionsResponse,
  GetApplicationEtcQuestionsResponseSchema,
  GetApplicationPartQuestionsResponse,
  GetApplicationPartQuestionsResponseSchema,
} from '@/schemas/common/application-schema';
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
): Promise<GetApplicationBasicInfoResponse> => {
  try {
    const response = await privateAxios.get(
      ENDPOINT.ADMIN.APPLICATION_BASIC_INFO(applicationId)
    );

    return GetApplicationBasicInfoResponseSchema.parse(response.data);
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
): Promise<GetApplicationPartQuestionsResponse> => {
  try {
    const response = await privateAxios.get(
      ENDPOINT.ADMIN.APPLICATION_PART_QUESTIONS(applicationId)
    );

    return GetApplicationPartQuestionsResponseSchema.parse(response.data);
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
): Promise<GetApplicationEtcQuestionsResponse> => {
  try {
    const response = await privateAxios.get(
      ENDPOINT.ADMIN.APPLICATION_ETC_QUESTIONS(applicationId)
    );

    return GetApplicationEtcQuestionsResponseSchema.parse(response.data);
  } catch (error: unknown) {
    return handleApiError(error);
  }
};

/**
 * 지원서별 운영진 평가를 조회하는 API 요청 함수
 * @param applicationId 지원서 id
 * @param evaluatorType 운영진 타입
 * @returns 지원서별 운영진 평가 데이터
 */
export const getAdminApplicationEvaluation = async ({
  applicationId,
  evaluatorType,
}: {
  applicationId: number;
  evaluatorType: EvaluatorType;
}): Promise<GetAdminApplicationEvaluationResponse> => {
  try {
    const response = await privateAxios.get(
      ENDPOINT.ADMIN.APPLICATION_EVALUATION(applicationId),
      {
        params: {evaluatorType},
      }
    );

    return GetAdminApplicationEvaluationResponseSchema.parse(response.data);
  } catch (error: unknown) {
    return handleApiError(error);
  }
};

/**
 * 지원서별 운영진 평가를 생성하는 API 요청 함수
 * @param applicationId 지원서 id
 * @param body 운영진 평가 데이터
 * @returns null
 */
export const postAdminApplicationEvaluation = async ({
  applicationId,
  body,
}: {
  applicationId: number;
  body: PostAdminApplicationEvaluationRequest;
}) => {
  try {
    await privateAxios.post(
      ENDPOINT.ADMIN.APPLICATION_EVALUATION(applicationId),
      body
    );

    return null;
  } catch (error: unknown) {
    return handleApiError(error);
  }
};
