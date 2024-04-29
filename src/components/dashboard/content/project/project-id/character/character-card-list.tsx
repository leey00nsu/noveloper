'use client';

import { useParams } from 'next/navigation';

import { parseDate } from '@/libs/parse-date';

import { useGetCharacters } from '@/hooks/character/use-character-service';

import Card from '../../../common/card/card';
import CardList from '../../../common/card/card-list';

const CharacterCardList = () => {
  const { projectId } = useParams();
  const { characters, isFetching } = useGetCharacters({
    projectId: projectId as string,
  });

  return (
    <CardList showSkeleton={isFetching}>
      {characters?.length === 0 && (
        <Card title="인물이 없습니다.">
          <Card.Text>새로운 인물을 생성해보세요.</Card.Text>
        </Card>
      )}
      {characters?.map((character) => (
        <Card
          title={character.name}
          href={`/dashboard/project/${projectId}/character/${character.id}`}
          key={character.id}
        >
          <Card.Text>{character.name}</Card.Text>
          <Card.Text>{character.description}</Card.Text>
          <Card.Text className="font-light">
            {parseDate(character.updatedAt)} 에 마지막으로 수정됨
          </Card.Text>
          <Card.Text className="font-light">
            {parseDate(character.createdAt)} 에 생성됨
          </Card.Text>
        </Card>
      ))}
    </CardList>
  );
};

export default CharacterCardList;
