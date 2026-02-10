import {useMutation, useQueryClient} from '@tanstack/react-query';
import {
  updateProject,
  createProject,
  deleteProject,
} from '@/services/api/project/project.api';
import {ProjectRegistration} from '@/schemas/project/project.schema';
import {QUERY_KEYS} from '@/constants/query-keys';

/**
 * 프로젝트 수정 Mutation
 */
export const useUpdateProjectMutation = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProjectRegistration) => updateProject(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROJECT.DETAIL(projectId),
      });
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
      alert('프로젝트가 수정되었습니다.');
    },
    onError: () => {
      alert('수정에 실패했습니다.');
    },
  });
};

/**
 * 프로젝트 등록 Mutation
 */
export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProjectRegistration) => createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['projects']});
      alert('프로젝트가 등록되었습니다.');
    },
    onError: () => {
      alert('등록에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: number) => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['projects']});
      alert('프로젝트가 성공적으로 삭제되었습니다.');
    },
    onError: () => {
      alert('삭제 중 오류가 발생했습니다.');
    },
  });
};
