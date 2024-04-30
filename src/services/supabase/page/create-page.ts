import prisma from '@/libs/prisma';

import { CreatePageRequest, CreatePageResponse } from '@/types/page';

import { createHistory } from '../history/create-history';
import { getUserData } from '../user/get-user-data';
import { consumeToken } from '../user/use-token';

export const createPage = async (
  request: CreatePageRequest,
): Promise<CreatePageResponse> => {
  const { data: user } = await getUserData();

  await consumeToken({
    usage: 20,
  });

  const created = await prisma.pages.create({
    data: {
      userId: user.id,
      projectId: request.projectId,
      title: request.title,
      content: request.content,
      summary: request.summary,
    },
  });

  if (!created) {
    throw new Error('페이지 생성에 실패했습니다. 다시 시도해주세요.');
  }

  await createHistory({
    projectId: created.projectId,
    title: `${request.title} 페이지 생성`,
    content: `${request.title} 페이지가 생성되었습니다.`,
  });

  return {
    data: created,
    success: true,
    status: 201,
    message: '페이지가 생성되었습니다.',
  };
};
