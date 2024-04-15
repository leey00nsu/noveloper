import { User } from '@supabase/supabase-js';

import prisma from '@/libs/prisma';

import { GetUserResponse } from '@/types/user';

import { PLANS } from '@/constants/plan/plan';

export const findOrInsertUser = async (
  user: User,
): Promise<GetUserResponse> => {
  const userData = await prisma.users.findUnique({
    where: {
      id: user.id,
    },
  });

  if (userData) {
    return {
      data: userData,
      success: true,
      status: 200,
      message: '유저 정보를 성공적으로 불러왔습니다.',
    };
  }

  const created = await prisma.users.create({
    data: {
      id: user.id,
      userName: user.user_metadata.full_name,
      token: PLANS.FREE.token,
      plan: 'FREE',
    },
  });

  if (!created) {
    throw new Error('유저 생성에 실패했습니다. 다시 시도해주세요.');
  }

  return {
    data: created,
    success: true,
    status: 201,
    message: '유저가 생성되었습니다.',
  };
};
