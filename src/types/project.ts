import { Projects } from '@prisma/client';
import { z } from 'zod';

import { ApiResponse } from './api';

export const CreateProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: '작품 제목은 1자 이상 50자 이하로 입력해주세요.' })
    .max(50, { message: '작품 제목은 1자 이상 50자 이하로 입력해주세요.' }),
  author: z
    .string()
    .trim()
    .min(1, { message: '작가 이름은 1자 이상 50자 이하로 입력해주세요.' })
    .max(50, { message: '작가 이름은 1자 이상 50자 이하로 입력해주세요.' }),
  janres: z
    .string()
    .array()
    .min(1, { message: '장르는 1개 이상 선택해주세요.' }),
  synopsis: z
    .string()
    .trim()
    .min(1, {
      message: '시놉시스는 1자 이상 200자 이하로 입력해주세요.',
    })
    .max(200, {
      message: '시놉시스는 1자 이상 200자 이하로 입력해주세요.',
    }),
});

export type CreateProjectRequest = z.infer<typeof CreateProjectSchema>;

export interface CreateProjectResponse extends ApiResponse<Projects> {}
export interface GetProjectRequest {
  projectId: string;
}
export interface GetProjectsResponse extends ApiResponse<Projects[]> {}
export interface GetProjectResponse extends ApiResponse<Projects> {}
export interface UpdateProjectRequest extends CreateProjectRequest {
  projectId: string;
}
export interface UpdateProjectResponse extends ApiResponse<Projects> {}
export interface DeleteProjectRequest extends GetProjectRequest {}
export interface DeleteProjectResponse extends ApiResponse<Projects> {}
