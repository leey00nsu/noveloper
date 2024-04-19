import prisma from '@/libs/prisma';

import { UpdatePageRequest, UpdatePageResponse } from '@/types/page';

import { createHistory } from '../history/create-history';
import { getUserData } from '../user/get-user-data';

export const updatePage = async (
  request: UpdatePageRequest,
): Promise<UpdatePageResponse> => {
  const { data: user } = await getUserData();

  const updated = await prisma.pages.update({
    where: {
      id: request.pageId,
      projectId: request.projectId,
      userId: user.id,
    },
    data: {
      title: request.title,
      content: request.content,
      updatedAt: new Date(),
    },
  });

  if (!updated) {
    throw new Error('페이지 업데이트에 실패했습니다. 다시 시도해주세요.');
  }

  await createHistory({
    projectId: updated.projectId,
    title: `${request.title} 업데이트`,
    content: '페이지가 업데이트 되었습니다.',
  });

  return {
    data: updated,
    success: true,
    status: 200,
    message: '페이지가 업데이트 되었습니다.',
  };
};
