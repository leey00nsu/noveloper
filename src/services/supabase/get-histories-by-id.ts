import prisma from '@/libs/prisma';

import { getUserData } from './get-user-data';

export const getHistoriesById = async (projectId: string) => {
  const { data: user } = await getUserData();

  const history = await prisma.histories.findMany({
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
    message: '히스토리 목록을 성공적으로 불러왔습니다.',
  };
};
