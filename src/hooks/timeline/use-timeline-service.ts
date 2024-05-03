import { useQuery } from '@tanstack/react-query';

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
  timeline: (projectId: string) => ['timeline', projectId],
  timelineByTime : (projectId: string, time: string) => ['timeline', projectId, time],
};

export const useGetTimelines = () => {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery<GetTimelinesResponse>({
    queryKey: timelineQueryKeys.timelines,
    queryFn: () => fetcher({ url: '/api/timeline', method: 'GET' }),
  });

  return { timelines: result?.data, isLoading, isFetching };
};

export const useGetTimelinesById = (request: GetTimelinesRequest) => {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery<GetTimelinesResponse>({
    queryKey: timelineQueryKeys.timeline(request.projectId),
    enabled: !!request.projectId,
    queryFn: () =>
      fetcher({ url: `/api/timeline?id=${request.projectId}`, method: 'GET' }),
  });

  return { timelines: result?.data, isLoading, isFetching };
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
