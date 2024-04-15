import prisma from '@/libs/prisma';

import { CreateProjectRequest, CreateProjectResponse } from '@/types/project';

import { createHistory } from '../history/create-history';
import { getUserData } from '../user/get-user-data';

export const createProject = async (
  project: CreateProjectRequest,
): Promise<CreateProjectResponse> => {
  const { data: user } = await getUserData();

  const created = await prisma.projects.create({
    data: {
      userId: user.id,
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
    content: `${project.title} 프로젝트가 생성되었습니다.`,
  });

  return {
    data: created,
    success: true,
    status: 201,
    message: '프로젝트가 생성되었습니다.',
  };
};
