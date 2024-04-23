'use client';

import { useParams } from 'next/navigation';

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
      {characters?.map((character) => (
        <Card
          title={character.name}
          href={`/dashboard/project/${projectId}/character/${character.id}`}
          key={character.id}
        >
          <Card.Text>{character.name}</Card.Text>
          <Card.Text>{character.createdAt.toISOString()}</Card.Text>
        </Card>
      ))}
    </CardList>
  );
};

export default CharacterCardList;
