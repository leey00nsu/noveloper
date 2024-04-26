import prisma from '@/libs/prisma';
import { createNodes } from '@/libs/react-flow/create-nodes';

import {
  FindOrInsertRelationRequest,
  FindOrInsertRelationResponse,
  ParsedCharacterRelations,
} from '@/types/character-relation';

import { getCharacters } from '../character/get-characters';
import { getUserData } from '../user/get-user-data';
import { reflectRelation } from './reflect-relation';

export const findOrInsertRelation = async (
  request: FindOrInsertRelationRequest,
): Promise<FindOrInsertRelationResponse> => {
  const { data: user } = await getUserData();

  const relation = await prisma.characterRelations.findFirst({
    where: {
      userId: user.id,
      projectId: request.projectId,
    },
  });

  if (relation) {
    let data = relation as unknown as ParsedCharacterRelations;

    data = await reflectRelation(data, request.projectId);

    return {
      data,
      success: true,
      status: 200,
      message: '인물 관계 정보를 성공적으로 불러왔습니다.',
    };
  }

  const { data: characters } = await getCharacters({
    projectId: request.projectId,
  });

  const newNodes = createNodes(characters);

  const created = await prisma.characterRelations.create({
    data: {
      nodes: newNodes,
      edges: {},
      userId: user.id,
      projectId: request.projectId,
    },
  });

  if (!created) {
    throw new Error('인물 관계 정보 생성에 실패했습니다. 다시 시도해주세요.');
  }

  return {
    data: created as unknown as ParsedCharacterRelations,
    success: true,
    status: 201,
    message: '인물 관계 정보가 생성되었습니다.',
  };
};
