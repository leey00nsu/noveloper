import { Characters } from '@prisma/client';
import { z } from 'zod';

import { ApiResponse } from './api';

export const CreateCharacterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: '이름은 1자 이상 50자 이하로 입력해주세요.' })
    .max(50, { message: '이름은 1자 이상 50자 이하로 입력해주세요.' }),
  age: z.string(),
  description: z
    .string()
    .trim()
    .min(1, { message: '설명은 1자 이상 50자 이하로 입력해주세요.' })
    .max(50, { message: '설명은 1자 이상 50자 이하로 입력해주세요.' }),
});

export interface CreateCharacterForm
  extends z.infer<typeof CreateCharacterSchema> {}

export interface CreateCharacterRequest extends CreateCharacterForm {
  projectId: string;
}
export interface CreateCharacterResponse extends ApiResponse<Characters> {}
export interface GetCharacterRequest {
  projectId: string;
  characterId: number;
}
export interface GetCharacterResponse extends ApiResponse<Characters> {}
export interface GetCharactersRequest {
  projectId: string;
}
export interface GetCharactersResponse extends ApiResponse<Characters[]> {}
export interface UpdateCharacterRequest extends CreateCharacterRequest {
  characterId: number;
}
export interface UpdateCharacterResponse extends ApiResponse<Characters> {}

export interface DeleteCharacterRequest extends GetCharacterRequest {}
export interface DeleteCharacterResponse extends ApiResponse<Characters> {}
