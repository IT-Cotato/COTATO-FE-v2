import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {
  BasicInfoRequest,
  BasicInfoResponse,
  BasicInfoResponseSchema,
  PartQuestionRequest,
  PartQuestionResponse,
  PartQuestionResponseSchema,
  StartApplicationResponse,
  StartApplicationResponseSchema,
} from '@/schemas/apply/apply-schema';
import {AxiosResponse} from 'axios';
import {createSuccessResponseSchema} from '@/schemas/common/common-schema';

/**
 * 지원서 시작
 */
export const startApplication = async (): Promise<StartApplicationResponse> => {
  const response: AxiosResponse = await privateAxios.post(ENDPOINT.APPLY.START);

  const responseSchema = createSuccessResponseSchema(
    StartApplicationResponseSchema
  );
  const validatedResponse = responseSchema.parse(response.data);

  return validatedResponse.data;
};

/**
 * 기본 인적사항 조회
 */
export const getBasicInfo = async (
  applicationId: number
): Promise<BasicInfoResponse> => {
  const response: AxiosResponse = await privateAxios.get(
    ENDPOINT.APPLY.BASIC_INFO(applicationId)
  );

  const responseSchema = createSuccessResponseSchema(BasicInfoResponseSchema);
  const validatedResponse = responseSchema.parse(response.data);

  return validatedResponse.data;
};

/**
 * 기본 인적사항 작성(임시저장)
 */
export const saveBasicInfo = async (
  applicationId: number,
  data: BasicInfoRequest
): Promise<void> => {
  await privateAxios.post(ENDPOINT.APPLY.BASIC_INFO(applicationId), data);
};

/** 파트별
 * 질문 조회
 */
export const getPartQuestions = async (
  applicationId: number
): Promise<PartQuestionResponse> => {
  const response: AxiosResponse = await privateAxios.get(
    ENDPOINT.APPLY.PART_QUESTIONS(applicationId)
  );

  const responseSchema = createSuccessResponseSchema(
    PartQuestionResponseSchema
  );
  const validatedResponse = responseSchema.parse(response.data);

  return validatedResponse.data;
};

/** 파트별
 * 질문 작성(임시저장)
 */
export const savePartQuestions = async (
  applicationId: number,
  data: PartQuestionRequest
): Promise<void> => {
  await privateAxios.post(ENDPOINT.APPLY.ANSWERS(applicationId), data);
};
