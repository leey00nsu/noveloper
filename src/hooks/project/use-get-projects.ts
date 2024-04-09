import { ProjectListResponse } from '@/types/project';
import { useQuery } from '@tanstack/react-query';

const useGetProjects = () => {
  const { data: result } = useQuery<ProjectListResponse>({
    queryKey: ['projectList'],
    queryFn: async () => {
      const response = await fetch('/api/project', {
        method: 'GET',
      });

      const data = await response.json();

      return data;
    },
  });

  return { projects: result?.data };
};

export default useGetProjects;
