import prisma from '@/libs/prisma';

import {
  UpdateCharacterRequest,
  UpdateCharacterResponse,
} from '@/types/character';

import { createHistory } from '../history/create-history';
import { getProjectById } from '../project/get-project-by-id';
import { getUserData } from '../user/get-user-data';
import { getCharacterById } from './get-character-by-id';

export const updateCharacter = async (
  request: UpdateCharacterRequest,
): Promise<UpdateCharacterResponse> => {
  const { data: user } = await getUserData();

  const { data: project } = await getProjectById({
    projectId: request.projectId,
  });

  const { data: pastCharacter } = await getCharacterById({
    projectId: request.projectId,
    characterId: request.characterId,
  });

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

  let content = `${project.title} 인물 ${request.name} 이 업데이트 되었습니다. \\n`;

  if (pastCharacter.name !== request.name) {
    content += `이름: ${pastCharacter.name} -> ${request.name}\\n`;
  }

  if (pastCharacter.age !== request.age) {
    content += `나이: ${pastCharacter.age} -> ${request.age}\\n`;
  }

  if (pastCharacter.description !== request.description) {
    content += `설명: ${pastCharacter.description} -> ${request.description}\\n`;
  }

  await createHistory({
    projectId: updated.projectId,
    title: `${request.name} 업데이트`,
    content,
  });

  return {
    data: updated,
    success: true,
    status: 200,
    message: '인물 정보가 업데이트 되었습니다.',
  };
};
