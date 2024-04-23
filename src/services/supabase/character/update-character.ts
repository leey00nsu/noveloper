import prisma from '@/libs/prisma';

import {
  UpdateCharacterRequest,
  UpdateCharacterResponse,
} from '@/types/character';

import { createHistory } from '../history/create-history';
import { getUserData } from '../user/get-user-data';

export const updateCharacter = async (
  request: UpdateCharacterRequest,
): Promise<UpdateCharacterResponse> => {
  const { data: user } = await getUserData();

  const updated = await prisma.characters.update({
    where: {
      id: request.characterId,
      projectId: request.projectId,
      userId: user.id,
    },
    data: {
      name: request.name,
      age: request.age,
      description: request.description,
      updatedAt: new Date(),
    },
  });

  if (!updated) {
    throw new Error('인물 정보 업데이트에 실패했습니다. 다시 시도해주세요.');
  }

  await createHistory({
    projectId: updated.projectId,
    title: `${request.name} 업데이트`,
    content: '인물 정보가 업데이트 되었습니다.',
  });

  return {
    data: updated,
    success: true,
    status: 200,
    message: '인물 정보가 업데이트 되었습니다.',
  };
};
