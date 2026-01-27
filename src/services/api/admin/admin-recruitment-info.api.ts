import {
  GetAdminRecruitmentInformationResponseSchema,
  PostAdminRecruitmentInformationRequest,
  RecruitmentInformationType,
} from '@/schemas/admin/admin-recruitment-information.schema';
import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';

/**
 * 특정 기수의 모집 정보(리크루팅 설정)를 조회하는 API 요청 함수
 *
 * - 어드민 지원서 수정 페이지의 모집 기간 폼에서 사용됩니다.
 * - API 응답은 Zod 스키마로 파싱된 후, 실제 모집 정보 데이터만 반환합니다.
 *
 * @param generationId 기수 ID
 * @returns 기수별 모집 정보 데이터
 */
export const getAdminRecruitmentInformations = async (
  generationId: number
): Promise<RecruitmentInformationType> => {
  try {
    const response = await privateAxios.get(
      ENDPOINT.ADMIN.RECRUITMENT_INFORMATIONS,
      {
        params: {generationId},
      }
    );

    return GetAdminRecruitmentInformationResponseSchema.parse(response.data)
      .data;
  } catch (error: unknown) {
    return handleApiError(error);
  }
};

/**
 * 모집 정보(리크루팅 설정)를 생성 또는 수정하는 API 요청 함수
 *
 * - 기수별 지원 기간, 서류 발표, 면접 평가, 최종 발표, ot 날짜 설정을 저장합니다.
 * - 어드민 지원서 수정 페이지의 모집 기간 폼에서 사용됩니다.
 *
 * @param payload 모집 정보 등록/수정 요청 바디
 * @returns 성공 시 void를 반환합니다.
 */
export const postAdminRecruitmentInformations = async (
  payload: PostAdminRecruitmentInformationRequest
): Promise<void> => {
  try {
    await privateAxios.post(ENDPOINT.ADMIN.RECRUITMENT_INFORMATIONS, payload);
  } catch (error: unknown) {
    return handleApiError(error);
  }
};
