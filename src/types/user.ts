import { Users } from '@prisma/client';

import { ApiResponse } from './api';

export interface GetUserResponse extends ApiResponse<Users> {}

export interface UseTokenRequest {
  usage: number;
}
export interface UseTokenResponse extends ApiResponse<Users> {}
