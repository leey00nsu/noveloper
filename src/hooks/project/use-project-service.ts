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
  DeleteProjectRequest,
  DeleteProjectResponse,
  GetProjectResponse,
  GetProjectsResponse,
  UpdateProjectRequest,
  UpdateProjectResponse,
} from '@/types/project';

import { timelineQueryKeys } from '../timeline/use-timeline-service';
import { userQueryKeys } from '../user/use-user-service';

export const projectQueryKeys = {
  projects: ['project'],
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

        // user,project,timeline 쿼리 캐시를 갱신합니다.
        queryClient.invalidateQueries({
          queryKey: userQueryKeys.user,
        });
        queryClient.invalidateQueries({
          queryKey: projectQueryKeys.projects,
        });
        queryClient.invalidateQueries({
          queryKey: timelineQueryKeys.timelines,
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

        // 변경한 project,timeline 쿼리 캐시를 갱신합니다.
        queryClient.invalidateQueries({
          queryKey: projectQueryKeys.projects,
        });
        queryClient.invalidateQueries({
          queryKey: timelineQueryKeys.timelines,
        });
      } else {
        onError(response);
      }
    },
    onError() {},
  });

  return { mutate, isPending };
};
interface UseDeleteProjectProps {
  onSuccess: (response: DeleteProjectResponse) => void;
  onError: (response: DeleteProjectResponse) => void;
}

export const useDeleteProject = ({
  onSuccess,
  onError,
}: UseDeleteProjectProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<
    DeleteProjectResponse,
    DefaultError,
    DeleteProjectRequest
  >({
    mutationFn: (project) =>
      fetcher({
        url: `/api/project`,
        method: 'DELETE',
        body: JSON.stringify(project),
      }),
    onSuccess(response) {
      if (response.success) {
        onSuccess(response);

        // 변경한 project,timeline 쿼리 캐시를 갱신합니다.
        queryClient.invalidateQueries({
          queryKey: projectQueryKeys.projects,
        });
        queryClient.invalidateQueries({
          queryKey: timelineQueryKeys.timelines,
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
