import {
  GetApplicationQuestionsResponseSchema,
  PartType,
  PostApplicationQuestionsRequest,
} from '@/schemas/admin/admin-application-questions.schema';
import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';

/**
 * 어드민 지원서 조회 get
 * @param param0
 * @returns 어드민 지원서 파트별 리스트
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
 * 어드민 지원서 수정 post
 * @param body
 *
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
