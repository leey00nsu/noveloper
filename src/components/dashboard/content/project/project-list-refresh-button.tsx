'use client';

import { useQueryClient } from '@tanstack/react-query';

import RefreshButton from '@/components/ui/button/refresh-button';

import { projectQueryKeys } from '@/hooks/project/use-project-service';

const ProjectListRefreshButton = () => {
  const queryClient = useQueryClient();

  const refreshHandler = () => {
    queryClient.resetQueries({
      queryKey: projectQueryKeys.projects,
    });
  };

  return <RefreshButton onClick={refreshHandler} />;
};

export default ProjectListRefreshButton;
