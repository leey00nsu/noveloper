import prisma from '@/libs/prisma';

import { CreateProjectRequest, CreateProjectResponse } from '@/types/project';

import { createHistory } from '../history/create-history';
import { getUserData } from '../user/get-user-data';
import { consumeToken } from '../user/use-token';

export const createProject = async (
  request: CreateProjectRequest,
): Promise<CreateProjectResponse> => {
  const { data: user } = await getUserData();

  await consumeToken({
    usage: 50,
  });

  const created = await prisma.projects.create({
    data: {
      userId: user.id,
      title: request.title,
      janres: request.janres,
      author: request.author,
      synopsis: request.synopsis,
    },
  });

  if (!created) {
    throw new Error('프로젝트 생성에 실패했습니다. 다시 시도해주세요.');
  }

  await createHistory({
    projectId: created.id,
    title: `${request.title} 생성`,
    content: `${request.title} 프로젝트가 생성되었습니다. (-50 토큰)`,
  });

  return {
    data: created,
    success: true,
    status: 201,
    message: '프로젝트가 생성되었습니다.',
  };
};
