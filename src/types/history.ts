import { Histories } from '@prisma/client';

import { ApiResponse } from './api';

export interface CreateHistoryRequest {
  projectId: string;
  title: string;
  content: string;
}

export interface CreateHistoryResponse extends ApiResponse<Histories> {}
export interface GetHistoriesRequest {
  projectId: string;
}
export interface GetHistoriesResponse extends ApiResponse<Histories[]> {}
export interface GetHistoriesByYearRequest extends GetHistoriesRequest {
  year: string;
}
export interface GetHistoriesByYearResponse extends ApiResponse<Histories[]> {}
