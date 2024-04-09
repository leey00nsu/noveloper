import prisma from '@/libs/prisma';
import { createClient } from '@/libs/supabase/server';
import { CreateProjectRequest } from '@/types/project';

export const createProject = async (project: CreateProjectRequest) => {
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

    await prisma.projects.create({
      data: {
        user_id: user.id,
        title: project.title,
        janres: project.janres,
        author: project.author,
        synopsis: project.synopsis,
      },
    });

    return {
      success: true,
      status: 201,
      message: '프로젝트가 생성되었습니다.',
    };
  } catch (error: any) {
    return { success: false, status: 400, message: error.message };
  }
};
