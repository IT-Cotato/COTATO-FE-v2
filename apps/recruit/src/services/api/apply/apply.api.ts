import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {
  BasicInfoRequest,
  BasicInfoResponse,
  BasicInfoResponseSchema,
  EtcQuestionRequest,
  EtcQuestionResponse,
  EtcQuestionResponseSchema,
  GetApplicationStatusResponse,
  GetApplicationStatusResponseSchema,
  PartQuestionRequest,
  PartQuestionResponse,
  PartQuestionResponseSchema,
  StartApplicationResponse,
  StartApplicationResponseSchema,
  GetUploadUrlResponse,
  GetUploadUrlResponseSchema,
  GetFileUrlResponse,
  GetFileUrlResponseSchema,
} from '@/schemas/apply/apply-schema';
import axios, {AxiosResponse} from 'axios';
import {
  createSuccessResponseSchema,
  ErrorResponseSchema,
} from '@/schemas/common/common-schema';
import {handleApiError} from '@/services/utils/apiHelper';

/**
 * 지원서 상태 조회
 */
export const getApplicationStatus =
  async (): Promise<GetApplicationStatusResponse> => {
    try {
      const response: AxiosResponse = await privateAxios.get(
        ENDPOINT.APPLY.STATUS
      );

      const responseSchema = createSuccessResponseSchema(
        GetApplicationStatusResponseSchema
      );
      const validatedResponse = responseSchema.parse(response.data);

      return validatedResponse.data;
    } catch (error) {
      return handleApiError(error);
    }
  };

/**
 * 지원서 시작
 */
export const startApplication = async (): Promise<StartApplicationResponse> => {
  try {
    const response: AxiosResponse = await privateAxios.post(
      ENDPOINT.APPLY.START
    );

    const responseSchema = createSuccessResponseSchema(
      StartApplicationResponseSchema
    );

    const parsed = responseSchema.safeParse(response.data);

    if (parsed.success) {
      return parsed.data.data;
    }

    // 파싱 실패 시
    // status 조회 API를 통해 applicationId 재확인 시도
    const statusData = await getApplicationStatus();
    if (statusData && statusData.applicationId) {
      return {
        applicationId: statusData.applicationId,
        isSubmitted: statusData.isSubmitted ?? false,
      };
    }

    throw parsed.error;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * 기본 인적사항 조회
 */
export const getBasicInfo = async (
  applicationId: number
): Promise<BasicInfoResponse> => {
  try {
    const response: AxiosResponse = await privateAxios.get(
      ENDPOINT.APPLY.BASIC_INFO(applicationId)
    );

    const responseSchema = createSuccessResponseSchema(BasicInfoResponseSchema);
    const validatedResponse = responseSchema.parse(response.data);

    return validatedResponse.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * 기본 인적사항 작성(임시저장)
 */
export const saveBasicInfo = async (
  applicationId: number,
  data: BasicInfoRequest
): Promise<void> => {
  try {
    await privateAxios.post(ENDPOINT.APPLY.BASIC_INFO(applicationId), data);
  } catch (error) {
    return handleApiError(error);
  }
};

/** 파트별
 * 질문 조회
 */
export const getPartQuestions = async (
  applicationId: number
): Promise<PartQuestionResponse> => {
  try {
    const response: AxiosResponse = await privateAxios.get(
      ENDPOINT.APPLY.PART_QUESTIONS(applicationId)
    );

    const responseSchema = createSuccessResponseSchema(
      PartQuestionResponseSchema
    );
    const validatedResponse = responseSchema.parse(response.data);

    return validatedResponse.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/** 파트별
 * 질문 작성(임시저장)
 */
export const savePartQuestions = async (
  applicationId: number,
  data: PartQuestionRequest
): Promise<void> => {
  try {
    await privateAxios.post(ENDPOINT.APPLY.ANSWERS(applicationId), data);
  } catch (error) {
    return handleApiError(error);
  }
};

/** 기타 질문 조회 */
export const getEtcQuestions = async (
  applicationId: number
): Promise<EtcQuestionResponse> => {
  try {
    const response: AxiosResponse = await privateAxios.get(
      ENDPOINT.APPLY.ETC_QUESTIONS(applicationId)
    );

    const responseSchema = createSuccessResponseSchema(
      EtcQuestionResponseSchema
    );
    const validatedResponse = responseSchema.parse(response.data);

    return validatedResponse.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/** 기타 질문 작성(임시저장)  */
export const saveEtcQuestions = async (
  applicationId: number,
  data: EtcQuestionRequest
): Promise<void> => {
  try {
    await privateAxios.post(ENDPOINT.APPLY.ETC_ANSWERS(applicationId), data);
  } catch (error) {
    return handleApiError(error);
  }
};

/** 지원서 최종 제출 */
export const submitApplication = async (
  applicationId: number
): Promise<void> => {
  try {
    await privateAxios.post(ENDPOINT.APPLY.SUBMIT(applicationId));
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * 파일 업로드용 Pre-signed URL 조회
 */
export const getUploadUrl = async (
  fileName: string
): Promise<GetUploadUrlResponse> => {
  try {
    const response: AxiosResponse = await privateAxios.get(
      ENDPOINT.FILES.POST_URL,
      {
        params: {fileName},
      }
    );

    const responseSchema = createSuccessResponseSchema(
      GetUploadUrlResponseSchema
    );
    const validatedResponse = responseSchema.parse(response.data);

    return validatedResponse.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * 파일 조회용 URL 조회
 */
export const getFileUrl = async (
  fileKey: string
): Promise<GetFileUrlResponse> => {
  try {
    const response: AxiosResponse = await privateAxios.get(
      ENDPOINT.FILES.GET_URL,
      {
        params: {fileKey},
      }
    );

    const responseSchema = createSuccessResponseSchema(
      GetFileUrlResponseSchema
    );
    const validatedResponse = responseSchema.parse(response.data);

    return validatedResponse.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Pre-signed URL로 S3에 파일 업로드
 */
export const uploadFileToS3 = async (
  preSignedUrl: string,
  file: File
): Promise<void> => {
  await axios.put(preSignedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
};
