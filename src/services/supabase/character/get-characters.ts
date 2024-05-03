import prisma from '@/libs/prisma';

import { GetCharactersRequest, GetCharactersResponse } from '@/types/character';

import { getUserData } from '../user/get-user-data';

export const getCharacters = async (
  request: GetCharactersRequest,
): Promise<GetCharactersResponse> => {
  const { data: user } = await getUserData();

  const nameContains = request.search
    ? { name: { contains: request.search } }
    : {};
  const descriptionContains = request.search
    ? { description: { contains: request.search } }
    : {};

  const characters = await prisma.characters.findMany({
    where: {
      AND: [
        { userId: user.id, projectId: request.projectId },
        {
          OR: [nameContains, descriptionContains],
        },
      ],
    },
    orderBy: {
      [request.orderBy]: request.order,
    },
  });

  if (!characters) {
    throw new Error('인물 목록 정보가 없습니다. 다시 시도해주세요.');
  }

  return {
    data: characters,
    success: true,
    status: 200,
    message: '인물 목록을 성공적으로 불러왔습니다.',
  };
};
