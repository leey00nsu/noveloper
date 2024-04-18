import prisma from '@/libs/prisma';

import { GetPageRequest, GetPageResponse } from '@/types/page';

import { getUserData } from '../user/get-user-data';

export const getPageById = async (
  request: GetPageRequest,
): Promise<GetPageResponse> => {
  const { data: user } = await getUserData();

  const page = await prisma.pages.findFirst({
    where: {
      userId: user.id,
      projectId: request.projectId,
      id: request.pageId,
    },
  });

  if (!page) {
    throw new Error('페이지 정보가 없습니다. 다시 시도해주세요.');
  }

  return {
    data: page,
    success: true,
    status: 200,
    message: '페이지를 성공적으로 불러왔습니다.',
  };
};
