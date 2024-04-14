import { Users } from '@prisma/client';

import { ApiResponse } from './api';

export interface GetUserResponse extends ApiResponse<Users> {}
