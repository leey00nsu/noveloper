import prisma from '@/libs/prisma';

import {
  GetTimelinesByYearRequest,
  GetTimelinesByYearResponse,
} from '@/types/timeline';

import { getUserData } from '../user/get-user-data';

export const getTimelinesByYear = async (
  request: GetTimelinesByYearRequest,
): Promise<GetTimelinesByYearResponse> => {
  const { data: user } = await getUserData();

  const timelines = await prisma.timelines.findMany({
    where: {
      userId: user.id,
      projectId: request.projectId,
      createdAt: {
        gte: new Date(`${request.year}-01-01T00:00:00.000Z`),
        lt: new Date(`${request.year}-12-31T23:59:59.999Z`),
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!timelines) {
    throw new Error('타임라인 정보가 없습니다. 다시 시도해주세요.');
  }

  return {
    data: timelines,
    success: true,
    status: 200,
    message: '타임라인 목록을 성공적으로 불러왔습니다.',
  };
};
