import { Characters } from '@prisma/client';

/**
 * Characters 배열을 받아서 노드 배열을 반환합니다.
 * @param characters
 * @returns
 */
export const createNodes = (characters: Characters[]) => {
  const newNodes = characters.map((character, index) => ({
    id: `n:${character.id}`,
    position: { x: index * 50, y: 0 },
    data: { label: character.name },
  }));

  return newNodes;
};
