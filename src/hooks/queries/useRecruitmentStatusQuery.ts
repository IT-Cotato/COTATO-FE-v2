import {useQuery} from '@tanstack/react-query';
import {publicAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {GetRecruitmentStatusResponseSchema} from '@/schemas/recruitment-status-schema';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {useEffect} from 'react';

export const RECRUITMENT_STATUS_KEY = 'recruitmentStatus';

export const useRecruitmentStatusQuery = () => {
  const {setIsRecruiting, setGeneration, setIsAdditional} =
    useRecruitmentStore();

  const query = useQuery({
    queryKey: [RECRUITMENT_STATUS_KEY],
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
