import { Histories } from '@prisma/client';

import { ApiResponse } from './api';

export interface CreateHistoryRequest {
  projectId: string;
  title: string;
  content: string;
}

export interface CreateHistoryResponse extends ApiResponse<Histories> {}
export interface GetHistoriesResponse extends ApiResponse<Histories[]> {}
export interface GetHistoryResponse extends ApiResponse<Histories> {}
