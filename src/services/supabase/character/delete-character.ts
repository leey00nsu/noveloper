import prisma from '@/libs/prisma';

import {
  DeleteCharacterRequest,
  DeleteCharacterResponse,
} from '@/types/character';

import { createHistory } from '../history/create-history';
import { getUserData } from '../user/get-user-data';

export const deleteCharacter = async (
  request: DeleteCharacterRequest,
): Promise<DeleteCharacterResponse> => {
  const { data: user } = await getUserData();

  const deleted = await prisma.characters.delete({
    where: {
      id: request.characterId,
      projectId: request.projectId,
      userId: user.id,
    },
  });

  if (!deleted) {
    throw new Error('인물 정보 삭제에 실패했습니다. 다시 시도해주세요.');
  }

  await createHistory({
    projectId: deleted.projectId,
    title: `${deleted.name} 삭제`,
    content: '인물 정보가 삭제되었습니다.',
  });

  return {
    data: deleted,
    success: true,
    status: 200,
    message: '인물 정보가 삭제 되었습니다.',
  };
};
