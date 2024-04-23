'use client';

import { ActionIcon } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { IoMdRefresh } from 'react-icons/io';

import { pageQueryKeys } from '@/hooks/page/use-page-service';

const PageListRefreshButton = () => {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const refreshHandler = () => {
    queryClient.resetQueries({
      queryKey: pageQueryKeys.pages(projectId as string),
    });
  };

  return (
    <ActionIcon className="h-full" onClick={refreshHandler}>
      <IoMdRefresh />
    </ActionIcon>
  );
};

export default PageListRefreshButton;
