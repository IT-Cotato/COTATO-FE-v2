import {useQuery} from '@tanstack/react-query';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {useEffect} from 'react';
import {QUERY_KEYS} from '@/constants/query-keys';
import {getRecruitmentStatus} from '@/services/api/recruitment/recruitment-status.api';

export const useRecruitmentStatusQuery = (
  options?: {refetchInterval?: number}
) => {
  const {setIsRecruiting, setGeneration, setIsAdditional} =
    useRecruitmentStore();

  const query = useQuery({
    queryKey: [QUERY_KEYS.RECRUITMENT_STATUS],
    queryFn: getRecruitmentStatus,
    refetchOnWindowFocus: true,
    refetchInterval: options?.refetchInterval,
  });

  // 서버 데이터로 store 동기화
  useEffect(() => {
    if (query.data?.data) {
      const {isActive, generationId, isAdditionalRecruitmentActive} =
        query.data.data;

      setIsRecruiting(isActive);
      setIsAdditional(isAdditionalRecruitmentActive);

      if (generationId !== null) {
        setGeneration(generationId.toString());
      }
    }
  }, [query.data, setIsRecruiting, setIsAdditional, setGeneration]);

  return query;
};
