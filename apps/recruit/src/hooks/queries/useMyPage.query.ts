import {QUERY_KEYS} from '@/constants/query-keys';
import {
  getMyApplicationBasicInfo,
  getMyApplicationEtcQuestions,
  getMyApplicationPartQuestions,
  myPageApi,
} from '@/services/api/my-page/my-page.api';
import {useQuery} from '@tanstack/react-query';

export const useSubmittedApplications = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.MY_PAGE_SUBMITTED_APPLICATIONS],
    queryFn: myPageApi.getSubmittedApplications,
  });
};

export const useMyApplicationBasicInfo = (applicationId: number) => {
  return useQuery({
    queryKey: ['myApplication', 'basic', applicationId],
    queryFn: () => getMyApplicationBasicInfo(applicationId),
    enabled: !!applicationId,
  });
};

export const useMyApplicationPartQuestions = (applicationId: number) => {
  return useQuery({
    queryKey: ['myApplication', 'part', applicationId],
    queryFn: () => getMyApplicationPartQuestions(applicationId),
    enabled: !!applicationId,
  });
};

export const useMyApplicationEtcQuestions = (applicationId: number) => {
  return useQuery({
    queryKey: ['myApplication', 'etc', applicationId],
    queryFn: () => getMyApplicationEtcQuestions(applicationId),
    enabled: !!applicationId,
  });
};
