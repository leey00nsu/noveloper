import {
  DefaultError,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { fetcher } from '@/libs/fetcher';

import { Order } from '@/types/api';
import {
  CreateProjectRequest,
  CreateProjectResponse,
  DeleteProjectRequest,
  DeleteProjectResponse,
  GetProjectResponse,
  GetProjectsRequest,
  GetProjectsResponse,
  ProjectOrderBy,
  UpdateProjectRequest,
  UpdateProjectResponse,
} from '@/types/project';

import { timelineQueryKeys } from '../timeline/use-timeline-service';
import { userQueryKeys } from '../user/use-user-service';

export const projectQueryKeys = {
  all: ['project'],
  projects: ['project', 'list'],
  projectsWithFilter: (
    orderBy: ProjectOrderBy,
    order: Order,
    search: string,
  ) => ['project', 'list', orderBy, order, search],
  project: (projectId: string) => ['project', 'detail', projectId],
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
          queryKey: userQueryKeys.all,
        });
        queryClient.invalidateQueries({
          queryKey: projectQueryKeys.all,
        });
        queryClient.invalidateQueries({
          queryKey: timelineQueryKeys.all,
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
          queryKey: projectQueryKeys.all,
        });
        queryClient.invalidateQueries({
          queryKey: timelineQueryKeys.all,
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
          queryKey: projectQueryKeys.all,
        });
        queryClient.invalidateQueries({
          queryKey: timelineQueryKeys.all,
        });
      } else {
        onError(response);
      }
    },
    onError() {},
  });

  return { mutate, isPending };
};

export const useGetProjects = (request: GetProjectsRequest) => {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery<GetProjectsResponse>({
    queryKey: projectQueryKeys.projectsWithFilter(
      request.orderBy,
      request.order,
      request.search,
    ),
    queryFn: () =>
      fetcher({
        url: `/api/project?order-by=${request.orderBy}&order=${request.order}&search=${request.search}`,
        method: 'GET',
      }),
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
