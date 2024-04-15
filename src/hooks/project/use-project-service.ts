import {
  DefaultError,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { fetcher } from '@/libs/fetcher';

import {
  CreateProjectRequest,
  CreateProjectResponse,
  GetProjectResponse,
  GetProjectsResponse,
  UpdateProjectRequest,
  UpdateProjectResponse,
} from '@/types/project';

import { historyQueryKeys } from '../history/use-history-service';

export const projectQueryKeys = {
  projects: ['projects'],
  project: (projectId: string) => ['project', projectId],
};

interface UseCreateProjectProps {
  onSuccess: (response: CreateProjectResponse) => void;
  onError: (response: CreateProjectResponse) => void;
}

export const useCreateProject = ({
  onSuccess,
  onError,
}: UseCreateProjectProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<
    CreateProjectResponse,
    DefaultError,
    CreateProjectRequest
  >({
    mutationFn: (project) =>
      fetcher({
        url: `/api/project`,
        method: 'POST',
        body: JSON.stringify(project),
      }),
    onSuccess(response) {
      if (response.success) {
        onSuccess(response);

        // project,history 쿼리 캐시를 갱신합니다.
        queryClient.invalidateQueries({
          queryKey: projectQueryKeys.projects,
        });
        queryClient.invalidateQueries({
          queryKey: historyQueryKeys.histories,
        });
      } else {
        onError(response);
      }
    },
    onError() {},
  });

  return { mutate, isPending };
};

interface UseUpdateProjectProps {
  onSuccess: (response: UpdateProjectResponse) => void;
  onError: (response: UpdateProjectResponse) => void;
}

export const useUpdateProject = ({
  onSuccess,
  onError,
}: UseUpdateProjectProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<
    UpdateProjectResponse,
    DefaultError,
    UpdateProjectRequest
  >({
    mutationFn: (project) =>
      fetcher({
        url: `/api/project`,
        method: 'PATCH',
        body: JSON.stringify(project),
      }),

    onSuccess(response) {
      if (response.success) {
        onSuccess(response);

        // 변경한 project,history 쿼리 캐시를 갱신합니다.
        queryClient.invalidateQueries({
          queryKey: projectQueryKeys.project(response.data.id),
        });
        queryClient.invalidateQueries({
          queryKey: historyQueryKeys.history(response.data.id),
        });
      } else {
        onError(response);
      }
    },
    onError() {},
  });

  return { mutate, isPending };
};

export const useGetProjects = () => {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery<GetProjectsResponse>({
    queryKey: projectQueryKeys.projects,
    queryFn: () => fetcher({ url: `/api/project`, method: 'GET' }),
  });

  return { projects: result?.data, isLoading, isFetching };
};

export const useGetProjectById = (projectId: string) => {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery<GetProjectResponse>({
    queryKey: projectQueryKeys.project(projectId),
    enabled: !!projectId,
    queryFn: () =>
      fetcher({ url: `/api/project?id=${projectId}`, method: 'GET' }),
  });

  return { project: result?.data, isLoading, isFetching };
};
