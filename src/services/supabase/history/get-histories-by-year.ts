import prisma from '@/libs/prisma';

import {
  GetHistoriesByYearRequest,
  GetHistoriesByYearResponse,
} from '@/types/history';

import { getUserData } from '../user/get-user-data';

export const getHistoriesByYear = async (
  request: GetHistoriesByYearRequest,
): Promise<GetHistoriesByYearResponse> => {
  const { data: user } = await getUserData();

  const history = await prisma.histories.findMany({
    where: {
      userId: user.id,
      projectId: request.projectId,
      createdAt: {
        gte: new Date(`${request.year}-01-01T00:00:00.000Z`),
        lt: new Date(`${request.year}-12-31T23:59:59.999Z`),
      },
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
