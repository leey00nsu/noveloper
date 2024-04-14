import prisma from '@/libs/prisma';

import { getUserData } from './get-user-data';

export const getProjects = async () => {
  const { data: user } = await getUserData();

  const projects = await prisma.projects.findMany({
    where: {
      user_id: user.id,
    },
  });

  if (!projects) {
    throw new Error('프로젝트 정보가 없습니다. 다시 시도해주세요.');
  }

  return {
    data: projects,
    success: true,
    status: 200,
    message: '프로젝트 목록을 성공적으로 불러왔습니다.',
  };
};
