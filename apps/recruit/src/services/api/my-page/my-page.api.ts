import {
  GetApplicationBasicInfoResponse,
  GetApplicationBasicInfoResponseSchema,
  GetApplicationEtcQuestionsResponse,
  GetApplicationEtcQuestionsResponseSchema,
  GetApplicationPartQuestionsResponse,
  GetApplicationPartQuestionsResponseSchema,
} from '@/schemas/common/application-schema';
import {
  ApplicationListResponseSchema,
  ApplicationType,
} from '@/schemas/my-page/my-page.schema';
import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';

export const myPageApi = {
  getSubmittedApplications: async (): Promise<ApplicationType[]> => {
    const response = await privateAxios.get(
      ENDPOINT.SUBMITTED_APPLICATIONS.SUBMITTED_APPLICATIONS_MYPAGE
    );
    const parsed = ApplicationListResponseSchema.parse(response.data);
    return parsed.data;
  },
};

/**
 * 마이페이지 - 내 지원서 기본 인적 사항 조회
 * @param applicationId 지원서 id
 */
export const getMyApplicationBasicInfo = async (
  applicationId: number
): Promise<GetApplicationBasicInfoResponse> => {
  try {
    const response = await privateAxios.get(
      ENDPOINT.SUBMITTED_APPLICATIONS.SUBMITTED_APPLICATIONS_BASIC_INFO(
        applicationId
      )
    );

    return GetApplicationBasicInfoResponseSchema.parse(response.data);
  } catch (error: unknown) {
    return handleApiError(error);
  }
};

/**
 * 마이페이지 - 내 지원서 파트별 질문 및 답변 조회
 * @param applicationId 지원서 id
 */
export const getMyApplicationPartQuestions = async (
  applicationId: number
): Promise<GetApplicationPartQuestionsResponse> => {
  try {
    const response = await privateAxios.get(
      ENDPOINT.SUBMITTED_APPLICATIONS.SUBMITTED_APPLICATIONS_PART_QUESTIONS(
        applicationId
      )
    );

    return GetApplicationPartQuestionsResponseSchema.parse(response.data);
  } catch (error: unknown) {
    return handleApiError(error);
  }
};

/**
 * 마이페이지 - 내 지원서 기타 질문 및 답변 조회
 * @param applicationId 지원서 id
 */
export const getMyApplicationEtcQuestions = async (
  applicationId: number
): Promise<GetApplicationEtcQuestionsResponse> => {
  try {
    const response = await privateAxios.get(
      ENDPOINT.SUBMITTED_APPLICATIONS.SUBMITTED_APPLICATIONS_ETC_INFO(
        applicationId
      )
    );

    return GetApplicationEtcQuestionsResponseSchema.parse(response.data);
  } catch (error: unknown) {
    return handleApiError(error);
  }
};
