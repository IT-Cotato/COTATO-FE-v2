import {QUERY_KEYS} from '@/constants/query-keys';
import type {RecruitmentInformation} from '@/schemas/admin/admin-recruitment-information.schema';

import type {ErrorResponse} from '@/schemas/common/common-schema';
import {getAdminRecruitmentInformations} from '@/services/api/admin/admin-recruitment-info.api';
import {useQuery} from '@tanstack/react-query';

/**
 * 특정 기수의 모집 정보(리크루팅 설정)를 조회하는 React Query 훅
 *
 * - 지원 기간, 서류 발표일, 면접 평가, 최종 발표, ot 날짜 정보를 조회합니다.
 * - 어드민 지원서 수정 페이지의 모집 기간 폼에서 사용됩니다.
 *
 * @param generationId 기수 ID
 * @returns React Query
 */
export const useAdminRecruitmentInformationsQuery = (generationId: number) =>
  useQuery<RecruitmentInformation, ErrorResponse>({
    queryKey: [QUERY_KEYS.ADMIN_RECRUITMENT_INFORMATIONS, generationId],
    queryFn: () => getAdminRecruitmentInformations(generationId),
  });
