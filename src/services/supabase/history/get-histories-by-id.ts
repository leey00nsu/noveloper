import prisma from '@/libs/prisma';

import { GetHistoriesRequest, GetHistoriesResponse } from '@/types/history';

import { getUserData } from '../user/get-user-data';

export const getHistoriesById = async (
  request: GetHistoriesRequest,
): Promise<GetHistoriesResponse> => {
  const { data: user } = await getUserData();

  const history = await prisma.histories.findMany({
    where: {
      userId: user.id,
      projectId: request.projectId,
    },
  });

  if (!history) {
    throw new Error('히스토리 정보가 없습니다. 다시 시도해주세요.');
  }

  return {
    data: history,
    success: true,
    status: 200,
    message: '히스토리 목록을 성공적으로 불러왔습니다.',
  };
};
