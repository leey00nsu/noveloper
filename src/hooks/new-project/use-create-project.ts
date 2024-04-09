import { CreateProjectRequest, CreateProjectResponse } from '@/types/project';
import { useMutation } from '@tanstack/react-query';

interface UseCreateProjectProps {
  onSuccess: (response: CreateProjectResponse) => void;
  onError: (response: CreateProjectResponse) => void;
}

const useCreateProject = ({ onSuccess, onError }: UseCreateProjectProps) => {
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
      } else {
        onError(response);
      }
    },
    onError() {},
  });

  return { mutate, isPending };
};

export default useCreateProject;
