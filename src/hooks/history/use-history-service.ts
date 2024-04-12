import { useQuery } from '@tanstack/react-query';

import { GetHistoriesResponse, GetHistoryResponse } from '@/types/history';

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
    queryFn: async () => {
      const response = await fetch(`/api/history`, {
        method: 'GET',
      });

      const data = await response.json();

      return data;
    },
  });

  return { histories: result?.data, isLoading, isFetching };
};

export const useGetHistoryById = (projectId: string) => {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery<GetHistoryResponse>({
    queryKey: historyQueryKeys.history(projectId),
    enabled: !!projectId,
    queryFn: async () => {
      const response = await fetch(`/api/history?id=${projectId}`, {
        method: 'GET',
      });

      const data = await response.json();

      return data;
    },
  });

  return { project: result?.data, isLoading, isFetching };
};
