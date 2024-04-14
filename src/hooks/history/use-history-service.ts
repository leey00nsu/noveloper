import { useQuery } from '@tanstack/react-query';

import { fetcher } from '@/libs/fetcher';

import { GetHistoriesResponse } from '@/types/history';

export const historyQueryKeys = {
  histories: ['histories'],
  history: (projectId: string) => ['history', projectId],
};

export const useGetHistories = () => {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery<GetHistoriesResponse>({
    queryKey: historyQueryKeys.histories,
    queryFn: () => fetcher({ url: '/api/history', method: 'GET' }),
  });

  return { histories: result?.data, isLoading, isFetching };
};

export const useGetHistoriesById = (projectId: string) => {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery<GetHistoriesResponse>({
    queryKey: historyQueryKeys.history(projectId),
    enabled: !!projectId,
    queryFn: () =>
      fetcher({ url: `/api/history?id=${projectId}`, method: 'GET' }),
  });

  return { histories: result?.data, isLoading, isFetching };
};
