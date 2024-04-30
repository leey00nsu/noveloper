import prisma from '@/libs/prisma';

import { DeletePageRequest, DeletePageResponse } from '@/types/page';

import { createHistory } from '../history/create-history';
import { getUserData } from '../user/get-user-data';
import { getProjectById } from '../project/get-project-by-id';

export const deletePage = async (
  request: DeletePageRequest,
): Promise<DeletePageResponse> => {
  const { data: user } = await getUserData();

  const { data: project } = await getProjectById({
    projectId: request.projectId,
  });

  const deleted = await prisma.pages.delete({
    where: {
      id: request.pageId,
      projectId: request.projectId,
      userId: user.id,
    },
  });

  if (!deleted) {
    throw new Error('페이지 삭제에 실패했습니다. 다시 시도해주세요.');
  }

  await createHistory({
    projectId: deleted.projectId,
    title: `${deleted.title} 삭제`,
    content: `${project.title}의 ${deleted.title} 페이지가 삭제되었습니다.`,
  });

  return {
    data: deleted,
    success: true,
    status: 200,
    message: '페이지가 삭제 되었습니다.',
  };
};
