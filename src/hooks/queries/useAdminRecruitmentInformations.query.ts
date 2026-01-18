import {QUERY_KEYS} from '@/constants/query-keys';
import type {RecruitmentInformation} from '@/schemas/admin/admin-recruitment-information.schema';

import type {ErrorResponse} from '@/schemas/common/common-schema';
import {getAdminRecruitmentInformations} from '@/services/api/admin/admin.recruitment.info.api';
import {useQuery} from '@tanstack/react-query';

export const useAdminRecruitmentInformationsQuery = (generationId: number) =>
  useQuery<RecruitmentInformation, ErrorResponse>({
    queryKey: [QUERY_KEYS.ADMIN_RECRUITMENT_INFORMATIONS, generationId],
    queryFn: () => getAdminRecruitmentInformations(generationId),
  });
