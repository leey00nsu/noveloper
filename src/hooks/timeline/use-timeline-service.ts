import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { fetcher } from '@/libs/fetcher';

import {
  GetTimelinesByDateRequest,
  GetTimelinesByDateResponse,
  GetTimelinesByYearRequest,
  GetTimelinesByYearResponse,
  GetTimelinesRequest,
  GetTimelinesResponse,
} from '@/types/timeline';

export const timelineQueryKeys = {
  timelines: ['timeline'],
  timelinesById: (projectId: string) => ['timeline', projectId],
  timelineByTime: (projectId: string, time: string) => [
    'timeline',
    projectId,
    time,
  ],
};

export const useGetTimelines = (request: GetTimelinesRequest) => {
  const {
    data: result,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<GetTimelinesResponse>({
    queryKey: timelineQueryKeys.timelinesById(request.projectId),
    queryFn: ({ pageParam }) =>
      fetcher({
        url: `/api/timeline?cursor=${pageParam}&id=${request.projectId}`,
        method: 'GET',
      }),
    initialPageParam: request.cursor,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  return {
    timelines: result,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};

export const useGetTimelinesByYear = (request: GetTimelinesByYearRequest) => {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery<GetTimelinesByYearResponse>({
    queryKey: timelineQueryKeys.timelineByTime(request.projectId, request.year),
    enabled: !!request.projectId,
    queryFn: () =>
      fetcher({
        url: `/api/timeline?id=${request.projectId}&year=${request.year}`,
        method: 'GET',
      }),
  });

  return { timelines: result?.data, isLoading, isFetching };
};

export const useGetTimelinesByDate = (request: GetTimelinesByDateRequest) => {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery<GetTimelinesByDateResponse>({
    queryKey: timelineQueryKeys.timelineByTime(request.projectId, request.date),
    enabled: !!request.projectId,
    queryFn: () =>
      fetcher({
        url: `/api/timeline?id=${request.projectId}&date=${request.date}`,
        method: 'GET',
      }),
  });

  return { timelines: result?.data, isLoading, isFetching };
};
