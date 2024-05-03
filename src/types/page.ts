import { Pages, Prisma } from '@prisma/client';
import { z } from 'zod';

import { ApiResponse, Order } from './api';

export const CreatePageSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: '페이지 제목은 1자 이상 50자 이하로 입력해주세요.' })
    .max(50, { message: '페이지 제목은 1자 이상 50자 이하로 입력해주세요.' }),
  summary: z
    .string()
    .trim()
    .min(1, { message: '페이지 요약은 1자 이상 100자 이하로 입력해주세요.' })
    .max(100, { message: '페이지 요약은 1자 이상 100자 이하로 입력해주세요.' }),
  contentText: z.string(),
});

export const PageOrderBySchema = z.enum(['title', 'createdAt']).catch('title');
export type PageOrderBy = z.infer<typeof PageOrderBySchema>;

export interface CreatePageForm extends z.infer<typeof CreatePageSchema> {}

export interface CreatePageRequest extends CreatePageForm {
  projectId: string;
  content: Prisma.JsonValue;
}
export interface CreatePageResponse extends ApiResponse<Pages> {}
export interface GetPageRequest {
  projectId: string;
  pageId: number;
}
export interface GetPageResponse extends ApiResponse<Pages> {}
export interface GetPagesRequest {
  projectId: string;
  orderBy: PageOrderBy;
  order: Order;
  search: string;
}
export interface GetPagesResponse extends ApiResponse<Pages[]> {}
export interface UpdatePageRequest extends CreatePageRequest {
  pageId: number;
}
export interface UpdatePageResponse extends ApiResponse<Pages> {}

export interface DeletePageRequest extends GetPageRequest {}
export interface DeletePageResponse extends ApiResponse<Pages> {}
