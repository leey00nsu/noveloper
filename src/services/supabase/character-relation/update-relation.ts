import { Prisma } from '@prisma/client';

import prisma from '@/libs/prisma';

import {
  ParsedCharacterRelations,
  UpdateCharacterRelationRequest,
  UpdateCharacterRelationResponse,
} from '@/types/character-relation';

import { createHistory } from '../history/create-history';
import { getProjectById } from '../project/get-project-by-id';
import { getUserData } from '../user/get-user-data';

export const updateRelation = async (
  request: UpdateCharacterRelationRequest,
): Promise<UpdateCharacterRelationResponse> => {
  const { data: user } = await getUserData();

  const { data: project } = await getProjectById(request.projectId);

  const updated = await prisma.characterRelations.update({
    where: {
      projectId: request.projectId,
      userId: user.id,
    },
    data: {
      nodes: request.nodes as unknown as Prisma.JsonObject,
      edges: request.edges as unknown as Prisma.JsonObject,
      updatedAt: new Date(),
    },
  });

  if (!updated) {
    throw new Error('인물 관계 업데이트에 실패했습니다. 다시 시도해주세요.');
  }

  await createHistory({
    projectId: updated.projectId,
    title: `${project.title} 인물 관계 업데이트`,
    content: `인물 관계 업데이트`,
  });

  return {
    data: updated as unknown as ParsedCharacterRelations,
    success: true,
    status: 200,
    message: '인물 관계가 업데이트 되었습니다.',
  };
};
