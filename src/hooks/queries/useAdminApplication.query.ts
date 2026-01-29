import {QUERY_KEYS} from '@/constants/query-keys';
import {EvaluatorType} from '@/schemas/admin/admin-application.schema';
import {
  getAdminApplicationBasicInfo,
  getAdminApplicationEtcQuestions,
  getAdminApplicationEvaluation,
  getAdminApplicationPartQuestions,
} from '@/services/api/admin/admin-application.api';
import {getFileUrl} from '@/services/api/apply/apply.api';
import {useQuery} from '@tanstack/react-query';

/**
 * 어드민 - 지원서 열람 탭에서 해당 지원자의 지원서 기본 정보를 조회하는 쿼리 훅
 * - 지원서 상세 페이지 헤더 및 기본 정보 step에서 사용
 * @param applicationId 지원서 id
 * @returns react query
 */
export const useAdminApplicationBasicInfo = (applicationId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN_APPLICATION_BASIC_INFO, applicationId],
    queryFn: () => getAdminApplicationBasicInfo(applicationId),
    enabled: !!applicationId,
  });
};

/**
 * 어드민 - 지원서 열람 탭에서 해당 지원자의 지원서 파트별 질문에 대한 답변을 조회하는 쿼리 훅
 * - 지원서 파트별 질문 step에서 사용
 * @param applicationId 지원서 id
 * @returns react query
 */
export const useAdminApplicationPartQuestions = (applicationId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN_APPLICATION_PART_QUESTIONS, applicationId],
    queryFn: () => getAdminApplicationPartQuestions(applicationId),
    enabled: !!applicationId,
  });
};

/**
 * 어드민 - 지원서 열람 탭에서 해당 지원자의 지원서 기타 질문에 대한 답변을 조회하는 쿼리 훅
 * - 지원서 기타 질문 step에서 사용
 * @param applicationId 지원서 id
 * @returns react query
 */
export const useAdminApplicationEtcQuestions = (applicationId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN_APPLICATION_ETC_QUESTIONS, applicationId],
    queryFn: () => getAdminApplicationEtcQuestions(applicationId),
    enabled: !!applicationId,
  });
};

/**
 * 어드민 - 지원서 열람 탭에서 해당 지원자의 운영진 평가 데이터를 조회하는 쿼리 훅
 * @param applicationId 지원서 id
 * @param evaluatorType 운영진 타입
 * @returns react query
 */
export const useAdminApplicationEvaluation = ({
  applicationId,
  evaluatorType,
}: {
  applicationId: number;
  evaluatorType: EvaluatorType;
}) => {
  return useQuery({
    queryKey: [
      QUERY_KEYS.ADMIN_APPLICATION_EVALUATION,
      applicationId,
      evaluatorType,
    ],
    queryFn: () =>
      getAdminApplicationEvaluation({applicationId, evaluatorType}),
    enabled: !!applicationId && !!evaluatorType,
  });
};

/**
 * 어드민 - 지원서 열람 탭에서 해당 지원자의 포트폴리오 url을 조회하는 쿼리 훅
 * @param pdfFileKey 지원서 pdf File key
 * @returns react query
 */
export const useAdminApplicationPdfUrl = (
  pdfFileKey: string | null | undefined
) => {
  return useQuery({
    queryKey: ['admin-application-pdf-url', pdfFileKey],
    queryFn: () => {
      if (!pdfFileKey) {
        throw new Error('pdfFileKey is required');
      }
      return getFileUrl(pdfFileKey);
    },
    enabled: !!pdfFileKey,
    select: (data) => data.pdfUrl,
  });
};
