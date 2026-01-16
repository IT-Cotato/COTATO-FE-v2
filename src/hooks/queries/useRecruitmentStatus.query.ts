import {useQuery} from '@tanstack/react-query';
import {publicAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {useEffect} from 'react';
import {GetRecruitmentStatusResponseSchema} from '@/schemas/status/recruitment-status.schema';
import {QUERY_KEYS} from '@/constants/query-keys';

export const useRecruitmentStatusQuery = () => {
  const {setIsRecruiting, setGeneration, setIsAdditional} =
    useRecruitmentStore();

  const query = useQuery({
    queryKey: [QUERY_KEYS.RECRUITMENT_STATUS],
    queryFn: async () => {
      const response = await publicAxios.get(ENDPOINT.RECRUITMENT.STATUS);
      return GetRecruitmentStatusResponseSchema.parse(response.data);
    },
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
