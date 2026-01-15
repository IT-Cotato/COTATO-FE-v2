import {QUERY_KEYS} from '@/constants/query-keys';
import {RecruitmentInformation} from '@/schemas/admin/admin-recruitment-information-schema';
import {getRecruitmentInformations} from '@/services/api/admin/admin.recruitment.info.api';
import {ErrorResponse} from '@/schemas/common/common-schema';
import {useQuery} from '@tanstack/react-query';

export const useRecruitmentInformationsQuery = (generationId: number) =>
  useQuery<RecruitmentInformation, ErrorResponse>({
    queryKey: [QUERY_KEYS.ADMIN_RECRUITMENT_INFORMATIONS, generationId],
    queryFn: () => getRecruitmentInformations(generationId),
  });
