'use client';

import { projectQueryKeys } from '@/hooks/project/use-project-service';
import { ActionIcon } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { IoMdRefresh } from 'react-icons/io';

const ProjectListRefreshButton = () => {
  const queryClient = useQueryClient();

  const refreshHandler = () => {
    queryClient.resetQueries({
      queryKey: projectQueryKeys.projects,
    });
  };

  return (
    <ActionIcon className="h-full" onClick={refreshHandler}>
      <IoMdRefresh />
    </ActionIcon>
  );
};

export default ProjectListRefreshButton;
