import prisma from '@/libs/prisma';
import { createClient } from '@/libs/supabase/server';

export const getUserData = async () => {
  const supabase = createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('세션 정보가 없습니다. 로그인 후 다시 시도해주세요.');
    }

    const userData = await prisma.users.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!userData) {
      throw new Error('사용자 정보가 없습니다. 다시 시도해주세요.');
    }

    return {
      data: userData,
      success: true,
      status: 200,
      message: '유저 정보를 성공적으로 불러왔습니다.',
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
