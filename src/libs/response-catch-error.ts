import { Prisma } from '@prisma/client';

import { ApiResponse } from '@/types/api';

/**
 * Promise를 실행하여 에러가 발생하면 에러 객체를 반환합니다.
 * @param promise
 * @returns
 */
export const catchResponseError = async <T>(
  promise: Promise<T>,
): Promise<ApiResponse<null> | T> => {
  try {
    return await promise;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        data: null,
        success: false,
        status: 500,
        message: '데이터베이스 오류가 발생했습니다.',
      };
    }

    if (error instanceof Error) {
      return {
        data: null,
        success: false,
        status: 500,
        message: error.message,
      };
    }
  }

  return {
    data: null,
    success: false,
    status: 500,
    message: '알 수 없는 오류가 발생했습니다.',
  };
};
