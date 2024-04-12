import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  CreateProjectRequest,
  CreateProjectResponse,
  ProjectResponse,
  ProjectsResponse,
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

  const { mutate, isPending } = useMutation({
    mutationFn: async (project: CreateProjectRequest) => {
      const response = await fetch('/api/project', {
        method: 'POST',
        body: JSON.stringify(project),
      });

      const data = await response.json();

      return data;
    },
    onSuccess(response: CreateProjectResponse) {
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

export const useGetProjects = () => {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery<ProjectsResponse>({
    queryKey: projectQueryKeys.projects,
    queryFn: async () => {
      const response = await fetch(`/api/project`, {
        method: 'GET',
      });

      const data = await response.json();

      return data;
    },
  });

  return { projects: result?.data, isLoading, isFetching };
};

export const useGetProjectById = (projectId: string) => {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery<ProjectResponse>({
    queryKey: projectQueryKeys.project(projectId),
    enabled: !!projectId,
    queryFn: async () => {
      const response = await fetch(`/api/project?id=${projectId}`, {
        method: 'GET',
      });

      const data = await response.json();

      return data;
    },
  });

  return { project: result?.data, isLoading, isFetching };
};
