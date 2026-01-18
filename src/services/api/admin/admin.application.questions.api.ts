import {
  GetApplicationQuestionsResponseSchema,
  PartType,
  PostApplicationQuestionsRequest,
} from '@/schemas/admin/admin-application-questions.schema';
import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';

/**
 * 특정 기수의 지원서 질문 목록을 조회하는 API 요청 함수
 * - 파트별(FE/BE/PM 등) 지원서 질문 리스트를 조회합니다.
 * - 어드민 지원서 수정 페이지의 지원서 관리 폼에서 사용됩니다.
 * @param params 조회 파라미터
 * @param params.generationId 기수 ID
 * @param params.questionType 파트 타입 (FE | BE | PM | DESIGN)
 * @returns 지원서 질문 목록 API 응답 데이터
 */
export const getAdminApplicationQuestions = async ({
  generationId,
  questionType,
}: {
  generationId: number;
  questionType: PartType;
}) => {
  try {
    const {data} = await privateAxios.get(
      ENDPOINT.ADMIN.APPLICATION_QUESTIONS,
      {
        params: {
          generationId,
          questionType,
        },
      }
    );

    return GetApplicationQuestionsResponseSchema.parse(data);
  } catch (error: unknown) {
    return handleApiError(error);
  }
};

/**
 * 지원서 질문을 생성 또는 수정하는 API 요청 함수
 *
 * - 특정 기수/파트의 지원서 질문을 등록하거나 수정합니다.
 * - 어드민 지원서 수정 페이지의 지원서 관리 폼에서 사용됩니다.
 * - 요청 바디는 서버에서 정의한 질문 등록/수정 스펙을 따릅니다.
 *
 * @param body 지원서 질문 등록/수정 요청 바디
 * @returns 성공 시 null을 반환합니다.
 */

export const postAdminApplicationQuestions = async (
  body: PostApplicationQuestionsRequest
) => {
  try {
    await privateAxios.post(ENDPOINT.ADMIN.APPLICATION_QUESTIONS, body);

    return null;
  } catch (error: unknown) {
    return handleApiError(error);
  }
};
