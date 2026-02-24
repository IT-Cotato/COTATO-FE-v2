import {QUERY_KEYS} from '@/constants/query-keys';
import {
  changeImageOrder,
  completeImageUpload,
  createSession,
  deleteSession,
  deleteSessionImage,
  getPresignedUrl,
  updateSession,
  uploadImageToS3,
} from '@/services/api/session/session.api';
import {useMutation, useQueryClient} from '@tanstack/react-query';

// 세션 생성
export const useCreateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SESSIONS.ADMIN_BASE,
      });
    },
    onError: (error) => {
      console.error('세션 생성 실패:', error);
      alert('세션 생성에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

// 세션 수정
export const useUpdateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSession,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SESSIONS.ADMIN_BASE,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SESSIONS.DETAIL(variables.sessionId),
      });
    },
    onError: (error) => {
      console.error('세션 수정 실패:', error);
      alert('세션 수정에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

export const useUploadSessionImage = () => {
  return useMutation({
    mutationFn: async ({
      sessionId,
      file,
      order,
    }: {
      sessionId: number;
      file: File;
      order: number;
    }) => {
      const {presignedUrl, s3Key} = await getPresignedUrl({
        fileName: file.name,
        contentType: file.type,
      });
      await uploadImageToS3(presignedUrl, file);

      if (sessionId === -1) {
        return {
          imageId: -Date.now(),
          imageUrl: URL.createObjectURL(file),
          s3Key,
          order,
        };
      }

      return completeImageUpload({sessionId, s3Key, order});
    },
    onError: () => {
      alert('이미지 업로드에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

export const useChangeSessionImageOrder = () => {
  return useMutation({
    mutationFn: async ({
      sessionId,
      orderInfos,
    }: {
      sessionId: number;
      orderInfos: {imageId: number; order: number}[];
    }) => {
      await changeImageOrder({sessionId, orderInfos});
    },
    onError: () => {
      alert('이미지 순서 변경에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

export const useDeleteSessionImage = () => {
  return useMutation({
    mutationFn: (imageId: number) => deleteSessionImage({imageId}),
    onError: () => {
      alert('이미지 삭제에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

// 세션 삭제
export const useDeleteSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSession,
    onSuccess: (_, sessionId) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SESSIONS.ADMIN_BASE,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SESSIONS.DETAIL(sessionId),
      });
    },
    onError: (error) => {
      console.error('세션 삭제 실패:', error);
      alert('세션 삭제에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};
