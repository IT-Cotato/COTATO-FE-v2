import {useQuery} from '@tanstack/react-query';
import {publicAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {GetRecruitmentScheduleResponseSchema} from '@/schemas/recruit/recruitment-schedule.schema';
import {RecruitmentInformationType} from '@/schemas/admin/admin-recruitment-information.schema';

const QUERY_KEY = 'recruitment-schedule';

export const useRecruitmentScheduleQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      const response = await publicAxios.get(ENDPOINT.RECRUITMENT.SCHEDULE);
      return GetRecruitmentScheduleResponseSchema.parse(response.data);
    },
    staleTime: 0,
    refetchOnMount: 'always',
    select: (data): RecruitmentInformationType | null => {
      if (!data?.data) return null;

      const schedule = data.data;
      return {
        recruitmentStart: schedule.applicationStartDate,
        recruitmentEnd: schedule.applicationEndDate,
        documentAnnouncement: schedule.documentAnnouncement,
        interviewStart: schedule.interviewStartDate,
        interviewEnd: schedule.interviewEndDate,
        finalAnnouncement: schedule.finalAnnouncement,
        ot: schedule.otDate,
      };
    },
  });
};
