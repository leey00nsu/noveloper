import { Pages } from '@prisma/client';
import { z } from 'zod';

import { ApiResponse } from './api';

export const CreatePageSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: '페이지 제목은 1자 이상 50자 이하로 입력해주세요.' })
    .max(50, { message: '페이지 제목은 1자 이상 50자 이하로 입력해주세요.' }),
  content: z.any(),
});

export interface CreatePageRequest extends z.infer<typeof CreatePageSchema> {
  projectId: string;
}
export interface CreatePageResponse extends ApiResponse<Pages> {}
export interface GetPageRequest {
  projectId: string;
  pageId: number;
}
export interface GetPageResponse extends ApiResponse<Pages> {}
export interface GetPagesRequest {
  projectId: string;
}
export interface GetPagesResponse extends ApiResponse<Pages[]> {}
export interface UpdatePageRequest extends CreatePageRequest {
  pageId: number;
}
export interface UpdatePageResponse extends ApiResponse<Pages> {}
