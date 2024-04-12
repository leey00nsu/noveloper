import prisma from '@/libs/prisma';

import { CreateHistoryRequest } from '@/types/history';

import { getUserData } from './get-user-data';

export const createHistory = async (request: CreateHistoryRequest) => {
  try {
    const { data: user } = await getUserData();

    const created = await prisma.histories.create({
      data: {
        user_id: user.id,
        project_id: request.projectId,
        title: request.title,
      },
    });

    if (!created) {
      throw new Error('히스토리 생성에 실패했습니다. 다시 시도해주세요.');
    }

    return {
      success: true,
      status: 201,
      message: '히스토리가 생성되었습니다.',
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
