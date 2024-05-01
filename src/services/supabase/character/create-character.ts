import prisma from '@/libs/prisma';

import {
  CreateCharacterRequest,
  CreateCharacterResponse,
} from '@/types/character';

import { getProjectById } from '../project/get-project-by-id';
import { createTimeline } from '../timeline/create-timeline';
import { getUserData } from '../user/get-user-data';

export const createCharacter = async (
  request: CreateCharacterRequest,
): Promise<CreateCharacterResponse> => {
  const { data: user } = await getUserData();

  const { data: project } = await getProjectById({
    projectId: request.projectId,
  });

  const created = await prisma.characters.create({
    data: {
      userId: user.id,
      projectId: request.projectId,
      name: request.name,
      age: request.age,
      description: request.description,
    },
  });

  if (!created) {
    throw new Error('인물 생성에 실패했습니다. 다시 시도해주세요.');
  }

  await createTimeline({
    projectId: created.projectId,
    title: `${request.name} 인물 생성`,
    content: `${project.title}에 인물 ${request.name} 이 생성되었습니다. `,
  });

  return {
    data: created,
    success: true,
    status: 201,
    message: '인물이 생성되었습니다.',
  };
};
