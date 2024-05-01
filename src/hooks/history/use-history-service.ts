import { useQuery } from '@tanstack/react-query';

import { fetcher } from '@/libs/fetcher';

import {
  GetHistoriesByYearRequest,
  GetHistoriesByYearResponse,
  GetHistoriesRequest,
  GetHistoriesResponse,
} from '@/types/history';

export const historyQueryKeys = {
  histories: ['histories'],
  history: (projectId: string, year: string = 'all') => [
    'history',
    projectId,
    year,
  ],
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

export const useGetHistoriesById = (request: GetHistoriesRequest) => {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery<GetHistoriesResponse>({
    queryKey: historyQueryKeys.history(request.projectId),
    enabled: !!request.projectId,
    queryFn: () =>
      fetcher({ url: `/api/history?id=${request.projectId}`, method: 'GET' }),
  });

  return { histories: result?.data, isLoading, isFetching };
};

export const useGetHistoriesByYear = (request: GetHistoriesByYearRequest) => {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery<GetHistoriesByYearResponse>({
    queryKey: historyQueryKeys.history(request.projectId, request.year),
    enabled: !!request.projectId,
    queryFn: () =>
      fetcher({
        url: `/api/history?id=${request.projectId}&year=${request.year}`,
        method: 'GET',
      }),
  });

  return { histories: result?.data, isLoading, isFetching };
};
