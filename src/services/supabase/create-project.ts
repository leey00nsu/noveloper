import prisma from '@/libs/prisma';

import { CreateProjectRequest } from '@/types/project';

import { createHistory } from './create-history';
import { getUserData } from './get-user-data';

export const createProject = async (project: CreateProjectRequest) => {
  const { data: user } = await getUserData();

  const created = await prisma.projects.create({
    data: {
      user_id: user.id,
      title: project.title,
      janres: project.janres,
      author: project.author,
      synopsis: project.synopsis,
    },
  });

  if (!created) {
    throw new Error('프로젝트 생성에 실패했습니다. 다시 시도해주세요.');
  }

  await createHistory({
    projectId: created.id,
    title: `${project.title} 생성`,
  });

  return {
    success: true,
    status: 201,
    message: '프로젝트가 생성되었습니다.',
  };
};
