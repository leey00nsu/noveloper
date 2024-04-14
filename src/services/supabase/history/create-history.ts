import prisma from '@/libs/prisma';

import { CreateHistoryRequest, CreateHistoryResponse } from '@/types/history';

import { getUserData } from '../user/get-user-data';

export const createHistory = async (
  request: CreateHistoryRequest,
): Promise<CreateHistoryResponse> => {
  const { data: user } = await getUserData();

  const created = await prisma.histories.create({
    data: {
      user_id: user.id,
      project_id: request.projectId,
      title: request.title,
      content: request.content,
    },
  });

  if (!created) {
    throw new Error('히스토리 생성에 실패했습니다. 다시 시도해주세요.');
  }

  return {
    data: created,
    success: true,
    status: 201,
    message: '히스토리가 생성되었습니다.',
  };
};
