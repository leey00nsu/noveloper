import { ProjectResponse } from '@/types/project';
import { useQuery } from '@tanstack/react-query';

const useGetProjectById = (projectId: string) => {
  const { data: result, isLoading } = useQuery<ProjectResponse>({
    queryKey: ['project', projectId],
    enabled: !!projectId,
    queryFn: async () => {
      const response = await fetch(`/api/project?id=${projectId}`, {
        method: 'GET',
      });

      const data = await response.json();

      return data;
    },
  });

  return { project: result?.data, isLoading };
};

export default useGetProjectById;
