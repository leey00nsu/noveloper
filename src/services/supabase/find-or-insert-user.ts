import { User } from '@supabase/supabase-js';

import prisma from '@/libs/prisma';

export const findOrInsertUser = async (user: User) => {
  try {
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
        user_name: user.user_metadata.full_name,
        token: 0,
        plan_id: 0,
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
  } catch (error: any) {
    throw new Error(error.message);
  }
};
