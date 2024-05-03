import { Prisma } from '@prisma/client';

import prisma from '@/libs/prisma';

import { CreatePageRequest, CreatePageResponse } from '@/types/page';

import { getProjectById } from '../project/get-project-by-id';
import { createTimeline } from '../timeline/create-timeline';
import { consumeToken } from '../user/consume-token';
import { getUserData } from '../user/get-user-data';

export const createPage = async (
  request: CreatePageRequest,
): Promise<CreatePageResponse> => {
  const { data: user } = await getUserData();

  await consumeToken({
    usage: 20,
  });

  const { data: project } = await getProjectById({
    projectId: request.projectId,
  });

  const created = await prisma.pages.create({
    data: {
      userId: user.id,
      projectId: request.projectId,
      title: request.title,
      content: request.content as Prisma.InputJsonObject,
      contentText: request.contentText,
      summary: request.summary,
    },
  });

  if (!created) {
    throw new Error('페이지 생성에 실패했습니다. 다시 시도해주세요.');
  }

  await createTimeline({
    projectId: created.projectId,
    title: `${request.title} 페이지 생성`,
    content: `${project.title}에 ${request.title} 페이지가 생성되었습니다. (-20 토큰)`,
  });

  return {
    data: created,
    success: true,
    status: 201,
    message: '페이지가 생성되었습니다.',
  };
};
