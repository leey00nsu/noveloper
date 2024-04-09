import prisma from '@/libs/prisma';
import { createClient } from '@/libs/supabase/server';

export const getProjects = async () => {
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

    const projects = await prisma.projects.findMany({
      where: {
        user_id: user.id,
      },
    });

    return {
      data: projects,
      success: true,
      status: 200,
      message: '프로젝트 목록을 성공적으로 불러왔습니다.',
    };
  } catch (error: any) {
    return { success: false, status: 400, message: error.message };
  }
};
