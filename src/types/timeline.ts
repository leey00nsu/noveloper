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
}
export interface GetTimelinesResponse extends ApiResponse<Timelines[]> {}
export interface GetTimelinesByYearRequest extends GetTimelinesRequest {
  year: string;
}
export interface GetTimelinesByYearResponse extends ApiResponse<Timelines[]> {}
export interface GetTimelinesByDateRequest extends GetTimelinesRequest {
  date: string;
}
export interface GetTimelinesByDateResponse extends ApiResponse<Timelines[]> {}
