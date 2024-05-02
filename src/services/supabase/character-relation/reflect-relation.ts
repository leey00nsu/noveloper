import { createNodes } from '@/libs/react-flow/create-nodes';

import { ORDER } from '@/types/api';
import { CHARACTER_ORDER_BY } from '@/types/character';
import { ParsedCharacterRelations } from '@/types/character-relation';

import { getCharacters } from '../character/get-characters';
import { updateRelation } from './update-relation';

/**
 * 인물 정보를 기반으로 인물 관계 정보를 업데이트합니다.
 * @param relation
 * @param projectId
 * @returns
 */
export const reflectRelation = async (
  relation: ParsedCharacterRelations,
  projectId: string,
) => {
  const { data: characters } = await getCharacters({
    projectId,
    orderBy: CHARACTER_ORDER_BY[0],
    order: ORDER[0],
  });

  const characterNodes = createNodes(characters);

  // 현재 인물들의 CharacterNode 와 기존 관계의 RelationNode 를 비교하여
  // relation에 존재하는 Node 는 그대로 사용하고, 존재하지 않는 Node 는 새로 생성한 Node를 사용합니다.
  const newNodes = characterNodes.map((characterNode) => {
    const matchedNode = relation.nodes.find(
      (node) => node.id === characterNode.id,
    );

    if (matchedNode) {
      return matchedNode;
    }

    return characterNode;
  });

  // 존재하는 Node 를 가지고 있는 Edge 만 남깁니다.
  const newEdges = relation.edges.filter((edge) => {
    const source = newNodes.find((node) => node.id === edge.source);
    const target = newNodes.find((node) => node.id === edge.target);

    if (source && target) {
      return true;
    }

    return false;
  });

  const { data } = await updateRelation(
    {
      projectId,
      nodes: newNodes,
      edges: newEdges,
    },
    true,
  );

  return data;
};
