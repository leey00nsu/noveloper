'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import RefreshButton from '@/components/ui/button/refresh-button';

import { pageQueryKeys } from '@/hooks/page/use-page-service';

const PageListRefreshButton = () => {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const refreshHandler = () => {
    queryClient.resetQueries({
      queryKey: pageQueryKeys.pages(projectId as string),
    });
  };

  return <RefreshButton onClick={refreshHandler} />;
};

export default PageListRefreshButton;
