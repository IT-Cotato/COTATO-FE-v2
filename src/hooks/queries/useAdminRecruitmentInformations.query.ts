import {QUERY_KEYS} from '@/constants/query-keys';
import type {RecruitmentInformation} from '@/schemas/admin/admin-recruitment-information.schema';
import {getRecruitmentInformations} from '@/services/api/admin/admin.recruitment.info.api';
import type {ErrorResponse} from '@/schemas/common/common-schema';
import {useQuery} from '@tanstack/react-query';

export const useAdminRecruitmentInformationsQuery = (generationId: number) =>
  useQuery<RecruitmentInformation, ErrorResponse>({
    queryKey: [QUERY_KEYS.ADMIN_RECRUITMENT_INFORMATIONS, generationId],
    queryFn: () => getRecruitmentInformations(generationId),
  });
