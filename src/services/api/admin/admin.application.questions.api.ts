import {
  GetApplicationQuestionsResponseSchema,
  PartType,
  PostApplicationQuestionsRequest,
} from '@/schemas/admin/admin-application-questions.schema';
import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';

/**
 * 어드민 지원서 조회 get
 * @param param0
 * @returns 어드민 지원서 파트별 리스트
 */
export const getApplicationQuestions = async ({
  generationId,
  questionType,
}: {
  generationId: number;
  questionType: PartType;
}) => {
  const {data} = await privateAxios.get(ENDPOINT.ADMIN.APPLICATION_QUESTIONS, {
    params: {
      generationId,
      questionType,
    },
  });

  return GetApplicationQuestionsResponseSchema.parse(data);
};

/**
 * 어드민 지원서 수정 post
 * @param body
 *
 */
export const postAdminApplicationQuestions = async (
  body: PostApplicationQuestionsRequest
) => {
  await privateAxios.post(ENDPOINT.ADMIN.APPLICATION_QUESTIONS, body);

  return null;
};
