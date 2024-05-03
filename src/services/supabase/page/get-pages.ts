import prisma from '@/libs/prisma';

import { GetPagesRequest, GetPagesResponse } from '@/types/page';

import { getUserData } from '../user/get-user-data';

export const getPages = async (
  request: GetPagesRequest,
): Promise<GetPagesResponse> => {
  const { data: user } = await getUserData();

  const titleContains = request.search
    ? { title: { contains: request.search } }
    : {};
  const summaryContains = request.search
    ? { summary: { contains: request.search } }
    : {};

  const pages = await prisma.pages.findMany({
    where: {
      AND: [
        { userId: user.id, projectId: request.projectId },
        {
          OR: [titleContains, summaryContains],
        },
      ],
    },
    orderBy: {
      [request.orderBy]: request.order,
    },
  });

  if (!pages) {
    throw new Error('페이지 목록 정보가 없습니다. 다시 시도해주세요.');
  }

  return {
    data: pages,
    success: true,
    status: 200,
    message: '페이지 목록을 성공적으로 불러왔습니다.',
  };
};
