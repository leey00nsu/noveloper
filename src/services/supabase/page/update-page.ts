import { Prisma } from '@prisma/client';

import prisma from '@/libs/prisma';

import { UpdatePageRequest, UpdatePageResponse } from '@/types/page';

import { createHistory } from '../history/create-history';
import { getProjectById } from '../project/get-project-by-id';
import { getUserData } from '../user/get-user-data';

export const updatePage = async (
  request: UpdatePageRequest,
): Promise<UpdatePageResponse> => {
  const { data: user } = await getUserData();

  const { data: project } = await getProjectById({
    projectId: request.projectId,
  });

  const updated = await prisma.pages.update({
    where: {
      id: request.pageId,
      projectId: request.projectId,
      userId: user.id,
    },
    data: {
      title: request.title,
      content: request.content as Prisma.InputJsonObject,
      contentText: request.contentText,
      summary: request.summary,
      updatedAt: new Date(),
    },
  });

  if (!updated) {
    throw new Error('페이지 업데이트에 실패했습니다. 다시 시도해주세요.');
  }

  await createHistory({
    projectId: updated.projectId,
    title: `${request.title} 업데이트`,
    content: `${project.title}의 ${request.title} 페이지가 업데이트 되었습니다.`,
  });

  return {
    data: updated,
    success: true,
    status: 200,
    message: '페이지가 업데이트 되었습니다.',
  };
};
