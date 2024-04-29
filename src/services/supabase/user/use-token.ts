import prisma from '@/libs/prisma';

import { UseTokenRequest, UseTokenResponse } from '@/types/user';

import { getUserData } from './get-user-data';

export const useToken = async (
  request: UseTokenRequest,
): Promise<UseTokenResponse> => {
  const { data: user } = await getUserData();

  if (user.token < request.usage) {
    throw new Error('토큰이 부족합니다. 다시 시도해주세요.');
  }

  const updated = await prisma.users.update({
    where: {
      id: user.id,
    },
    data: {
      token: user.token - request.usage,
    },
  });

  if (!updated) {
    throw new Error('유저 정보가 없습니다. 다시 시도해주세요.');
  }

  return {
    data: updated,
    success: true,
    status: 200,
    message: '토큰을 사용했습니다.',
  };
};
