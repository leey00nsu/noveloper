import prisma from '@/libs/prisma';

import { getUserData } from './get-user-data';

export const getHistoryById = async (projectId: string) => {
  try {
    const { data: user } = await getUserData();

    const history = await prisma.histories.findFirst({
      where: {
        user_id: user.id,
        project_id: projectId,
      },
    });

    if (!history) {
      throw new Error('히스토리 정보가 없습니다. 다시 시도해주세요.');
    }

    return {
      data: history,
      success: true,
      status: 200,
      message: '히스토리를 성공적으로 불러왔습니다.',
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
