import prisma from '@/libs/prisma';

import { GetCharacterRequest, GetCharacterResponse } from '@/types/character';

import { getUserData } from '../user/get-user-data';

export const getCharacterById = async (
  request: GetCharacterRequest,
): Promise<GetCharacterResponse> => {
  const { data: user } = await getUserData();

  const character = await prisma.characters.findFirst({
    where: {
      userId: user.id,
      projectId: request.projectId,
      id: request.characterId,
    },
  });

  if (!character) {
    throw new Error('인물 정보가 없습니다. 다시 시도해주세요.');
  }

  return {
    data: character,
    success: true,
    status: 200,
    message: '인물을 성공적으로 불러왔습니다.',
  };
};
