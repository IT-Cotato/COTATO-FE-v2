import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/query-keys';
import {getMailData} from '@/services/api/admin/admin.mail.api';

export const useAdminMailQuery = (generationId: number, mailType: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MAIL_STATUS, generationId, mailType],
    queryFn: () => getMailData(generationId, mailType),
  });
};
