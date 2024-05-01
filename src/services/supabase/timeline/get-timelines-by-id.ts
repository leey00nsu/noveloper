import prisma from '@/libs/prisma';

import { GetTimelinesRequest, GetTimelinesResponse } from '@/types/timeline';

import { getUserData } from '../user/get-user-data';

export const getTimelinesById = async (
  request: GetTimelinesRequest,
): Promise<GetTimelinesResponse> => {
  const { data: user } = await getUserData();

  const timelines = await prisma.timelines.findMany({
    where: {
      userId: user.id,
      projectId: request.projectId,
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
