import prisma from '@/libs/prisma';

import { CreateTimelineRequest, CreateTimelineResponse } from '@/types/timeline';

import { getUserData } from '../user/get-user-data';

export const createTimeline = async (
  request: CreateTimelineRequest,
): Promise<CreateTimelineResponse> => {
  const { data: user } = await getUserData();

  const created = await prisma.timelines.create({
    data: {
      userId: user.id,
      projectId: request.projectId,
      title: request.title,
      content: request.content,
    },
  });

  if (!created) {
    throw new Error('타임라인 생성에 실패했습니다. 다시 시도해주세요.');
  }

  return {
    data: created,
    success: true,
    status: 201,
    message: '타임라인이 생성되었습니다.',
  };
};


