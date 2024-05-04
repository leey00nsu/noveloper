import { Timelines } from '@prisma/client';

import { ApiResponse } from './api';

export interface CreateTimelineRequest {
  projectId: string;
  title: string;
  content: string;
}

export interface CreateTimelineResponse extends ApiResponse<Timelines> {}

export interface GetTimelinesRequest {
  projectId: string;
  cursor: number;
}
export interface GetTimelinesResponse extends ApiResponse<Timelines[]> {}
export interface GetTimelinesByYearRequest {
  projectId: string;
  year: string;
}
export interface GetTimelinesByYearResponse extends ApiResponse<Timelines[]> {}
export interface GetTimelinesByDateRequest {
  projectId: string;
  date: string;
}
export interface GetTimelinesByDateResponse extends ApiResponse<Timelines[]> {}
