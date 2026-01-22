import {useMutation, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/query-keys';
import {saveMailContent, sendMail} from '@/services/api/admin/admin-mail.api';
import {ErrorResponse} from '@/schemas/common/common-schema';

export const useAdminMailMutation = (
  generationId: number,
  mailType: string
) => {
  const queryClient = useQueryClient();
  const queryKey = [QUERY_KEYS.MAIL_STATUS, generationId, mailType];

  const saveMutation = useMutation({
    mutationFn: (content: string) =>
      saveMailContent(generationId, mailType, content),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey});
    },
    onError: (error: ErrorResponse | Error) => {
      alert(error.message || '저장 중 오류가 발생했습니다.');
    },
  });

  const sendMutation = useMutation({
    mutationFn: () => sendMail(generationId, mailType),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey});
    },
    onError: (error: ErrorResponse | Error) => {
      alert(error.message || '전송 중 오류가 발생했습니다.');
    },
  });

  return {
    save: saveMutation.mutate,
    send: sendMutation.mutate,
    isSaving: saveMutation.isPending,
    isSending: sendMutation.isPending,
  };
};
